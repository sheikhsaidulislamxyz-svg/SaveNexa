import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { sanitizeText } from '../../../security';

function cleanFacebookUrl(raw: string): string {
  try {
    return JSON.parse(`"${raw}"`);
  } catch {
    return raw
      .replace(/\\u00253D/gi, '=')
      .replace(/\\u002526/gi, '&')
      .replace(/\\u0026/gi, '&')
      .replace(/\\\//g, '/')
      .replace(/\\/g, '');
  }
}

// Strategy 1: Facebook Video Plugin HTML Extraction (High Reliability)
export class FacebookPluginStrategy implements ExtractionStrategy {
  name = 'Facebook Video Plugin API';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString();
    const isReel = cleanUrl.includes('/reel/') || cleanUrl.includes('/reels/');
    const pluginUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}`;

    try {
      const res = await fetch(pluginUrl, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Facebook Plugin HTTP ${res.status}` };
      }

      const html = await res.text();
      let title = isReel ? 'Facebook Reel' : 'Facebook Public Video';
      let thumbnailUrl: string | undefined;
      let hdVideoUrl: string | undefined;
      let sdVideoUrl: string | undefined;

      const titleMatch =
        html.match(/<title>([^<]+)<\/title>/i) ||
        html.match(/"title"\s*:\s*"([^"]+)"/i);
      if (titleMatch && titleMatch[1]) {
        const cleanTitle = titleMatch[1].replace(/ \| Facebook$/i, '').trim();
        if (cleanTitle && cleanTitle !== 'Facebook') {
          title = sanitizeText(cleanTitle);
        }
      }

      const imgMatch =
        html.match(/"thumb_url":"([^"]+)"/i) ||
        html.match(/"video_thumbnail":"([^"]+)"/i);
      if (imgMatch && imgMatch[1]) {
        thumbnailUrl = cleanFacebookUrl(imgMatch[1]);
      }

      const hdMatch =
        html.match(/"hd_src":"([^"]+)"/i) ||
        html.match(/"browser_native_hd_url":"([^"]+)"/i) ||
        html.match(/"playable_url_quality_hd":"([^"]+)"/i);
      if (hdMatch && hdMatch[1]) {
        hdVideoUrl = cleanFacebookUrl(hdMatch[1]);
      }

      const sdMatch =
        html.match(/"sd_src":"([^"]+)"/i) ||
        html.match(/"browser_native_sd_url":"([^"]+)"/i) ||
        html.match(/"playable_url":"([^"]+)"/i);
      if (sdMatch && sdMatch[1]) {
        sdVideoUrl = cleanFacebookUrl(sdMatch[1]);
      }

      const primaryUrl = hdVideoUrl || sdVideoUrl;

      if (primaryUrl && /^https?:\/\//i.test(primaryUrl)) {
        const validation = await validateMediaStreamUrl(primaryUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          const formats = [];
          if (hdVideoUrl) {
            formats.push({
              id: 'facebook-hd',
              quality: '1080p HD',
              mime: validation.contentType || 'video/mp4',
              ext: 'mp4',
              hasAudio: true,
              sizeBytes: validation.contentLength,
              rawCdnUrl: validation.finalUrl,
            });
          }

          if (sdVideoUrl && sdVideoUrl !== hdVideoUrl) {
            const sdVal = await validateMediaStreamUrl(sdVideoUrl, context.signal);
            if (sdVal.valid && sdVal.finalUrl) {
              formats.push({
                id: 'facebook-sd',
                quality: '480p SD',
                mime: sdVal.contentType || 'video/mp4',
                ext: 'mp4',
                hasAudio: true,
                sizeBytes: sdVal.contentLength,
                rawCdnUrl: sdVal.finalUrl,
              });
            }
          }

          if (formats.length === 0) {
            formats.push({
              id: 'facebook-default',
              quality: '720p HD',
              mime: validation.contentType || 'video/mp4',
              ext: 'mp4',
              hasAudio: true,
              sizeBytes: validation.contentLength,
              rawCdnUrl: validation.finalUrl,
            });
          }

          return {
            success: true,
            status: 'SUCCESS',
            title,
            thumbnailUrl,
            previewVideoUrl: validation.finalUrl,
            formats,
          };
        }
      }

      return { success: false, status: 'NOT_FOUND', message: 'No video stream found in Facebook plugin response.' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

// Strategy 2: Facebook Mobile Web Scraper
export class FacebookMobileWatchStrategy implements ExtractionStrategy {
  name = 'Facebook Mobile Watch Scraper';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString();
    const isReel = cleanUrl.includes('/reel/') || cleanUrl.includes('/reels/');
    const mobileUrl = cleanUrl.replace('www.facebook.com', 'm.facebook.com');

    try {
      const res = await fetch(mobileUrl, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Facebook Mobile HTTP ${res.status}` };
      }

      const html = await res.text();
      let title = isReel ? 'Facebook Reel' : 'Facebook Public Video';
      let thumbnailUrl: string | undefined;
      let hdVideoUrl: string | undefined;
      let sdVideoUrl: string | undefined;

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
        html.match(/"browser_native_hd_url":"([^"]+)"/i) ||
        html.match(/"hd_src":"([^"]+)"/i) ||
        html.match(/"playable_url_quality_hd":"([^"]+)"/i);
      if (hdMatch && hdMatch[1]) {
        hdVideoUrl = cleanFacebookUrl(hdMatch[1]);
      }

      const sdMatch =
        html.match(/"browser_native_sd_url":"([^"]+)"/i) ||
        html.match(/"sd_src":"([^"]+)"/i) ||
        html.match(/"playable_url":"([^"]+)"/i);
      if (sdMatch && sdMatch[1]) {
        sdVideoUrl = cleanFacebookUrl(sdMatch[1]);
      }

      const primaryUrl = hdVideoUrl || sdVideoUrl;

      if (primaryUrl && /^https?:\/\//i.test(primaryUrl)) {
        const validation = await validateMediaStreamUrl(primaryUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          const formats = [];
          if (hdVideoUrl) {
            formats.push({
              id: 'facebook-mobile-hd',
              quality: '1080p HD',
              mime: validation.contentType || 'video/mp4',
              ext: 'mp4',
              hasAudio: true,
              sizeBytes: validation.contentLength,
              rawCdnUrl: validation.finalUrl,
            });
          }

          if (sdVideoUrl && sdVideoUrl !== hdVideoUrl) {
            const sdVal = await validateMediaStreamUrl(sdVideoUrl, context.signal);
            if (sdVal.valid && sdVal.finalUrl) {
              formats.push({
                id: 'facebook-mobile-sd',
                quality: '480p SD',
                mime: sdVal.contentType || 'video/mp4',
                ext: 'mp4',
                hasAudio: true,
                sizeBytes: sdVal.contentLength,
                rawCdnUrl: sdVal.finalUrl,
              });
            }
          }

          return {
            success: true,
            status: 'SUCCESS',
            title,
            thumbnailUrl,
            previewVideoUrl: validation.finalUrl,
            formats,
          };
        }
      }

      return { success: false, status: 'NOT_FOUND', message: 'No media stream in Facebook mobile HTML.' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}
