import { validateUrlSecurity } from '../security';
import { createDownloadToken } from '../tokens';
import { findExtractorForUrl } from './registry';
import { ExtractionEngineResult, ExtractionContext } from './types';
import { EXTRACTION_ERROR_MESSAGES } from './errors';
import { FETCH_TIMEOUT_MS } from '../constants';

export async function runExtractionEngine(
  rawInputUrl: string,
  contextOptions?: { clientIp?: string; userAgent?: string; timeoutMs?: number }
): Promise<ExtractionEngineResult> {
  // 1. SSRF & URL Format Security Validation
  const validation = validateUrlSecurity(rawInputUrl);
  if (!validation.isValid) {
    return {
      ok: false,
      code: 'INVALID_URL',
      message: validation.message,
    };
  }

  const parsedUrl = validation.parsedUrl;

  // 2. Find Matched Provider Extractor
  const extractor = findExtractorForUrl(parsedUrl);
  if (!extractor) {
    return {
      ok: false,
      code: 'UNSUPPORTED_PLATFORM',
      message: EXTRACTION_ERROR_MESSAGES.UNSUPPORTED_PLATFORM,
    };
  }

  // 3. Setup Hard Timeout Controller
  const timeoutMs = contextOptions?.timeoutMs || FETCH_TIMEOUT_MS;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const context: ExtractionContext = {
    signal: controller.signal,
    clientIp: contextOptions?.clientIp,
    userAgent: contextOptions?.userAgent,
    timeoutMs,
  };

  try {
    const result = await extractor.extract(parsedUrl, context);
    clearTimeout(timeoutId);

    if (!result.ok) {
      return result;
    }

    // 4. Sign download tokens for all validated downloadable formats
    const signedFormats = result.formats
      .filter((format) => format.isDownloadable && /^https?:\/\//i.test(format.downloadUrl))
      .map((format) => {
        const rawCdnUrl = format.downloadUrl;
        const ext = format.ext || (format.mime.startsWith('audio') ? 'mp3' : 'mp4');
        const cleanFilename = `${result.platform}-${(format.quality || format.id).replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.${ext}`;

        const downloadId = createDownloadToken({
          url: rawCdnUrl,
          mime: format.mime,
          filename: cleanFilename,
          title: result.title,
          platform: result.platformName,
          quality: format.quality,
        });

        return {
          ...format,
          downloadId,
          downloadUrl: `/api/download?id=${downloadId}`,
          isDownloadable: true as const,
        };
      });

    if (signedFormats.length === 0) {
      return {
        ok: false,
        code: 'NO_MEDIA_FOUND',
        message: EXTRACTION_ERROR_MESSAGES.NO_MEDIA_FOUND,
      };
    }

    return {
      ...result,
      formats: signedFormats,
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (err instanceof Error && err.name === 'AbortError') {
      return {
        ok: false,
        code: 'TEMPORARY_PROVIDER_ERROR',
        message: 'Media extraction request timed out. Please try again in a few moments.',
      };
    }

    return {
      ok: false,
      code: 'EXTRACTION_FAILED',
      message: EXTRACTION_ERROR_MESSAGES.EXTRACTION_FAILED,
      details: err instanceof Error ? err.message : 'Unknown engine error',
    };
  }
}
