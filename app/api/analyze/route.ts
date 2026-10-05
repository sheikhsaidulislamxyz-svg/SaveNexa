import { NextRequest, NextResponse } from 'next/server';
import { runExtractionEngine } from '@/lib/extraction/engine';
import { checkRateLimit } from '@/lib/rate-limit';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const reqStart = Date.now();
  const jobId = `job_${reqStart}_${Math.random().toString(36).substring(2, 8)}`;

  try {
    // 1. Rate limiting check per IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('cf-connecting-ip') ||
      'client-ip';

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      console.warn(`[ANALYZE_JOB ${jobId}] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          ok: false,
          jobId,
          code: ERROR_CODES.TOO_MANY_REQUESTS,
          message: ERROR_MESSAGES[ERROR_CODES.TOO_MANY_REQUESTS],
        },
        {
          status: 429,
          headers: {
            'X-Robots-Tag': 'noindex, nofollow',
            'Retry-After': '60',
          },
        }
      );
    }

    // 2. Parse payload
    let body: { url?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          jobId,
          code: ERROR_CODES.INVALID_URL,
          message: 'Invalid JSON request payload.',
        },
        { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    const { url } = body;
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        {
          ok: false,
          jobId,
          code: ERROR_CODES.INVALID_URL,
          message: 'Please provide a valid media URL to analyze.',
        },
        { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    console.log(`[ANALYZE_JOB ${jobId}] START analyzing target URL: ${url.slice(0, 100)}`);

    // 3. Execute Extraction Engine with strict 15-second server-side timeout
    const result = await runExtractionEngine(url, {
      clientIp: ip,
      userAgent: req.headers.get('user-agent') || undefined,
      timeoutMs: 15000, // Strict 15s server timeout per analyze job
    });

    const duration = Date.now() - reqStart;

    if (!result.ok) {
      console.warn(`[ANALYZE_JOB ${jobId}] FAILED in ${duration}ms - Code: ${result.code} - Message: ${result.message}`);
      return NextResponse.json(
        { ...result, jobId },
        {
          status: result.code === 'INVALID_URL' || result.code === 'UNSUPPORTED_PLATFORM' ? 400 : 422,
          headers: { 'X-Robots-Tag': 'noindex, nofollow' },
        }
      );
    }

    console.log(`[ANALYZE_JOB ${jobId}] SUCCESS in ${duration}ms - Platform: ${result.platform} - Title: ${result.title?.slice(0, 50)}`);

    return NextResponse.json(
      { ...result, jobId },
      {
        status: 200,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: unknown) {
    const duration = Date.now() - reqStart;
    console.error(`[ANALYZE_JOB ${jobId}] EXCEPTION in ${duration}ms:`, error);
    return NextResponse.json(
      {
        ok: false,
        jobId,
        code: ERROR_CODES.INTERNAL_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      },
      { status: 500, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
    );
  }
}
