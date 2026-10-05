import { MAX_URL_LENGTH, ERROR_CODES } from './constants';

// Strict SSRF / IP range checks
const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'broadcasthost',
  'local',
  'internal',
]);

const BLOCKED_DOMAINS_SUFFIX = [
  '.local',
  '.internal',
  '.localhost',
  '.lan',
  '.home',
  '.corp',
  '.intranet',
  '.arpa',
];

export interface ValidationSuccess {
  isValid: true;
  parsedUrl: URL;
  normalizedUrl: string;
}

export interface ValidationError {
  isValid: false;
  code: string;
  message: string;
}

export type SecurityValidationResult = ValidationSuccess | ValidationError;

export function isPrivateIp(ip: string): boolean {
  // IPv4 checks
  const ipv4Match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip);
  if (ipv4Match) {
    const octet1 = parseInt(ipv4Match[1], 10);
    const octet2 = parseInt(ipv4Match[2], 10);

    // 0.0.0.0/8
    if (octet1 === 0) return true;
    // 127.0.0.0/8 Loopback
    if (octet1 === 127) return true;
    // 10.0.0.0/8 Private
    if (octet1 === 10) return true;
    // 172.16.0.0/12 Private (172.16.0.0 - 172.31.255.255)
    if (octet1 === 172 && octet2 >= 16 && octet2 <= 31) return true;
    // 192.168.0.0/16 Private
    if (octet1 === 192 && octet2 === 168) return true;
    // 169.254.0.0/16 Link-local / AWS metadata
    if (octet1 === 169 && octet2 === 254) return true;
    // 100.64.0.0/10 Carrier-grade NAT
    if (octet1 === 100 && octet2 >= 64 && octet2 <= 127) return true;
  }

  // IPv6 checks (e.g. ::1, fe80::, fc00::, fd00::)
  const lowerIp = ip.toLowerCase();
  if (
    lowerIp === '::1' ||
    lowerIp.startsWith('fe80:') ||
    lowerIp.startsWith('fc') ||
    lowerIp.startsWith('fd') ||
    lowerIp.includes('::ffff:127.') ||
    lowerIp.includes('::ffff:10.') ||
    lowerIp.includes('::ffff:192.168.') ||
    lowerIp.includes('::ffff:172.')
  ) {
    return true;
  }

  return false;
}

export function validateUrlSecurity(rawInput: unknown): SecurityValidationResult {
  if (typeof rawInput !== 'string') {
    return {
      isValid: false,
      code: ERROR_CODES.INVALID_URL,
      message: 'Invalid input format. URL must be a non-empty string.',
    };
  }

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      isValid: false,
      code: ERROR_CODES.INVALID_URL,
      message: 'Please provide a URL to analyze.',
    };
  }

  if (trimmed.length > MAX_URL_LENGTH) {
    return {
      isValid: false,
      code: ERROR_CODES.INVALID_URL,
      message: `URL exceeds maximum allowable length of ${MAX_URL_LENGTH} characters.`,
    };
  }

  // Ensure scheme
  let urlCandidate = trimmed;
  if (!/^https?:\/\//i.test(urlCandidate)) {
    urlCandidate = `https://${urlCandidate}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(urlCandidate);
  } catch {
    return {
      isValid: false,
      code: ERROR_CODES.INVALID_URL,
      message: 'The URL format could not be parsed. Please check the address.',
    };
  }

  // Protocol check
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      isValid: false,
      code: ERROR_CODES.INVALID_URL,
      message: 'Only HTTP and HTTPS protocols are supported.',
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Check blocked exact hostnames
  if (BLOCKED_HOSTNAMES.has(hostname)) {
    return {
      isValid: false,
      code: ERROR_CODES.SSRF_BLOCKED,
      message: 'Access to localhost and internal loopback addresses is prohibited.',
    };
  }

  // Check internal domain suffixes
  for (const suffix of BLOCKED_DOMAINS_SUFFIX) {
    if (hostname.endsWith(suffix)) {
      return {
        isValid: false,
        code: ERROR_CODES.SSRF_BLOCKED,
        message: 'Access to internal and local network domains is prohibited.',
      };
    }
  }

  // Check if hostname is an IP and if it's private
  if (isPrivateIp(hostname)) {
    return {
      isValid: false,
      code: ERROR_CODES.SSRF_BLOCKED,
      message: 'Access to private, link-local, and reserved IP ranges is prohibited.',
    };
  }

  // Check ports (only standard web ports allowed)
  if (parsed.port && !['80', '443', '8080', '8443'].includes(parsed.port)) {
    return {
      isValid: false,
      code: ERROR_CODES.SSRF_BLOCKED,
      message: 'Access to non-standard network ports is restricted for security.',
    };
  }

  // Normalize URL
  const normalizedUrl = parsed.toString();

  return {
    isValid: true,
    parsedUrl: parsed,
    normalizedUrl,
  };
}

export function sanitizeText(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/[<>]/g, '') // strip HTML brackets
    .replace(/[\x00-\x1F\x7F]/g, '') // strip control chars
    .trim();
}
