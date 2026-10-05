import { ExtractedFormat } from './types';

export function normalizeAndSortFormats(rawFormats: ExtractedFormat[]): ExtractedFormat[] {
  if (!rawFormats || rawFormats.length === 0) return [];

  const seenUrls = new Set<string>();
  const deduplicated: ExtractedFormat[] = [];

  for (const fmt of rawFormats) {
    if (!fmt.rawCdnUrl || seenUrls.has(fmt.rawCdnUrl)) continue;
    seenUrls.add(fmt.rawCdnUrl);

    // Standardize quality label
    let label = fmt.quality || 'HD Stream';
    if (!label.toLowerCase().includes('hd') && (fmt.height && fmt.height >= 720)) {
      label = `${fmt.height}p HD`;
    }

    deduplicated.push({
      ...fmt,
      quality: label,
      ext: fmt.ext || (fmt.mime.startsWith('audio') ? 'mp3' : 'mp4'),
    });
  }

  // Sort formats: 1080p -> 720p -> SD -> Audio
  return deduplicated.sort((a, b) => {
    const heightA = a.height || (a.quality.includes('1080') ? 1080 : a.quality.includes('720') ? 720 : 480);
    const heightB = b.height || (b.quality.includes('1080') ? 1080 : b.quality.includes('720') ? 720 : 480);
    return heightB - heightA;
  });
}
