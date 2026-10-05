import { NextRequest, NextResponse } from 'next/server';
import { verifyDownloadToken } from '@/lib/tokens';
import { validateUrlSecurity } from '@/lib/security';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

export const runtime = 'nodejs';

const MAX_REDIRECTS = 3;

async function fetchWithSsrfProtection(
  targetUrl: string,
  incomingRangeHeader?: string | null,
  redirectCount: number = 0
): Promise<Response> {
  if (redirectCount > MAX_REDIRECTS) {
    throw new Error('Too many redirects while retrieving media from source.');
  }

  // SSRF check on target URL
  const security = validateUrlSecurity(targetUrl);
  if (!security.isValid) {
    throw new Error(`SSRF Blocked: ${security.message}`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s connection/startup timeout for proxy stream

  const requestHeaders: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Sec-Fetch-Dest': 'video',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
  };

  // Add platform specific referer headers if needed by CDN
  const lowerUrl = security.normalizedUrl.toLowerCase();
  if (lowerUrl.includes('tiktokcdn.com')) {
    requestHeaders['Referer'] = 'https://www.tiktok.com/';
  } else if (lowerUrl.includes('cdninstagram.com')) {
    requestHeaders['Referer'] = 'https://www.instagram.com/';
  } else if (lowerUrl.includes('twimg.com')) {
    requestHeaders['Referer'] = 'https://twitter.com/';
  } else if (lowerUrl.includes('fbcdn.net')) {
    requestHeaders['Referer'] = 'https://www.facebook.com/';
  } else if (lowerUrl.includes('redd.it')) {
    requestHeaders['Referer'] = 'https://www.reddit.com/';
  } else if (lowerUrl.includes('pinimg.com')) {
    requestHeaders['Referer'] = 'https://www.pinterest.com/';
  }

  if (incomingRangeHeader) {
    requestHeaders['Range'] = incomingRangeHeader;
  }

  try {
    const res = await fetch(security.normalizedUrl, {
      method: 'GET',
      headers: requestHeaders,
      redirect: 'manual',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle Redirects safely
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const location = res.headers.get('location');
      if (!location) {
        throw new Error('Source redirected without a Location header.');
      }
      let redirectUrl: string;
      try {
        redirectUrl = new URL(location, security.normalizedUrl).toString();
      } catch {
        throw new Error('Invalid redirect Location header from source CDN.');
      }
      return fetchWithSsrfProtection(redirectUrl, incomingRangeHeader, redirectCount + 1);
    }

    return res;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export async function GET(req: NextRequest): Promise<Response> {
  const reqStart = Date.now();
  const url = new URL(req.url);
  const id = url.searchParams.get('id') || url.searchParams.get('token');
  const mode = url.searchParams.get('mode') || 'auto'; // 'auto' | 'redirect' | 'proxy'

  const downloadJobId = `dl_${reqStart}_${Math.random().toString(36).substring(2, 8)}`;

  // 1. Validate token
  if (!id) {
    return NextResponse.json(
      {
        ok: false,
        jobId: downloadJobId,
        code: ERROR_CODES.INVALID_URL,
        message: 'Missing download token identifier.',
      },
      { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
    );
  }

  const verification = verifyDownloadToken(id);
  if (!verification.valid || !verification.payload) {
    const isExpired = verification.error?.includes('expired');
    console.warn(`[DOWNLOAD_JOB ${downloadJobId}] Invalid or expired token: ${verification.error}`);
    return NextResponse.json(
      {
        ok: false,
        jobId: downloadJobId,
        code: isExpired ? ERROR_CODES.MEDIA_EXPIRED : ERROR_CODES.INVALID_URL,
        message: verification.error || 'Invalid or expired download token.',
      },
      {
        status: isExpired ? 410 : 400,
        headers: { 'X-Robots-Tag': 'noindex, nofollow' },
      }
    );
  }

  const { payload } = verification;
  console.log(`[DOWNLOAD_JOB ${downloadJobId}] START mode=${mode} targetUrl=${payload.url.slice(0, 80)}`);

  try {
    // Stream directly from source CDN with Content-Disposition: attachment
    // This provides a clean same-origin attachment download without 302 redirects or new tabs
    const incomingRange = req.headers.get('range');
    const upstreamRes = await fetchWithSsrfProtection(payload.url, incomingRange);

    if (!upstreamRes.ok && upstreamRes.status !== 206) {
      await upstreamRes.body?.cancel().catch(() => {});
      if (upstreamRes.status === 403 || upstreamRes.status === 401) {
        return NextResponse.json(
          {
            ok: false,
            jobId: downloadJobId,
            code: ERROR_CODES.PRIVATE_OR_RESTRICTED_SOURCE,
            message: 'The source media stream link has restricted access or expired.',
          },
          { status: 403, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
        );
      }
      if (upstreamRes.status === 404) {
        return NextResponse.json(
          {
            ok: false,
            jobId: downloadJobId,
            code: ERROR_CODES.NO_MEDIA_FOUND,
            message: 'The source media file was not found on the origin server.',
          },
          { status: 404, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
        );
      }
      return NextResponse.json(
        {
          ok: false,
          jobId: downloadJobId,
          code: ERROR_CODES.SOURCE_UNAVAILABLE,
          message: `Source CDN returned HTTP ${upstreamRes.status}.`,
        },
        { status: 502, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    // Construct download headers
    const contentType =
      payload.mime ||
      upstreamRes.headers.get('content-type') ||
      'video/mp4';

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType);
    responseHeaders.set(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(payload.filename)}"; filename*=UTF-8''${encodeURIComponent(payload.filename)}`
    );
    responseHeaders.set('Cache-Control', 'private, no-store, max-age=0');
    responseHeaders.set('X-Robots-Tag', 'noindex, nofollow');
    responseHeaders.set('Accept-Ranges', 'bytes');

    const contentLength = upstreamRes.headers.get('content-length');
    if (contentLength) {
      responseHeaders.set('Content-Length', contentLength);
    }

    const contentRange = upstreamRes.headers.get('content-range');
    if (contentRange) {
      responseHeaders.set('Content-Range', contentRange);
    }

    const duration = Date.now() - reqStart;
    console.log(`[DOWNLOAD_JOB ${downloadJobId}] PROXY STREAM HEADERS SENT in ${duration}ms - Content-Type: ${contentType}`);

    if (req.signal) {
      req.signal.addEventListener('abort', () => {
        try {
          upstreamRes.body?.cancel().catch(() => {});
        } catch {
          // ignore
        }
      });
    }

    // Return streaming response (206 Partial Content or 200 OK)
    return new Response(upstreamRes.body, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    const duration = Date.now() - reqStart;
    const errorMsg = error instanceof Error ? error.message : 'Failed to retrieve media stream.';
    const isSsrf = errorMsg.includes('SSRF');

    console.error(`[DOWNLOAD_JOB ${downloadJobId}] EXCEPTION in ${duration}ms:`, errorMsg);

    return NextResponse.json(
      {
        ok: false,
        jobId: downloadJobId,
        code: isSsrf ? ERROR_CODES.SSRF_BLOCKED : ERROR_CODES.SOURCE_UNAVAILABLE,
        message: isSsrf
          ? 'Access to this download target is blocked for security.'
          : 'Could not stream media file from the source server. Please try again later.',
      },
      {
        status: isSsrf ? 403 : 502,
        headers: { 'X-Robots-Tag': 'noindex, nofollow' },
      }
    );
  }
}
