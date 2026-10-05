import { findExtractorForUrl } from '../extraction/registry';

export function detectPlatformFromUrl(rawUrl: string): { id: string; name: string } | null {
  try {
    let urlStr = rawUrl.trim();
    if (!/^https?:\/\//i.test(urlStr)) {
      urlStr = `https://${urlStr}`;
    }
    const parsed = new URL(urlStr);
    const extractor = findExtractorForUrl(parsed);
    if (extractor) {
      return { id: extractor.id, name: extractor.name };
    }
  } catch {
    // not a valid URL candidate yet
  }
  return null;
}
