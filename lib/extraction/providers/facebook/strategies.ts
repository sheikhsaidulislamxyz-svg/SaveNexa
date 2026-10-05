import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { executeOpenSourceBackendExtraction } from '../../backend';
import { sanitizeText } from '../../../security';

export class FacebookWatchStrategy implements ExtractionStrategy {
  name = 'Facebook Watch HTML Meta Tags';

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
        return { success: false, status: 'BLOCKED', message: `Facebook HTTP ${res.status}` };
      }

      const html = await res.text();
      let title = 'Facebook Public Video';
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
        sdVideoUrl = sdMatch[1].replace(/&amp;/g, '&').replace(/\\/g, '');
      }

      const primaryUrl = hdVideoUrl || sdVideoUrl;

      if (primaryUrl && /^https?:\/\//i.test(primaryUrl)) {
        const validation = await validateMediaStreamUrl(primaryUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          const formats = [];
          formats.push({
            id: 'facebook-hd',
            quality: '1080p HD',
            mime: validation.contentType || 'video/mp4',
            ext: 'mp4',
            hasAudio: true,
            sizeBytes: validation.contentLength,
            rawCdnUrl: validation.finalUrl,
          });

          if (sdVideoUrl && sdVideoUrl !== primaryUrl) {
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

      return { success: false, status: 'NOT_FOUND', message: 'No og:video in Facebook HTML' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

export class FacebookOpenSourceBackendStrategy implements ExtractionStrategy {
  name = 'Facebook Open-Source Pluggable Backend';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    return executeOpenSourceBackendExtraction(url.toString(), context);
  }
}
