import { NextRequest, NextResponse } from 'next/server';
import { runExtractionEngine } from '@/lib/extraction/engine';
import { checkRateLimit } from '@/lib/rate-limit';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

export const runtime = 'nodejs';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('cf-connecting-ip') ||
      'client-ip';

    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
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
          code: ERROR_CODES.INVALID_URL,
          message: 'Please provide a valid media URL to analyze.',
        },
        { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    // 3. Execute Extraction Engine
    const result = await runExtractionEngine(url, {
      clientIp: ip,
      userAgent: req.headers.get('user-agent') || undefined,
    });

    if (!result.ok) {
      return NextResponse.json(result, {
        status: result.code === 'INVALID_URL' || result.code === 'UNSUPPORTED_PLATFORM' ? 400 : 422,
        headers: { 'X-Robots-Tag': 'noindex, nofollow' },
      });
    }

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: ERROR_CODES.INTERNAL_ERROR,
        message: ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      },
      { status: 500, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
    );
  }
}
