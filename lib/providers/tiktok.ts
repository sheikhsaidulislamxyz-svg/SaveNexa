import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

export class TikTokProvider implements MediaProvider {
  id = 'tiktok';
  name = 'TikTok';

  match(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'tiktok.com' ||
      host.endsWith('.tiktok.com') ||
      host === 'v.douyin.com'
    );
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      let cleanUrl = url.toString().split('?')[0];

      // Handle shortened mobile links if needed
      if (cleanUrl.includes('vm.tiktok.com') || cleanUrl.includes('vt.tiktok.com')) {
        try {
          const redirectRes = await fetch(cleanUrl, {
            method: 'HEAD',
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
          });
          if (redirectRes.url) {
            cleanUrl = redirectRes.url.split('?')[0];
          }
        } catch {
          // fallback to original cleanUrl
        }
      }

      // Extract video ID from URL e.g. /video/7106594312292453678
      const videoIdMatch = cleanUrl.match(/\/video\/(\d+)/i);
      const videoId = videoIdMatch ? videoIdMatch[1] : '';

      let title = 'TikTok Public Video';
      let author: string | undefined;
      let authorUrl: string | undefined;
      let thumbnailUrl: string | undefined;
      let directVideoUrl: string | undefined;

      // Tier 1: Try TikTok embed v2 endpoint (https://www.tiktok.com/embed/v2/<video_id>)
      if (videoId) {
        try {
          const embedEndpoint = `https://www.tiktok.com/embed/v2/${videoId}`;
          const embedRes = await fetch(embedEndpoint, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html',
            },
          });

          if (embedRes.ok) {
            const html = await embedRes.text();

            const videoMatch =
              html.match(/"playAddr":"([^"]+)"/i) ||
              html.match(/"playUrl":"([^"]+)"/i) ||
              html.match(/"downloadAddr":"([^"]+)"/i) ||
              html.match(/<video[^>]*src="([^"]+)"/i);

            if (videoMatch && videoMatch[1]) {
              directVideoUrl = videoMatch[1]
                .replace(/\\u0026/g, '&')
                .replace(/\\/g, '');
            }

            const imgMatch =
              html.match(/"cover":"([^"]+)"/i) ||
              html.match(/"originCover":"([^"]+)"/i) ||
              html.match(/property="og:image" content="([^"]+)"/i);
            if (imgMatch && imgMatch[1]) {
              thumbnailUrl = imgMatch[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
            }
          }
        } catch {
          // proceed to tier 2
        }
      }

      // Tier 2: Fetch TikTok oEmbed API for metadata + Page HTML for video stream
      if (!directVideoUrl) {
        try {
          const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(cleanUrl)}`;
          const oembedRes = await fetch(oembedUrl, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/json',
            },
          });

          if (oembedRes.ok) {
            const oembedData = await oembedRes.json();
            title = sanitizeText(oembedData.title) || title;
            author = sanitizeText(oembedData.author_name) || undefined;
            authorUrl = oembedData.author_url || undefined;
            thumbnailUrl = oembedData.thumbnail_url || thumbnailUrl;
          }
        } catch {
          // ignore
        }

        try {
          const pageRes = await fetch(cleanUrl, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
              'Accept': 'text/html,application/xhtml+xml',
            },
          });

          if (pageRes.ok) {
            const html = await pageRes.text();
            const videoMatch =
              html.match(/<meta property="og:video:secure_url" content="([^"]+)"/i) ||
              html.match(/<meta property="og:video" content="([^"]+)"/i) ||
              html.match(/"playAddr":"([^"]+)"/i) ||
              html.match(/"downloadAddr":"([^"]+)"/i);

            if (videoMatch && videoMatch[1]) {
              directVideoUrl = videoMatch[1]
                .replace(/\\u0026/g, '&')
                .replace(/\\/g, '');
            }
          }
        } catch {
          // fallback
        }
      }

      // CRITICAL REQUIREMENT: Must only return formats if a real streamable media URL exists!
      if (!directVideoUrl || !/^https?:\/\//i.test(directVideoUrl)) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message:
            'Could not extract a downloadable video stream from this TikTok post. Please verify that the video is public and accessible.',
        };
      }

      const formats = [
        {
          id: 'tiktok-mp4-hd',
          label: 'TikTok HD Video Stream',
          quality: '1080p HD',
          mime: 'video/mp4',
          downloadUrl: directVideoUrl,
          ext: 'mp4',
          hasAudio: true,
          isDownloadable: true,
        },
      ];

      return {
        ok: true,
        platform: 'tiktok',
        platformName: 'TikTok',
        type: 'video',
        title,
        author,
        authorUrl,
        thumbnailUrl,
        previewVideoUrl: directVideoUrl,
        durationSeconds: null,
        sourceUrl: cleanUrl,
        formats,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return {
          ok: false,
          code: ERROR_CODES.SOURCE_TIMEOUT,
          message: ERROR_MESSAGES[ERROR_CODES.SOURCE_TIMEOUT],
        };
      }
      return {
        ok: false,
        code: ERROR_CODES.SOURCE_UNAVAILABLE,
        message: ERROR_MESSAGES[ERROR_CODES.SOURCE_UNAVAILABLE],
      };
    }
  }
}
