import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

const DIRECT_MEDIA_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v', '.ogv', '.mp3', '.m4a', '.wav', '.ogg'];

export class GenericMediaProvider implements MediaProvider {
  id = 'generic';
  name = 'Direct Media URL';

  match(url: URL): boolean {
    const pathname = url.pathname.toLowerCase();
    return DIRECT_MEDIA_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      const pathname = url.pathname;
      const fileName = pathname.split('/').pop() || 'media-file.mp4';
      const cleanFileName = decodeURIComponent(fileName.split('?')[0]);
      const extMatch = cleanFileName.match(/\.([a-zA-Z0-9]+)$/);
      const ext = extMatch ? extMatch[1].toLowerCase() : 'mp4';

      let mimeType = 'video/mp4';
      let mediaType: 'video' | 'audio' = 'video';

      if (['mp3', 'm4a', 'wav', 'ogg'].includes(ext)) {
        mediaType = 'audio';
        mimeType = ext === 'mp3' ? 'audio/mpeg' : `audio/${ext}`;
      } else if (ext === 'webm') {
        mimeType = 'video/webm';
      } else if (ext === 'mov') {
        mimeType = 'video/quicktime';
      }

      // Perform a lightweight HEAD request to inspect headers
      let sizeBytes: number | null = null;
      try {
        const headRes = await fetch(url.toString(), {
          method: 'HEAD',
          signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });

        if (headRes.ok) {
          const contentLength = headRes.headers.get('content-length');
          if (contentLength) {
            const parsedSize = parseInt(contentLength, 10);
            if (!isNaN(parsedSize) && parsedSize > 0) {
              sizeBytes = parsedSize;
            }
          }
          const serverContentType = headRes.headers.get('content-type');
          if (serverContentType) {
            mimeType = serverContentType.split(';')[0].trim();
            if (mimeType.startsWith('audio/')) {
              mediaType = 'audio';
            }
          }
        }
      } catch {
        // If HEAD fails, still allow direct URL
      }

      return {
        ok: true,
        platform: 'generic',
        platformName: 'Direct Media',
        type: mediaType,
        title: sanitizeText(cleanFileName) || 'Direct Video Stream',
        thumbnailUrl: undefined,
        previewVideoUrl: mediaType === 'video' ? url.toString() : undefined,
        durationSeconds: null,
        sourceUrl: url.toString(),
        formats: [
          {
            id: 'direct-source',
            label: `Direct ${ext.toUpperCase()} Stream`,
            quality: 'Original Stream',
            mime: mimeType,
            sizeBytes,
            downloadUrl: url.toString(),
            ext,
            isDownloadable: true,
          },
        ],
      };
    } catch {
      return {
        ok: false,
        code: ERROR_CODES.SOURCE_UNAVAILABLE,
        message: ERROR_MESSAGES[ERROR_CODES.SOURCE_UNAVAILABLE],
      };
    }
  }
}
