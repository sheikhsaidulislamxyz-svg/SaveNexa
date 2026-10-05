import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { executeOpenSourceBackendExtraction } from '../../backend';
import { sanitizeText } from '../../../security';

export class PinterestPinStrategy implements ExtractionStrategy {
  name = 'Pinterest Pin HTML & Meta Tags';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString();

    try {
      const res = await fetch(cleanUrl, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Pinterest HTTP ${res.status}` };
      }

      const html = await res.text();
      let title = 'Pinterest Video Pin';
      let thumbnailUrl: string | undefined;
      let rawVideoUrl: string | undefined;

      const titleMatch =
        html.match(/<meta property="og:title" content="([^"]+)"/i) ||
        html.match(/<title>([^<]+)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        title = sanitizeText(titleMatch[1].replace(/ \| Pinterest$/i, ''));
      }

      const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
      if (imgMatch && imgMatch[1]) {
        thumbnailUrl = imgMatch[1].replace(/&amp;/g, '&');
      }

      const videoMatch =
        html.match(/<meta property="og:video" content="([^"]+)"/i) ||
        html.match(/<meta property="og:video:secure_url" content="([^"]+)"/i) ||
        html.match(/"video_url"\s*:\s*"([^"]+)"/i) ||
        html.match(/"url"\s*:\s*"([^"]+\.mp4[^"]*)"/i);

      if (videoMatch && videoMatch[1]) {
        rawVideoUrl = videoMatch[1].replace(/&amp;/g, '&').replace(/\\/g, '');
      } else {
        // Fallback to searching direct .mp4 URLs in HTML
        const mp4Matches = html.match(/https?:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/gi);
        if (mp4Matches && mp4Matches.length > 0) {
          rawVideoUrl = mp4Matches[0].replace(/&amp;/g, '&').replace(/\\/g, '');
        }
      }

      if (rawVideoUrl && /^https?:\/\//i.test(rawVideoUrl)) {
        const validation = await validateMediaStreamUrl(rawVideoUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          return {
            success: true,
            status: 'SUCCESS',
            title,
            thumbnailUrl,
            previewVideoUrl: validation.finalUrl,
            formats: [
              {
                id: 'pinterest-1080p',
                quality: '1080p HD',
                mime: validation.contentType || 'video/mp4',
                ext: 'mp4',
                hasAudio: true,
                sizeBytes: validation.contentLength,
                rawCdnUrl: validation.finalUrl,
              },
            ],
          };
        }
      }

      return { success: false, status: 'NOT_FOUND', message: 'No og:video in Pinterest HTML' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

export class PinterestOpenSourceBackendStrategy implements ExtractionStrategy {
  name = 'Pinterest Open-Source Pluggable Backend';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    return executeOpenSourceBackendExtraction(url.toString(), context);
  }
}
