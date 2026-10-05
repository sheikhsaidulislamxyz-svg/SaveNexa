import crypto from 'crypto';
import { validateUrlSecurity, sanitizeText } from './security';

// Generate a stable app secret for HMAC signing (stateless, no .env required)
const APP_SECRET = crypto
  .createHash('sha256')
  .update('savenexa-media-downloader-secret-2026-v1')
  .digest('hex');

export interface DownloadTokenPayload {
  url: string;
  mime: string;
  filename: string;
  title?: string;
  platform?: string;
  quality?: string;
  exp: number; // Expiration timestamp in ms
}

export function sanitizeFilename(rawName: string, defaultExt: string = 'mp4'): string {
  let clean = sanitizeText(rawName)
    .toLowerCase()
    .replace(/[^a-z0-9\-_]/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Trim leading/trailing hyphens

  if (!clean || clean.length < 3) {
    clean = `savenexa-media-${Date.now()}`;
  }

  if (clean.length > 80) {
    clean = clean.substring(0, 80);
  }

  const cleanExt = defaultExt.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'mp4';
  if (!clean.endsWith(`.${cleanExt}`)) {
    clean = `${clean}.${cleanExt}`;
  }

  return clean;
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

export function createDownloadToken(data: {
  url: string;
  mime: string;
  filename: string;
  title?: string;
  platform?: string;
  quality?: string;
  ttlSeconds?: number;
}): string {
  const ttlMs = (data.ttlSeconds || 15 * 60) * 1000; // Default 15 minutes
  const payload: DownloadTokenPayload = {
    url: data.url,
    mime: data.mime || 'video/mp4',
    filename: sanitizeFilename(data.filename, data.filename.split('.').pop()),
    title: sanitizeText(data.title) || undefined,
    platform: data.platform || undefined,
    quality: data.quality || undefined,
    exp: Date.now() + ttlMs,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const hmac = crypto.createHmac('sha256', APP_SECRET);
  hmac.update(encodedPayload);
  const signature = base64UrlEncode(hmac.digest('hex'));

  return `${encodedPayload}.${signature}`;
}

export function verifyDownloadToken(token: string): {
  valid: boolean;
  error?: string;
  payload?: DownloadTokenPayload;
} {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { valid: false, error: 'Invalid or missing download token format.' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed download token.' };
  }

  const [encodedPayload, signature] = parts;

  // Verify HMAC signature
  const hmac = crypto.createHmac('sha256', APP_SECRET);
  hmac.update(encodedPayload);
  const expectedSignature = base64UrlEncode(hmac.digest('hex'));

  if (signature !== expectedSignature) {
    return { valid: false, error: 'Download token signature verification failed.' };
  }

  // Parse payload
  let payload: DownloadTokenPayload;
  try {
    const jsonStr = base64UrlDecode(encodedPayload);
    payload = JSON.parse(jsonStr);
  } catch {
    return { valid: false, error: 'Could not parse token payload.' };
  }

  // Check expiration
  if (!payload.exp || Date.now() > payload.exp) {
    return { valid: false, error: 'This download link has expired. Please re-analyze the video.' };
  }

  // Security check on payload URL
  const security = validateUrlSecurity(payload.url);
  if (!security.isValid) {
    return { valid: false, error: `Security check failed: ${security.message}` };
  }

  return { valid: true, payload };
}
