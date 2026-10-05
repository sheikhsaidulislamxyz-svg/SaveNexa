import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

export class PinterestProvider implements MediaProvider {
  id = 'pinterest';
  name = 'Pinterest';

  match(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'pinterest.com' ||
      host.endsWith('.pinterest.com') ||
      host === 'pin.it'
    );
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      const cleanUrl = url.toString();
      let title = 'Pinterest Video Pin';
      let thumbnailUrl: string | undefined;
      let directVideoUrl: string | undefined;

      try {
        const res = await fetch(cleanUrl, {
          signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html',
          },
        });

        if (res.ok) {
          const html = await res.text();
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
            html.match(/"video_url":"([^"]+)"/i);
          if (videoMatch && videoMatch[1]) {
            directVideoUrl = videoMatch[1].replace(/&amp;/g, '&').replace(/\\/g, '');
          }
        }
      } catch {
        // fallback
      }

      if (!directVideoUrl || !/^https?:\/\//i.test(directVideoUrl)) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message:
            'Could not extract a downloadable video stream from this Pinterest pin. Please verify that the pin is public and contains a video.',
        };
      }

      const formats = [
        {
          id: 'pinterest-mp4-hd',
          label: 'Pinterest Video Pin Stream',
          quality: '1080p HD',
          mime: 'video/mp4',
          downloadUrl: directVideoUrl,
          ext: 'mp4',
          isDownloadable: true,
        },
      ];

      return {
        ok: true,
        platform: 'pinterest',
        platformName: 'Pinterest',
        type: 'video',
        title,
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
