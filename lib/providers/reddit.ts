import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

export class RedditProvider implements MediaProvider {
  id = 'reddit';
  name = 'Reddit';

  match(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'reddit.com' ||
      host.endsWith('.reddit.com') ||
      host === 'redd.it' ||
      host === 'v.redd.it'
    );
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      let jsonUrl = url.toString().split('?')[0];
      if (!jsonUrl.endsWith('.json')) {
        jsonUrl = `${jsonUrl.replace(/\/$/, '')}.json`;
      }

      const res = await fetch(jsonUrl, {
        signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          return {
            ok: false,
            code: ERROR_CODES.PRIVATE_OR_RESTRICTED_SOURCE,
            message: 'This Reddit post could not be found or is set to private/quarantined.',
          };
        }
        return {
          ok: false,
          code: ERROR_CODES.SOURCE_UNAVAILABLE,
          message: ERROR_MESSAGES[ERROR_CODES.SOURCE_UNAVAILABLE],
        };
      }

      const data = await res.json();
      const post = data?.[0]?.data?.children?.[0]?.data;

      if (!post) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message: 'Could not extract post information from Reddit.',
        };
      }

      const title = sanitizeText(post.title) || 'Reddit Video';
      const author = sanitizeText(post.author) ? `u/${post.author}` : undefined;
      const authorUrl = post.author ? `https://www.reddit.com/user/${post.author}` : undefined;
      const thumbnailUrl = post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : undefined;

      const formats = [];
      let durationSeconds: number | null = null;
      let primaryVideoUrl: string | undefined;

      // Check for native reddit video
      const redditVideo = post.secure_media?.reddit_video || post.media?.reddit_video;
      if (redditVideo) {
        durationSeconds = redditVideo.duration || null;
        if (redditVideo.fallback_url) {
          const videoFallback = redditVideo.fallback_url.split('?')[0];
          primaryVideoUrl = videoFallback;
          const height = redditVideo.height || 720;

          formats.push({
            id: `reddit-video-${height}p`,
            label: `Reddit Video (${height}p)`,
            quality: `${height}p HD`,
            mime: 'video/mp4',
            downloadUrl: videoFallback,
            ext: 'mp4',
            hasAudio: true,
            isDownloadable: true,
          });

          // Also audio stream if available
          const baseUrl = videoFallback.substring(0, videoFallback.lastIndexOf('/'));
          formats.push({
            id: 'reddit-audio-stream',
            label: 'Reddit Audio Track (DASH_audio.mp4)',
            quality: '128kbps Audio',
            mime: 'audio/mp4',
            downloadUrl: `${baseUrl}/DASH_AUDIO_128.mp4`,
            ext: 'mp4',
            isDownloadable: true,
          });
        }
      } else if (post.url_overridden_by_dest && /^https?:\/\//i.test(post.url_overridden_by_dest)) {
        const dest = post.url_overridden_by_dest;
        const isGif = dest.endsWith('.gif');
        primaryVideoUrl = dest;

        formats.push({
          id: 'reddit-external-media',
          label: isGif ? 'Reddit Animated GIF' : 'Reddit Linked Media Stream',
          quality: 'Original Stream',
          mime: isGif ? 'image/gif' : 'video/mp4',
          downloadUrl: dest,
          ext: isGif ? 'gif' : 'mp4',
          isDownloadable: true,
        });
      }

      if (formats.length === 0) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message:
            'Could not extract a downloadable video or audio stream from this Reddit post. Please verify that the post is public and contains a video.',
        };
      }

      return {
        ok: true,
        platform: 'reddit',
        platformName: 'Reddit',
        type: 'video',
        title,
        author,
        authorUrl,
        thumbnailUrl,
        previewVideoUrl: primaryVideoUrl,
        durationSeconds,
        sourceUrl: url.toString(),
        formats,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        return {
          ok: false,
          code: ERROR_CODES.SOURCE_TIMEOUT,
          message: ERROR_MESSAGES[ERROR_CODES.SOURCE_TIMEOUT],
        };
      }
      return {
        ok: false,
        code: ERROR_CODES.SOURCE_UNAVAILABLE,
        message: ERROR_MESSAGES[ERROR_CODES.SOURCE_UNAVAILABLE],
      };
    }
  }
}
