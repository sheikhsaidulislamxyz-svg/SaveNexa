import { ProviderExtractor, ExtractionContext, ExtractionEngineResult } from '../../types';
import {
  InstagramDirectGatewayStrategy,
  InstagramEmbedStrategy,
  InstagramGraphQLStrategy,
} from './strategies';
import { normalizeAndSortFormats } from '../../normalize';
import { EXTRACTION_ERROR_MESSAGES } from '../../errors';

export class InstagramProviderExtractor implements ProviderExtractor {
  id = 'instagram';
  name = 'Instagram';

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'instagram.com' ||
      host.endsWith('.instagram.com') ||
      host === 'instagr.am'
    );
  }

  async extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult> {
    const cleanUrl = url.toString().split('?')[0];
    const isReel = url.pathname.includes('/reel/') || url.pathname.includes('/reels/');

    const strategies = [
      new InstagramDirectGatewayStrategy(),
      new InstagramEmbedStrategy(),
      new InstagramGraphQLStrategy(),
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
            platform: isReel ? 'instagram-reels' : 'instagram',
            platformName: isReel ? 'Instagram Reels' : 'Instagram',
            type: 'video',
            title: res.title || (isReel ? 'Instagram Reel' : 'Instagram Video'),
            author: res.author,
            authorUrl: res.authorUrl,
            thumbnailUrl: res.thumbnailUrl,
            previewVideoUrl: res.previewVideoUrl || sortedFormats[0].rawCdnUrl,
            durationSeconds: res.durationSeconds || null,
            sourceUrl: cleanUrl,
            formats: sortedFormats.map((f) => ({
              id: f.id,
              label: `${isReel ? 'Instagram Reel' : 'Instagram Video'} (${f.quality})`,
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
      details: 'All Instagram extraction strategies (Direct Gateway, Embed Scraper, GraphQL API) failed to extract a public media stream.',
      strategyLogs,
    };
  }
}
