import { ProviderExtractor, ExtractionContext, ExtractionEngineResult } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { sanitizeText } from '../../../security';
import { EXTRACTION_ERROR_MESSAGES } from '../../errors';

const DIRECT_MEDIA_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v', '.ogv', '.mp3', '.m4a', '.wav', '.ogg'];

export class GenericMediaProviderExtractor implements ProviderExtractor {
  id = 'generic';
  name = 'Direct Media Stream';

  canHandle(url: URL): boolean {
    const pathname = url.pathname.toLowerCase();
    return DIRECT_MEDIA_EXTENSIONS.some((ext) => pathname.endsWith(ext));
  }

  async extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult> {
    const cleanUrl = url.toString();
    const pathname = url.pathname;
    const fileName = pathname.split('/').pop() || 'media-file.mp4';
    const cleanFileName = decodeURIComponent(fileName.split('?')[0]);
    const extMatch = cleanFileName.match(/\.([a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : 'mp4';

    const validation = await validateMediaStreamUrl(cleanUrl, context.signal);

    if (!validation.valid || !validation.finalUrl) {
      return {
        ok: false,
        code: 'MEDIA_VALIDATION_FAILED',
        message: validation.errorReason || EXTRACTION_ERROR_MESSAGES.MEDIA_VALIDATION_FAILED,
      };
    }

    const isAudio = (validation.contentType || '').startsWith('audio/') || ['mp3', 'm4a', 'wav', 'ogg'].includes(ext);

    return {
      ok: true,
      platform: 'generic',
      platformName: 'Direct Media',
      type: isAudio ? 'audio' : 'video',
      title: sanitizeText(cleanFileName) || 'Direct Media Stream',
      previewVideoUrl: isAudio ? undefined : validation.finalUrl,
      durationSeconds: null,
      sourceUrl: cleanUrl,
      formats: [
        {
          id: 'direct-stream',
          label: `Direct ${ext.toUpperCase()} Stream`,
          quality: 'Original Stream',
          mime: validation.contentType || (isAudio ? 'audio/mp4' : 'video/mp4'),
          ext,
          sizeBytes: validation.contentLength,
          downloadUrl: validation.finalUrl,
          downloadId: '',
          isDownloadable: true,
        },
      ],
    };
  }
}
