import { ProviderExtractor, ExtractionContext, ExtractionEngineResult } from '../../types';
import {
  FacebookPluginStrategy,
  FacebookMobileWatchStrategy,
} from './strategies';
import { normalizeAndSortFormats } from '../../normalize';
import { EXTRACTION_ERROR_MESSAGES } from '../../errors';

export class FacebookProviderExtractor implements ProviderExtractor {
  id = 'facebook';
  name = 'Facebook';

  canHandle(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'facebook.com' ||
      host.endsWith('.facebook.com') ||
      host === 'fb.watch' ||
      host === 'fb.com'
    );
  }

  async extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult> {
    const cleanUrl = url.toString();
    const isReel = cleanUrl.includes('/reel/') || cleanUrl.includes('/reels/');

    const strategies = [
      new FacebookPluginStrategy(),
      new FacebookMobileWatchStrategy(),
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
            platform: isReel ? 'facebook-reels' : 'facebook',
            platformName: isReel ? 'Facebook Reels' : 'Facebook',
            type: 'video',
            title: res.title || (isReel ? 'Facebook Reel' : 'Facebook Video'),
            thumbnailUrl: res.thumbnailUrl,
            previewVideoUrl: res.previewVideoUrl || sortedFormats[0].rawCdnUrl,
            durationSeconds: res.durationSeconds || null,
            sourceUrl: cleanUrl,
            formats: sortedFormats.map((f) => ({
              id: f.id,
              label: `${isReel ? 'Facebook Reel' : 'Facebook Video'} (${f.quality})`,
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
      details: 'All Facebook extraction strategies (Plugin API, Mobile Web Scraper) failed to extract a public media stream.',
      strategyLogs,
    };
  }
}
