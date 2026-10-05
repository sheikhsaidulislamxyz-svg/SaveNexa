import { MediaProvider } from './types';
import { MediaResult, MediaErrorResult } from '../types';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants';
import { sanitizeText } from '../security';

export class InstagramProvider implements MediaProvider {
  id = 'instagram';
  name = 'Instagram';

  match(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return (
      host === 'instagram.com' ||
      host.endsWith('.instagram.com') ||
      host === 'instagr.am'
    );
  }

  async analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult> {
    try {
      const cleanUrl = url.toString().split('?')[0];
      const pathname = url.pathname;
      const isReel = pathname.includes('/reel/') || pathname.includes('/reels/');

      // Extract shortcode
      const shortcodeMatch = pathname.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_\-]+)/i);
      const shortcode = shortcodeMatch ? shortcodeMatch[2] : '';

      let title = isReel ? 'Instagram Reel' : 'Instagram Video';
      let thumbnailUrl: string | undefined;
      let author: string | undefined;
      let directVideoUrl: string | undefined;
      let hdVideoUrl: string | undefined;
      let sdVideoUrl: string | undefined;

      // Tier 1: Try Instagram Public JSON endpoint (?__a=1&__d=dis)
      if (shortcode) {
        try {
          const jsonEndpoint = `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`;
          const jsonRes = await fetch(jsonEndpoint, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          });

          if (jsonRes.ok) {
            const data = await jsonRes.json();
            const media =
              data?.graphql?.shortcode_media ||
              data?.items?.[0] ||
              data?.xdt_shortcode_media;

            if (media) {
              if (media.owner?.username) {
                author = `@${sanitizeText(media.owner.username)}`;
              }
              const captionText =
                media.edge_media_to_caption?.edges?.[0]?.node?.text ||
                media.caption?.text ||
                media.title;
              if (captionText) {
                title = sanitizeText(captionText.slice(0, 120));
              }

              thumbnailUrl =
                media.display_url ||
                media.thumbnail_src ||
                media.image_versions2?.candidates?.[0]?.url;

              if (media.is_video) {
                hdVideoUrl = media.video_url;
                if (Array.isArray(media.video_versions) && media.video_versions.length > 0) {
                  hdVideoUrl = media.video_versions[0]?.url || hdVideoUrl;
                  if (media.video_versions.length > 1) {
                    sdVideoUrl = media.video_versions[media.video_versions.length - 1]?.url;
                  }
                }
              }
            }
          }
        } catch {
          // ignore tier 1 failure, proceed to tier 2
        }
      }

      // Tier 2: Try Embed HTML (/embed/captioned/)
      if (!hdVideoUrl) {
        try {
          const embedUrl = `https://www.instagram.com/p/${shortcode || 'reel'}/embed/captioned/`;
          const embedRes = await fetch(embedUrl, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html',
            },
          });

          if (embedRes.ok) {
            const html = await embedRes.text();

            // Extract Author
            if (!author) {
              const authorMatch =
                html.match(/class="CaptionUsername"[^>]*>([^<]+)<\/a>/i) ||
                html.match(/href="\/([^"/]+)\/"[^>]*class="UsernameText"/i);
              if (authorMatch && authorMatch[1]) {
                author = `@${sanitizeText(authorMatch[1])}`;
              }
            }

            // Extract Title/Caption
            if (title === 'Instagram Reel' || title === 'Instagram Video') {
              const captionMatch =
                html.match(/class="CaptionComments"[^>]*>([\s\S]*?)<\/div>/) ||
                html.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/);
              if (captionMatch && captionMatch[1]) {
                const cleanCaption = captionMatch[1].replace(/<[^>]+>/g, '').trim();
                if (cleanCaption) {
                  title = sanitizeText(cleanCaption.slice(0, 120));
                }
              }
            }

            // Extract Thumbnail
            if (!thumbnailUrl) {
              const imgMatch =
                html.match(/class="EmbeddedMediaImage" src="([^"]+)"/i) ||
                html.match(/property="og:image" content="([^"]+)"/i);
              if (imgMatch && imgMatch[1]) {
                thumbnailUrl = imgMatch[1].replace(/&amp;/g, '&');
              }
            }

            // Extract Video URL from JSON-LD / Video tags / Meta tags
            const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
            if (jsonLdMatch && jsonLdMatch[1]) {
              try {
                const jsonLd = JSON.parse(jsonLdMatch[1]);
                if (jsonLd.contentUrl) {
                  hdVideoUrl = jsonLd.contentUrl;
                } else if (jsonLd.video?.contentUrl) {
                  hdVideoUrl = jsonLd.video.contentUrl;
                }
              } catch {
                // fallback regex
              }
            }

            if (!hdVideoUrl) {
              const videoMatch =
                html.match(/<video[^>]*src="([^"]+)"/i) ||
                html.match(/property="og:video" content="([^"]+)"/i) ||
                html.match(/property="og:video:secure_url" content="([^"]+)"/i) ||
                html.match(/"video_url":"([^"]+)"/i) ||
                html.match(/"contentUrl":"([^"]+)"/i);

              if (videoMatch && videoMatch[1]) {
                hdVideoUrl = videoMatch[1]
                  .replace(/&amp;/g, '&')
                  .replace(/\\u0026/g, '&')
                  .replace(/\\/g, '');
              }
            }
          }
        } catch {
          // ignore tier 2 failure, proceed to tier 3
        }
      }

      // Tier 3: Try Public Page Meta Tags
      if (!hdVideoUrl) {
        try {
          const pageRes = await fetch(cleanUrl, {
            signal,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
              'Accept': 'text/html,application/xhtml+xml',
            },
          });

          if (pageRes.ok) {
            const html = await pageRes.text();
            const metaMatch =
              html.match(/<meta property="og:video:secure_url" content="([^"]+)"/i) ||
              html.match(/<meta property="og:video" content="([^"]+)"/i) ||
              html.match(/"video_url":"([^"]+)"/i);

            if (metaMatch && metaMatch[1]) {
              hdVideoUrl = metaMatch[1]
                .replace(/&amp;/g, '&')
                .replace(/\\u0026/g, '&')
                .replace(/\\/g, '');
            }
          }
        } catch {
          // fallback
        }
      }

      directVideoUrl = hdVideoUrl || sdVideoUrl;

      // CRITICAL REQUIREMENT: Must only return formats if a real streamable media URL exists!
      if (!directVideoUrl || !/^https?:\/\//i.test(directVideoUrl)) {
        return {
          ok: false,
          code: ERROR_CODES.NO_MEDIA_FOUND,
          message:
            'Could not extract a downloadable video stream from this Instagram post. Please verify that the post is public and contains a video.',
        };
      }

      const formats = [
        {
          id: 'instagram-mp4-hd',
          label: isReel ? 'Instagram Reel HD Video' : 'Instagram HD Video',
          quality: '1080p HD',
          mime: 'video/mp4',
          downloadUrl: directVideoUrl,
          ext: 'mp4',
          hasAudio: true,
          isDownloadable: true,
        },
      ];

      if (sdVideoUrl && sdVideoUrl !== directVideoUrl) {
        formats.push({
          id: 'instagram-mp4-sd',
          label: isReel ? 'Instagram Reel SD Video' : 'Instagram SD Video',
          quality: '480p SD',
          mime: 'video/mp4',
          downloadUrl: sdVideoUrl,
          ext: 'mp4',
          hasAudio: true,
          isDownloadable: true,
        });
      }

      return {
        ok: true,
        platform: isReel ? 'instagram-reels' : 'instagram',
        platformName: isReel ? 'Instagram Reels' : 'Instagram',
        type: 'video',
        title,
        author,
        authorUrl: author ? `https://www.instagram.com/${author.replace('@', '')}/` : undefined,
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
