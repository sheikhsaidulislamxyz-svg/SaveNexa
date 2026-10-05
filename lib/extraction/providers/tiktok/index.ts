import { ProviderExtractor, ExtractionContext, ExtractionEngineResult } from '../../types';
import {
  TikTokTikwmStrategy,
  TikTokEmbedStrategy,
  TikTokMobileApiStrategy,
  TikTokOpenSourceBackendStrategy,
} from './strategies';
import { normalizeAndSortFormats } from '../../normalize';
import { EXTRACTION_ERROR_MESSAGES } from '../../errors';

export class TikTokProviderExtractor implements ProviderExtractor {
  id = 'tiktok';
  name = 'TikTok';

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'tiktok.com' ||
      host.endsWith('.tiktok.com') ||
      host === 'v.douyin.com'
    );
  }

  async extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult> {
    const cleanUrl = url.toString().split('?')[0];

    const strategies = [
      new TikTokTikwmStrategy(),
      new TikTokEmbedStrategy(),
      new TikTokMobileApiStrategy(),
      new TikTokOpenSourceBackendStrategy(),
    ];

    const strategyLogs: {
      strategyName: string;
      status: 'SUCCESS' | 'NOT_FOUND' | 'BLOCKED' | 'UNSUPPORTED' | 'INVALID_RESPONSE' | 'TEMPORARY_FAILURE';
      message?: string;
    }[] = [];

    for (const strategy of strategies) {
      try {
        const res = await strategy.execute(url, context);
        strategyLogs.push({
          strategyName: strategy.name,
          status: res.status,
          message: res.message,
        });

        if (res.success && res.formats && res.formats.length > 0) {
          const sortedFormats = normalizeAndSortFormats(res.formats);

          return {
            ok: true,
            platform: 'tiktok',
            platformName: 'TikTok',
            type: 'video',
            title: res.title || 'TikTok Video',
            author: res.author,
            thumbnailUrl: res.thumbnailUrl,
            previewVideoUrl: res.previewVideoUrl || sortedFormats[0].rawCdnUrl,
            durationSeconds: res.durationSeconds || null,
            sourceUrl: cleanUrl,
            formats: sortedFormats.map((f) => ({
              id: f.id,
              label: `TikTok Video (${f.quality})`,
              quality: f.quality,
              mime: f.mime,
              ext: f.ext,
              sizeBytes: f.sizeBytes,
              downloadUrl: f.rawCdnUrl,
              downloadId: '',
              isDownloadable: true,
            })),
          };
        }
      } catch (err: unknown) {
        strategyLogs.push({
          strategyName: strategy.name,
          status: 'TEMPORARY_FAILURE',
          message: err instanceof Error ? err.message : 'Error executing strategy',
        });
      }
    }

    return {
      ok: false,
      code: 'NO_MEDIA_FOUND',
      message: EXTRACTION_ERROR_MESSAGES.NO_MEDIA_FOUND,
      details: 'All extraction strategies failed to extract a public media stream from TikTok.',
      strategyLogs,
    };
  }
}
