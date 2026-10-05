import { ProviderExtractor, ExtractionContext, ExtractionEngineResult } from '../../types';
import { RedditEmbedStrategy, RedditJsonStrategy, RedditOpenSourceBackendStrategy } from './strategies';
import { normalizeAndSortFormats } from '../../normalize';
import { EXTRACTION_ERROR_MESSAGES } from '../../errors';

export class RedditProviderExtractor implements ProviderExtractor {
  id = 'reddit';
  name = 'Reddit';

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'reddit.com' ||
      host.endsWith('.reddit.com') ||
      host === 'redd.it' ||
      host === 'v.redd.it'
    );
  }

  async extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult> {
    const cleanUrl = url.toString().split('?')[0];

    const strategies = [
      new RedditEmbedStrategy(),
      new RedditJsonStrategy(),
      new RedditOpenSourceBackendStrategy(),
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
            platform: 'reddit',
            platformName: 'Reddit',
            type: 'video',
            title: res.title || 'Reddit Video',
            author: res.author,
            authorUrl: res.authorUrl,
            thumbnailUrl: res.thumbnailUrl,
            previewVideoUrl: res.previewVideoUrl || sortedFormats[0].rawCdnUrl,
            durationSeconds: res.durationSeconds || null,
            sourceUrl: cleanUrl,
            formats: sortedFormats.map((f) => ({
              id: f.id,
              label: `Reddit Stream (${f.quality})`,
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
      details: 'All extraction strategies failed to extract a public media stream from Reddit.',
      strategyLogs,
    };
  }
}
