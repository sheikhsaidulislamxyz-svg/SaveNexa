import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { executeOpenSourceBackendExtraction } from '../../backend';
import { sanitizeText } from '../../../security';

function getSyndicationToken(id: string): string {
  try {
    return (Number(id) / 1e15 * Math.PI).toString(36).replace(/(0+|\.)/g, '');
  } catch {
    return 'x';
  }
}

export class TwitterSyndicationStrategy implements ExtractionStrategy {
  name = 'X (Twitter) Syndication Result API';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString();
    const tweetId = cleanUrl.match(/status\/(\d+)/)?.[1];

    if (!tweetId) {
      return { success: false, status: 'UNSUPPORTED', message: 'No tweet status ID' };
    }

    try {
      const synToken = getSyndicationToken(tweetId);
      const synEndpoint = `https://cdn.syndication.twimg.com/tweet-result?id=${tweetId}&lang=en&token=${synToken}`;
      const res = await fetch(synEndpoint, {
        signal: context.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `Syndication HTTP ${res.status}` };
      }

      const synData = await res.json();

      if (synData.__typename === 'TweetTombstone') {
        const tombText = synData.tombstone?.text?.text || 'This post is from a suspended account or has been deleted.';
        return { success: false, status: 'BLOCKED', message: tombText };
      }

      const author = synData?.user?.name ? `@${sanitizeText(synData.user.screen_name || synData.user.name)}` : undefined;
      const title = sanitizeText(synData?.text?.slice(0, 140)) || 'X (Twitter) Media';

      let mediaDetails = synData?.mediaDetails?.[0] || synData?.video || synData?.mediaDetails;

      // If no media is directly attached to the tweet, check if it quotes or links to another tweet
      if (!mediaDetails && Array.isArray(synData.entities?.urls)) {
        for (const entityUrl of synData.entities.urls) {
          const expUrl = entityUrl.expanded_url || entityUrl.url;
          const quotedTweetMatch = typeof expUrl === 'string' ? expUrl.match(/status\/(\d+)/) : null;
          if (quotedTweetMatch && quotedTweetMatch[1] && quotedTweetMatch[1] !== tweetId) {
            const quotedId = quotedTweetMatch[1];
            try {
              const qToken = getSyndicationToken(quotedId);
              const qRes = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${quotedId}&lang=en&token=${qToken}`, {
                signal: context.signal,
                headers: {
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Accept': 'application/json',
                },
              });
              if (qRes.ok) {
                const qData = await qRes.json();
                if (qData.__typename === 'TweetTombstone') {
                  const tombMsg = qData.tombstone?.text?.text || 'The referenced post is from a suspended account or was deleted.';
                  return { success: false, status: 'BLOCKED', message: tombMsg };
                }
                const qMedia = qData?.mediaDetails?.[0] || qData?.video || qData?.mediaDetails;
                if (qMedia) {
                  mediaDetails = qMedia;
                  break;
                }
              }
            } catch {
              // ignore and continue
            }
          }
        }
      }

      if (!mediaDetails) {
        return { success: false, status: 'NOT_FOUND', message: 'No mediaDetails found in syndication' };
      }

      const mediaItem = Array.isArray(mediaDetails) ? mediaDetails[0] : mediaDetails;
      const thumbnailUrl = mediaItem.media_url_https || mediaItem.poster;
      const variants = mediaItem.video_info?.variants || mediaItem.variants;

      if (Array.isArray(variants) && variants.length > 0) {
        const mp4s = variants
          .filter((v: { content_type?: string }) => v.content_type === 'video/mp4')
          .sort((a: { bitrate?: number }, b: { bitrate?: number }) => (b.bitrate || 0) - (a.bitrate || 0));

        if (mp4s.length > 0 && mp4s[0].url) {
          const rawUrl = mp4s[0].url;
          const validation = await validateMediaStreamUrl(rawUrl, context.signal);

          if (validation.valid && validation.finalUrl) {
            return {
              success: true,
              status: 'SUCCESS',
              title,
              author,
              authorUrl: author ? `https://x.com/${author.replace('@', '')}` : undefined,
              thumbnailUrl,
              previewVideoUrl: validation.finalUrl,
              formats: [
                {
                  id: 'twitter-syn-1080p',
                  quality: '1080p HD',
                  mime: validation.contentType || 'video/mp4',
                  ext: 'mp4',
                  hasAudio: true,
                  sizeBytes: validation.contentLength,
                  rawCdnUrl: validation.finalUrl,
                },
              ],
            };
          }
        }
      } else if (mediaItem.type === 'photo' && mediaItem.media_url_https) {
        const photoUrl = mediaItem.media_url_https;
        const validation = await validateMediaStreamUrl(photoUrl, context.signal);
        if (validation.valid && validation.finalUrl) {
          return {
            success: true,
            status: 'SUCCESS',
            title,
            author,
            authorUrl: author ? `https://x.com/${author.replace('@', '')}` : undefined,
            thumbnailUrl: photoUrl,
            previewVideoUrl: validation.finalUrl,
            formats: [
              {
                id: 'twitter-syn-photo',
                quality: 'Original Photo',
                mime: 'image/jpeg',
                ext: 'jpg',
                hasAudio: false,
                sizeBytes: validation.contentLength,
                rawCdnUrl: validation.finalUrl,
              },
            ],
          };
        }
      }

      return { success: false, status: 'NOT_FOUND', message: 'No valid media variants found' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

export class TwitterVxGatewayStrategy implements ExtractionStrategy {
  name = 'X (Twitter) Public Gateway API (VxTwitter/FixTwitter)';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const cleanUrl = url.toString();
    const tweetId = cleanUrl.match(/status\/(\d+)/)?.[1];

    if (!tweetId) {
      return { success: false, status: 'UNSUPPORTED', message: 'No tweet ID' };
    }

    const gatewayEndpoints = [
      `https://api.fxtwitter.com/status/${tweetId}`,
      `https://api.vxtwitter.com/status/${tweetId}`,
    ];

    for (const endpoint of gatewayEndpoints) {
      try {
        const res = await fetch(endpoint, {
          signal: context.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
          },
        });

        if (!res.ok) continue;

        const data = await res.json();
        const tweet = data?.tweet;
        if (!tweet) continue;

        const author = tweet.author?.screen_name ? `@${sanitizeText(tweet.author.screen_name)}` : undefined;
        const title = sanitizeText(tweet.text?.slice(0, 140)) || 'X Media';

        // Check for video first
        const mediaAll = tweet.media?.all || [];
        const videoMedia =
          (tweet.media?.videos && tweet.media.videos[0]) ||
          mediaAll.find((m: { type: string }) => m.type === 'video' || m.type === 'gif');

        if (videoMedia) {
          const variants = videoMedia.variants || [];
          const mp4s = variants
            .filter((v: { content_type?: string }) => v.content_type === 'video/mp4')
            .sort((a: { bitrate?: number }, b: { bitrate?: number }) => (b.bitrate || 0) - (a.bitrate || 0));

          const videoUrl = mp4s[0]?.url || videoMedia.url;
          if (videoUrl && /^https?:\/\//i.test(videoUrl)) {
            const validation = await validateMediaStreamUrl(videoUrl, context.signal);
            if (validation.valid && validation.finalUrl) {
              return {
                success: true,
                status: 'SUCCESS',
                title,
                author,
                authorUrl: author ? `https://x.com/${author.replace('@', '')}` : undefined,
                thumbnailUrl: videoMedia.thumbnail_url || tweet.media?.photos?.[0]?.url,
                previewVideoUrl: validation.finalUrl,
                formats: [
                  {
                    id: 'twitter-vx-video',
                    quality: '1080p HD',
                    mime: validation.contentType || 'video/mp4',
                    ext: 'mp4',
                    hasAudio: true,
                    sizeBytes: validation.contentLength,
                    rawCdnUrl: validation.finalUrl,
                  },
                ],
              };
            }
          }
        }

        // Fallback to Photo/Image
        const photoMedia = mediaAll.find((m: { type: string }) => m.type === 'photo');
        if (photoMedia && photoMedia.url) {
          const photoUrl = photoMedia.url;
          const validation = await validateMediaStreamUrl(photoUrl, context.signal);
          if (validation.valid && validation.finalUrl) {
            return {
              success: true,
              status: 'SUCCESS',
              title,
              author,
              authorUrl: author ? `https://x.com/${author.replace('@', '')}` : undefined,
              thumbnailUrl: photoUrl,
              previewVideoUrl: validation.finalUrl,
              formats: [
                {
                  id: 'twitter-vx-photo',
                  quality: 'Original Photo',
                  mime: 'image/jpeg',
                  ext: 'jpg',
                  hasAudio: false,
                  sizeBytes: validation.contentLength,
                  rawCdnUrl: validation.finalUrl,
                },
              ],
            };
          }
        }
      } catch {
        // try next gateway
      }
    }

    return { success: false, status: 'NOT_FOUND', message: 'No media in VxTwitter API' };
  }
}

export class TwitterOpenSourceBackendStrategy implements ExtractionStrategy {
  name = 'X (Twitter) Open-Source Pluggable Backend';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    return executeOpenSourceBackendExtraction(url.toString(), context);
  }
}
