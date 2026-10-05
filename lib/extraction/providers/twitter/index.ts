import { ProviderExtractor, ExtractionContext, ExtractionEngineResult } from '../../types';
import {
  TwitterSyndicationStrategy,
  TwitterVxGatewayStrategy,
} from './strategies';
import { normalizeAndSortFormats } from '../../normalize';
import { EXTRACTION_ERROR_MESSAGES } from '../../errors';

export class TwitterProviderExtractor implements ProviderExtractor {
  id = 'twitter';
  name = 'X (Twitter)';

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'twitter.com' ||
      host.endsWith('.twitter.com') ||
      host === 'x.com' ||
      host.endsWith('.x.com') ||
      host === 't.co' ||
      host.includes('twimg.com')
    );
  }

  async extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult> {
    const cleanUrl = url.toString().split('?')[0];

    const strategies = [
      new TwitterVxGatewayStrategy(),
      new TwitterSyndicationStrategy(),
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
            platform: 'twitter',
            platformName: 'X (Twitter)',
            type: sortedFormats[0].mime.startsWith('image') ? 'image' : 'video',
            title: res.title || 'X (Twitter) Media',
            author: res.author,
            authorUrl: res.authorUrl,
            thumbnailUrl: res.thumbnailUrl,
            previewVideoUrl: res.previewVideoUrl || sortedFormats[0].rawCdnUrl,
            durationSeconds: res.durationSeconds || null,
            sourceUrl: cleanUrl,
            formats: sortedFormats.map((f) => ({
              id: f.id,
              label: `X Media (${f.quality})`,
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
      details: 'All Twitter/X extraction strategies failed to extract a public media stream.',
      strategyLogs,
    };
  }
}
