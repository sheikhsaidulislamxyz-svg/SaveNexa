import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { executeOpenSourceBackendExtraction } from '../../backend';
import { sanitizeText } from '../../../security';

// Strategy 1: Reddit Embed HTML Scraper
export class RedditEmbedStrategy implements ExtractionStrategy {
  name = 'Reddit Embed HTML Scraper';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const pathname = url.pathname;
    // Translate standard reddit url to embed url
    const embedUrl = `https://embed.reddit.com${pathname}`;

    try {
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
      let title = 'Reddit Video / Media';
      let thumbnailUrl: string | undefined;
      let rawVideoUrl: string | undefined;

      const titleMatch =
        html.match(/<title>([^<]+)<\/title>/i) ||
        html.match(/"title"\s*:\s*"([^"]+)"/i);
      if (titleMatch && titleMatch[1]) {
        title = sanitizeText(titleMatch[1]);
      }

      const posterMatch = html.match(/poster="([^"]+)"/i) || html.match(/"thumbnailUrl"\s*:\s*"([^"]+)"/i);
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
        // Fallback search direct v.redd.it or mp4/m3u8 CDN links
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

// Strategy 2: Reddit Public JSON API
export class RedditJsonStrategy implements ExtractionStrategy {
  name = 'Reddit Public JSON API (.json)';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    let jsonUrl = url.toString().split('?')[0];
    if (!jsonUrl.endsWith('.json')) {
      jsonUrl = `${jsonUrl.replace(/\/$/, '')}.json`;
    }

    try {
      const res = await fetch(jsonUrl, {
        signal: context.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        return { success: false, status: res.status === 404 ? 'NOT_FOUND' : 'BLOCKED', message: `HTTP ${res.status}` };
      }

      const data = await res.json();
      const post = data?.[0]?.data?.children?.[0]?.data;

      if (!post) {
        return { success: false, status: 'NOT_FOUND', message: 'No post payload' };
      }

      const title = sanitizeText(post.title) || 'Reddit Video';
      const author = post.author ? `u/${sanitizeText(post.author)}` : undefined;
      const thumbnailUrl = post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : undefined;

      const formats = [];
      let previewVideoUrl: string | undefined;

      const redditVideo = post.secure_media?.reddit_video || post.media?.reddit_video;
      if (redditVideo && redditVideo.fallback_url) {
        const videoFallback = redditVideo.fallback_url.split('?')[0];
        const validation = await validateMediaStreamUrl(videoFallback, context.signal);

        if (validation.valid && validation.finalUrl) {
          previewVideoUrl = validation.finalUrl;
          const height = redditVideo.height || 720;

          formats.push({
            id: `reddit-video-${height}p`,
            quality: `${height}p HD`,
            mime: validation.contentType || 'video/mp4',
            ext: 'mp4',
            hasAudio: true,
            sizeBytes: validation.contentLength,
            rawCdnUrl: validation.finalUrl,
          });

          // DASH audio track
          const baseUrl = videoFallback.substring(0, videoFallback.lastIndexOf('/'));
          const audioUrl = `${baseUrl}/DASH_AUDIO_128.mp4`;
          const audioVal = await validateMediaStreamUrl(audioUrl, context.signal);
          if (audioVal.valid && audioVal.finalUrl) {
            formats.push({
              id: 'reddit-audio-128k',
              quality: 'Audio 128k',
              mime: audioVal.contentType || 'audio/mp4',
              ext: 'mp4',
              hasAudio: true,
              sizeBytes: audioVal.contentLength,
              rawCdnUrl: audioVal.finalUrl,
            });
          }
        }
      } else if (post.url_overridden_by_dest && /^https?:\/\//i.test(post.url_overridden_by_dest)) {
        const dest = post.url_overridden_by_dest;
        const validation = await validateMediaStreamUrl(dest, context.signal);
        if (validation.valid && validation.finalUrl) {
          previewVideoUrl = validation.finalUrl;
          const isGif = dest.endsWith('.gif');
          formats.push({
            id: 'reddit-dest-stream',
            quality: 'Original Stream',
            mime: validation.contentType || (isGif ? 'image/gif' : 'video/mp4'),
            ext: isGif ? 'gif' : 'mp4',
            hasAudio: !isGif,
            sizeBytes: validation.contentLength,
            rawCdnUrl: validation.finalUrl,
          });
        }
      }

      if (formats.length > 0) {
        return {
          success: true,
          status: 'SUCCESS',
          title,
          author,
          authorUrl: author ? `https://www.reddit.com/user/${post.author}` : undefined,
          thumbnailUrl,
          previewVideoUrl,
          durationSeconds: redditVideo?.duration || null,
          formats,
        };
      }

      return { success: false, status: 'NOT_FOUND', message: 'No media formats found in post JSON.' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

// Strategy 3: Open-Source Backend Fallback
export class RedditOpenSourceBackendStrategy implements ExtractionStrategy {
  name = 'Reddit Open-Source Backend';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    return executeOpenSourceBackendExtraction(url.toString(), context);
  }
}
