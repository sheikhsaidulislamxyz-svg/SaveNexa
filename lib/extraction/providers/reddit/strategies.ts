import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { sanitizeText } from '../../../security';

// Strategy 1: Reddit Embed HTML Scraper
export class RedditEmbedStrategy implements ExtractionStrategy {
  name = 'Reddit Embed HTML Scraper';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const pathname = url.pathname;
    const embedUrl = `https://embed.reddit.com${pathname}`;

    try {
      // Simultaneously fetch title from oembed if possible
      let oembedTitle: string | undefined;
      let oembedAuthor: string | undefined;

      try {
        const oembedRes = await fetch(`https://www.reddit.com/oembed?url=${encodeURIComponent(url.toString())}`, {
          signal: context.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          if (oembedData.title) oembedTitle = sanitizeText(oembedData.title);
          if (oembedData.author_name) oembedAuthor = `u/${sanitizeText(oembedData.author_name)}`;
        }
      } catch {
        // non-blocking
      }

      const res = await fetch(embedUrl, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Reddit Embed HTTP ${res.status}` };
      }

      const html = await res.text();
      let title = oembedTitle || 'Reddit Video / Media';
      let author = oembedAuthor;
      let thumbnailUrl: string | undefined;
      let rawVideoUrl: string | undefined;

      const titleMatch =
        html.match(/<title>([^<]+)<\/title>/i) ||
        html.match(/"title"\s*:\s*"([^"]+)"/i);
      if (!oembedTitle && titleMatch && titleMatch[1]) {
        title = sanitizeText(titleMatch[1]);
      }

      const posterMatch =
        html.match(/poster="([^"]+)"/i) ||
        html.match(/"thumbnailUrl"\s*:\s*"([^"]+)"/i) ||
        html.match(/<meta property="og:image" content="([^"]+)"/i);
      if (posterMatch && posterMatch[1]) {
        thumbnailUrl = posterMatch[1].replace(/&amp;/g, '&');
      }

      const shredditMatch =
        html.match(/<shreddit-player[^>]*src="([^"]+)"/i) ||
        html.match(/src="([^"]+format=mp4[^"]+)"/i) ||
        html.match(/<video[^>]*src="([^"]+)"/i);

      if (shredditMatch && shredditMatch[1]) {
        rawVideoUrl = shredditMatch[1].replace(/&amp;/g, '&');
      } else {
        const mp4Matches = html.match(/https?:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/gi);
        if (mp4Matches && mp4Matches.length > 0) {
          rawVideoUrl = mp4Matches[0].replace(/&amp;/g, '&');
        }
      }

      if (rawVideoUrl && /^https?:\/\//i.test(rawVideoUrl)) {
        const validation = await validateMediaStreamUrl(rawVideoUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          return {
            success: true,
            status: 'SUCCESS',
            title,
            author,
            thumbnailUrl,
            previewVideoUrl: validation.finalUrl,
            formats: [
              {
                id: 'reddit-embed-video',
                quality: '720p HD',
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

      return { success: false, status: 'NOT_FOUND', message: 'No media stream found in Reddit embed HTML' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}
