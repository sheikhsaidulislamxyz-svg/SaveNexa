import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { executeOpenSourceBackendExtraction } from '../../backend';
import { sanitizeText } from '../../../security';

// Strategy 1: Tikwm Public API for TikTok
export class TikTokTikwmStrategy implements ExtractionStrategy {
  name = 'TikTok Tikwm Public API';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString().split('?')[0];

    try {
      const tikwmUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(cleanUrl)}`;
      const res = await fetch(tikwmUrl, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Tikwm HTTP ${res.status}` };
      }

      const data = await res.json();
      if (data.code === 0 && data.data) {
        const item = data.data;
        const playUrl = item.play || item.wmplay;
        const title = sanitizeText(item.title) || 'TikTok HD Video';
        const author = item.author?.nickname ? `@${sanitizeText(item.author.nickname)}` : undefined;
        const thumbnailUrl = item.cover || item.origin_cover;

        if (playUrl && /^https?:\/\//i.test(playUrl)) {
          // Fix relative Tikwm URLs if needed
          const fullPlayUrl = playUrl.startsWith('//') ? `https:${playUrl}` : playUrl.startsWith('/') ? `https://www.tikwm.com${playUrl}` : playUrl;

          const validation = await validateMediaStreamUrl(fullPlayUrl, context.signal);
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
                  id: 'tiktok-tikwm-hd',
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
      }

      return { success: false, status: 'NOT_FOUND', message: 'Tikwm returned no play URL' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

// Strategy 2: TikTok Embed v2 Endpoint
export class TikTokEmbedStrategy implements ExtractionStrategy {
  name = 'TikTok Embed v2 Endpoint';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString().split('?')[0];
    const videoIdMatch = cleanUrl.match(/\/video\/(\d+)/i);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    if (!videoId) {
      return { success: false, status: 'UNSUPPORTED', message: 'No video ID in URL' };
    }

    try {
      const embedEndpoint = `https://www.tiktok.com/embed/v2/${videoId}`;
      const res = await fetch(embedEndpoint, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Embed HTTP ${res.status}` };
      }

      const html = await res.text();
      let rawVideoUrl: string | undefined;
      let thumbnailUrl: string | undefined;

      const videoMatch =
        html.match(/"playAddr":"([^"]+)"/i) ||
        html.match(/"playUrl":"([^"]+)"/i) ||
        html.match(/"downloadAddr":"([^"]+)"/i) ||
        html.match(/<video[^>]*src="([^"]+)"/i);

      if (videoMatch && videoMatch[1]) {
        rawVideoUrl = videoMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
      }

      const imgMatch =
        html.match(/"cover":"([^"]+)"/i) ||
        html.match(/"originCover":"([^"]+)"/i) ||
        html.match(/property="og:image" content="([^"]+)"/i);
      if (imgMatch && imgMatch[1]) {
        thumbnailUrl = imgMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
      }

      if (rawVideoUrl && /^https?:\/\//i.test(rawVideoUrl)) {
        const validation = await validateMediaStreamUrl(rawVideoUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          return {
            success: true,
            status: 'SUCCESS',
            title: 'TikTok HD Video',
            thumbnailUrl,
            previewVideoUrl: validation.finalUrl,
            formats: [
              {
                id: 'tiktok-embed-1080p',
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

      return { success: false, status: 'NOT_FOUND', message: 'No playAddr found' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

// Strategy 3: TikTok Mobile Feed API
export class TikTokMobileApiStrategy implements ExtractionStrategy {
  name = 'TikTok Mobile Feed API';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString().split('?')[0];
    const videoIdMatch = cleanUrl.match(/\/video\/(\d+)/i);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    if (!videoId) {
      return { success: false, status: 'UNSUPPORTED', message: 'No video ID' };
    }

    try {
      const feedEndpoint = `https://api.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`;
      const res = await fetch(feedEndpoint, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Feed HTTP ${res.status}` };
      }

      const data = await res.json();
      const aweme = data?.aweme_list?.[0];

      if (aweme) {
        const title = sanitizeText(aweme.desc) || 'TikTok Video';
        const author = aweme.author?.nickname ? `@${sanitizeText(aweme.author.nickname)}` : undefined;
        const thumbnailUrl = aweme.video?.cover?.url_list?.[0];
        const playAddr = aweme.video?.play_addr?.url_list?.[0] || aweme.video?.download_addr?.url_list?.[0];

        if (playAddr && /^https?:\/\//i.test(playAddr)) {
          const validation = await validateMediaStreamUrl(playAddr, context.signal);
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
                  id: 'tiktok-mobile-1080p',
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
      }

      return { success: false, status: 'NOT_FOUND', message: 'No media in mobile feed API' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

// Strategy 4: Open-Source Backend Fallback
export class TikTokOpenSourceBackendStrategy implements ExtractionStrategy {
  name = 'TikTok Open-Source Backend';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    return executeOpenSourceBackendExtraction(url.toString(), context);
  }
}
