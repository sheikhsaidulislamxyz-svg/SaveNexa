import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

export class TwitterProvider implements MediaProvider {
  id = 'twitter';
  name = 'X (Twitter)';

  match(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'twitter.com' ||
      host.endsWith('.twitter.com') ||
      host === 'x.com' ||
      host.endsWith('.x.com') ||
      host === 't.co'
    );
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      const cleanUrl = url.toString();
      const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(cleanUrl)}`;

      const res = await fetch(oembedUrl, {
        signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      let author: string | undefined;
      let authorUrl: string | undefined;
      let title = 'X (Twitter) Video / Post';

      if (res.ok) {
        try {
          const data = await res.json();
          author = sanitizeText(data.author_name) || undefined;
          authorUrl = data.author_url || undefined;
          if (data.html) {
            const textMatch = data.html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
            if (textMatch && textMatch[1]) {
              const cleanText = textMatch[1].replace(/<[^>]+>/g, '').trim();
              if (cleanText) {
                title = sanitizeText(cleanText.slice(0, 140));
              }
            }
          }
        } catch {
          // fallback
        }
      }

      // Fetch public tweet syndication API
      let directVideoUrl: string | undefined;
      let thumbnailUrl: string | undefined;

      try {
        const tweetId = cleanUrl.match(/status\/(\d+)/)?.[1];
        if (tweetId) {
          const synRes = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&token=x`, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/json',
            },
          });

          if (synRes.ok) {
            const synData = await synRes.json();
            const mediaDetails = synData?.mediaDetails?.[0] || synData?.video;
            if (mediaDetails) {
              thumbnailUrl = mediaDetails.media_url_https || mediaDetails.poster;
              const variants = mediaDetails.video_info?.variants || mediaDetails.variants;
              if (Array.isArray(variants)) {
                // Find MP4 variant with highest bitrate
                const mp4s = variants
                  .filter((v: { content_type?: string }) => v.content_type === 'video/mp4')
                  .sort((a: { bitrate?: number }, b: { bitrate?: number }) => (b.bitrate || 0) - (a.bitrate || 0));

                if (mp4s.length > 0 && mp4s[0].url) {
                  directVideoUrl = mp4s[0].url;
                }
              }
            }
          }
        }
      } catch {
        // fallback
      }

      if (!directVideoUrl || !/^https?:\/\//i.test(directVideoUrl)) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message:
            'Could not extract a downloadable video stream from this X/Twitter post. Please verify that the post is public and contains a video or GIF.',
        };
      }

      const formats = [
        {
          id: 'twitter-mp4-hd',
          label: 'X (Twitter) HD Video Stream',
          quality: '1080p HD',
          mime: 'video/mp4',
          downloadUrl: directVideoUrl,
          ext: 'mp4',
          hasAudio: true,
          isDownloadable: true,
        },
      ];

      return {
        ok: true,
        platform: 'twitter',
        platformName: 'X (Twitter)',
        type: 'video',
        title,
        author,
        authorUrl,
        thumbnailUrl,
        previewVideoUrl: directVideoUrl,
        durationSeconds: null,
        sourceUrl: cleanUrl,
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
