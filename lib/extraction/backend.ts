import { StrategyResult, ExtractionContext } from './types';
import { validateMediaStreamUrl } from './security';

const PUBLIC_OPEN_SOURCE_BACKENDS = [
  'https://api.cobalt.tools',
  'https://cobalt.api.scx.ovh',
  'https://cobalt.tools/api',
  'https://cobalt-api.kwi.fi',
];

export async function executeOpenSourceBackendExtraction(
  targetUrl: string,
  context: ExtractionContext,
  options?: { isAudioOnly?: boolean; downloadMode?: string }
): Promise<StrategyResult> {
  const cleanUrl = targetUrl.split('?')[0];

  for (const backendHost of PUBLIC_OPEN_SOURCE_BACKENDS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const signal =
        context.signal && typeof AbortSignal !== 'undefined' && 'any' in AbortSignal
          ? AbortSignal.any([context.signal, controller.signal])
          : controller.signal;

      const payload = {
        url: cleanUrl,
        videoQuality: 'max',
        audioFormat: options?.isAudioOnly ? 'mp3' : 'best',
        downloadMode: options?.downloadMode || 'auto',
      };

      const res = await fetch(`${backendHost}/`, {
        method: 'POST',
        signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(payload),
      });

      clearTimeout(timeoutId);

      if (!res.ok) continue;

      const data = await res.json();

      let mediaStreamUrl = '';
      const mimeType = options?.isAudioOnly ? 'audio/mpeg' : 'video/mp4';
      const title = 'Public Social Media Video';

      if (data.status === 'tunnel' || data.status === 'redirect' || data.status === 'stream') {
        mediaStreamUrl = data.url;
      } else if (data.status === 'picker' && Array.isArray(data.picker)) {
        const firstVideo = data.picker.find((item: { type?: string }) => item.type === 'video') || data.picker[0];
        if (firstVideo && firstVideo.url) {
          mediaStreamUrl = firstVideo.url;
        }
      } else if (data.url && typeof data.url === 'string') {
        mediaStreamUrl = data.url;
      }

      if (mediaStreamUrl && /^https?:\/\//i.test(mediaStreamUrl)) {
        const validation = await validateMediaStreamUrl(mediaStreamUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          return {
            success: true,
            status: 'SUCCESS',
            title,
            previewVideoUrl: validation.finalUrl,
            formats: [
              {
                id: 'cobalt-stream-hd',
                quality: '1080p HD',
                mime: validation.contentType || mimeType,
                ext: options?.isAudioOnly ? 'mp3' : 'mp4',
                sizeBytes: validation.contentLength,
                hasAudio: true,
                rawCdnUrl: validation.finalUrl,
              },
            ],
          };
        }
      }
    } catch {
      // try next open-source backend instance
    }
  }

  return {
    success: false,
    status: 'TEMPORARY_FAILURE',
    message: 'Open-source extraction backend was unable to resolve a public media stream.',
  };
}
