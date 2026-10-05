import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

export class FacebookProvider implements MediaProvider {
  id = 'facebook';
  name = 'Facebook';

  match(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'facebook.com' ||
      host.endsWith('.facebook.com') ||
      host === 'fb.watch' ||
      host === 'fb.com'
    );
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      const cleanUrl = url.toString();
      let title = 'Facebook Public Video';
      let thumbnailUrl: string | undefined;
      let directVideoUrl: string | undefined;
      let hdVideoUrl: string | undefined;

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
            title = sanitizeText(titleMatch[1].replace(/ \| Facebook$/i, ''));
          }

          const imgMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
          if (imgMatch && imgMatch[1]) {
            thumbnailUrl = imgMatch[1].replace(/&amp;/g, '&');
          }

          const hdMatch =
            html.match(/<meta property="og:video:secure_url" content="([^"]+)"/i) ||
            html.match(/<meta property="og:video" content="([^"]+)"/i) ||
            html.match(/"browser_native_hd_url":"([^"]+)"/i) ||
            html.match(/"hd_src":"([^"]+)"/i);
          if (hdMatch && hdMatch[1]) {
            hdVideoUrl = hdMatch[1].replace(/&amp;/g, '&').replace(/\\/g, '');
          }

          const sdMatch =
            html.match(/"browser_native_sd_url":"([^"]+)"/i) ||
            html.match(/"sd_src":"([^"]+)"/i);
          if (sdMatch && sdMatch[1]) {
            directVideoUrl = sdMatch[1].replace(/&amp;/g, '&').replace(/\\/g, '');
          }
        }
      } catch {
        // fallback
      }

      const primaryUrl = hdVideoUrl || directVideoUrl;

      if (!primaryUrl || !/^https?:\/\//i.test(primaryUrl)) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message:
            'Could not extract a downloadable video stream from this Facebook post. Please verify that the post is public and contains a video.',
        };
      }

      const formats = [];
      if (hdVideoUrl) {
        formats.push({
          id: 'facebook-mp4-hd',
          label: 'Facebook HD Video Stream',
          quality: '1080p HD',
          mime: 'video/mp4',
          downloadUrl: hdVideoUrl,
          ext: 'mp4',
          hasAudio: true,
          isDownloadable: true,
        });
      }
      if (directVideoUrl && directVideoUrl !== hdVideoUrl) {
        formats.push({
          id: 'facebook-mp4-sd',
          label: 'Facebook SD Video Stream',
          quality: '480p SD',
          mime: 'video/mp4',
          downloadUrl: directVideoUrl,
          ext: 'mp4',
          hasAudio: true,
          isDownloadable: true,
        });
      }

      return {
        ok: true,
        platform: 'facebook',
        platformName: 'Facebook',
        type: 'video',
        title,
        thumbnailUrl,
        previewVideoUrl: primaryUrl,
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
