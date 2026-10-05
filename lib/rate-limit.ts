import { MAX_ANALYZE_ATTEMPTS_PER_WINDOW, RATE_LIMIT_WINDOW_MS } from './constants';

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Cleanup stale keys periodically
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, record] of memoryStore.entries()) {
    const validTimestamps = record.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (validTimestamps.length === 0) {
      memoryStore.delete(key);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

export function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number } {
  cleanup();
  const now = Date.now();
  const key = clientIp || 'unknown-client';

  let record = memoryStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // Filter timestamps within sliding window
  record.timestamps = record.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (record.timestamps.length >= MAX_ANALYZE_ATTEMPTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: MAX_ANALYZE_ATTEMPTS_PER_WINDOW - record.timestamps.length,
  };
}
