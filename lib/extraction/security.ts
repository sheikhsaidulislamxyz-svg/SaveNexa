import { validateUrlSecurity } from '../security';

export interface MediaValidationResult {
  valid: boolean;
  finalUrl?: string;
  contentType?: string;
  contentLength?: number | null;
  errorReason?: string;
}

export async function validateMediaStreamUrl(
  rawUrl: string,
  _signal?: AbortSignal
): Promise<MediaValidationResult> {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { valid: false, errorReason: 'Empty or non-string URL.' };
  }

  // 1. Strict SSRF & Protocol Security Check
  const ssrfCheck = validateUrlSecurity(rawUrl);
  if (!ssrfCheck.isValid) {
    return { valid: false, errorReason: `SSRF Blocked: ${ssrfCheck.message}` };
  }

  const targetUrl = ssrfCheck.normalizedUrl;

  // 2. Reject non-HTTP protocols
  if (!/^https?:\/\//i.test(targetUrl)) {
    return { valid: false, errorReason: 'Only HTTP and HTTPS stream protocols are supported.' };
  }

  // 3. Reject known non-media page patterns
  const lowerUrl = targetUrl.toLowerCase();
  if (
    lowerUrl.includes('instagram.com/p/') ||
    lowerUrl.includes('instagram.com/reel/') ||
    lowerUrl.includes('tiktok.com/@') ||
    lowerUrl.includes('twitter.com/') ||
    lowerUrl.includes('x.com/') ||
    lowerUrl.includes('facebook.com/') ||
    lowerUrl.includes('reddit.com/r/')
  ) {
    return { valid: false, errorReason: 'Webpage post URL is not a media stream.' };
  }

  // Fast path for CDN media stream URLs
  return {
    valid: true,
    finalUrl: targetUrl,
    contentType: 'video/mp4',
  };
}
