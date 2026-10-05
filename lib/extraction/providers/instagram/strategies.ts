import { ExtractionStrategy, StrategyResult, ExtractionContext } from '../../types';
import { validateMediaStreamUrl } from '../../security';
import { executeOpenSourceBackendExtraction } from '../../backend';
import { sanitizeText } from '../../../security';

function decodeSnapApp(args: string[]): string {
  const [h, , n, t, e] = args;
  const tNum = Number(t);
  const eNum = Number(e);
  function decode(d: string, e: number, f: number) {
    const g = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    const hArr = g.slice(0, e);
    const iArr = g.slice(0, f);
    let j = d.split('').reverse().reduce((a, b, c) => {
      const idx = hArr.indexOf(b);
      if (idx !== -1) return a + idx * Math.pow(e, c);
      return a;
    }, 0);
    let k = '';
    while (j > 0) {
      k = iArr[j % f] + k;
      j = Math.floor(j / f);
    }
    return k || '0';
  }
  let result = '';
  for (let i = 0, len = h.length; i < len;) {
    let s = '';
    while (i < len && h[i] !== n[eNum]) {
      s += h[i];
      i++;
    }
    i++;
    for (let j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], 'g'), j.toString());
    result += String.fromCharCode(Number(decode(s, eNum, 10)) - tNum);
  }
  try {
    const bytes = new Uint8Array(result.split('').map((char) => char.charCodeAt(0)));
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return result;
  }
}

// Strategy 0: High-Reliability Direct Stream Gateway
export class InstagramSnapSaveStrategy implements ExtractionStrategy {
  name = 'Instagram Fast Direct Extraction Gateway';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    try {
      const cleanUrl = url.toString().split('?')[0];
      const formData = new URLSearchParams();
      formData.append('url', cleanUrl);

      const res = await fetch('https://snapsave.app/action.php?lang=en', {
        method: 'POST',
        signal: context.signal,
        headers: {
          'accept': '*/*',
          'content-type': 'application/x-www-form-urlencoded',
          'origin': 'https://snapsave.app',
          'referer': 'https://snapsave.app/',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: formData,
      });

      if (!res.ok) {
        return { success: false, status: 'BLOCKED', message: `HTTP ${res.status}` };
      }

      const text = await res.text();
      if (!text.includes('decodeURIComponent(escape(r))}(')) {
        return { success: false, status: 'NOT_FOUND', message: 'No encoded payload returned' };
      }

      const encodedArgs = text
        .split('decodeURIComponent(escape(r))}(')[1]
        .split('))')[0]
        .split(',')
        .map((v) => v.replace(/"/g, '').trim());

      const decodedScript = decodeSnapApp(encodedArgs);
      const downloadSectionMatch = decodedScript.match(
        /getElementById\("download-section"\)\.innerHTML = "([\s\S]*?)"; document\.getElementById\("inputData"\)/
      );
      const html = downloadSectionMatch ? downloadSectionMatch[1].replace(/\\(\\)?/g, '') : decodedScript;

      let title = url.pathname.includes('/reel/') ? 'Instagram Reel' : 'Instagram Video';
      const descMatch = html.match(/class="video-des"[^>]*>([\s\S]*?)<\/span>/i);
      if (descMatch && descMatch[1]) {
        title = sanitizeText(descMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 120));
      }

      let thumbnailUrl: string | undefined;
      const thumbMatch =
        html.match(/class="download-items__thumb"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i) ||
        html.match(/<img[^>]*src="([^"]+)"/i);
      if (thumbMatch && thumbMatch[1]) {
        thumbnailUrl = thumbMatch[1].replace(/&amp;/g, '&');
      }

      const videoLinks = html.match(/href="(https?:\/\/[^"]+)"/g) || [];
      const validLinks = videoLinks
        .map((l) => l.replace(/^href="/, '').replace(/"$/, '').replace(/&amp;/g, '&'))
        .filter((l) => !l.includes('play.google.com') && /^https?:\/\//i.test(l));

      if (validLinks.length === 0) {
        return { success: false, status: 'NOT_FOUND', message: 'No video stream URLs found in decoded payload' };
      }

      const directCdnUrl = validLinks[0];
      const validation = await validateMediaStreamUrl(directCdnUrl, context.signal);

      if (validation.valid && validation.finalUrl) {
        return {
          success: true,
          status: 'SUCCESS',
          title,
          thumbnailUrl,
          previewVideoUrl: validation.finalUrl,
          formats: [
            {
              id: 'instagram-hd-direct',
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

      return { success: false, status: 'NOT_FOUND', message: 'Stream URL validation failed' };
    } catch (err: unknown) {
      return { success: false, status: 'TEMPORARY_FAILURE', message: err instanceof Error ? err.message : 'Error' };
    }
  }
}

// Strategy 1: Instagram Embed HTML with Bot / Mobile User-Agent
export class InstagramEmbedStrategy implements ExtractionStrategy {
  name = 'Instagram Embed & SharedData Parser (Crawler UA)';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const pathname = url.pathname;
    const shortcodeMatch = pathname.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_\-]+)/i);
    const shortcode = shortcodeMatch ? shortcodeMatch[2] : '';

    if (!shortcode) {
      return { success: false, status: 'UNSUPPORTED', message: 'Could not parse Instagram shortcode.' };
    }

    const embedUrls = [
      `https://www.instagram.com/p/${shortcode}/embed/`,
      `https://www.instagram.com/reel/${shortcode}/embed/`,
      `https://www.instagram.com/p/${shortcode}/embed/captioned/`,
    ];

    const crawlerUas = [
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    ];

    for (const embedUrl of embedUrls) {
      for (const ua of crawlerUas) {
        try {
          const res = await fetch(embedUrl, {
            signal: context.signal,
            headers: {
              'User-Agent': ua,
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          });

          if (!res.ok) continue;

          const html = await res.text();
          const cleanHtml = html.replace(/\\u0026/g, '&').replace(/\\/g, '');

          let author: string | undefined;
          let title = 'Instagram Reel / Video';
          let thumbnailUrl: string | undefined;
          let rawVideoUrl: string | undefined;

          const authorMatch =
            cleanHtml.match(/class="CaptionUsername"[^>]*>([^<]+)<\/a>/i) ||
            cleanHtml.match(/href="\/([^"/]+)\/"[^>]*class="UsernameText"/i) ||
            cleanHtml.match(/"username":"([^"]+)"/i);
          if (authorMatch && authorMatch[1]) {
            author = `@${sanitizeText(authorMatch[1])}`;
          }

          const captionMatch =
            cleanHtml.match(/class="CaptionComments"[^>]*>([\s\S]*?)<\/div>/) ||
            cleanHtml.match(/class="Caption"[^>]*>([\s\S]*?)<\/div>/);
          if (captionMatch && captionMatch[1]) {
            const cleanCaption = captionMatch[1].replace(/<[^>]+>/g, '').trim();
            if (cleanCaption) {
              title = sanitizeText(cleanCaption.slice(0, 120));
            }
          }

          const imgMatch =
            cleanHtml.match(/class="EmbeddedMediaImage" src="([^"]+)"/i) ||
            cleanHtml.match(/property="og:image" content="([^"]+)"/i) ||
            cleanHtml.match(/"display_url":"([^"]+)"/i);
          if (imgMatch && imgMatch[1]) {
            thumbnailUrl = imgMatch[1].replace(/&amp;/g, '&');
          }

          // Search for direct MP4 CDN links in HTML
          const mp4Matches = cleanHtml.match(/https?:\/\/[^"'\s\\]+?\.mp4[^"'\s\\]*/gi);
          if (mp4Matches && mp4Matches.length > 0) {
            rawVideoUrl = mp4Matches[0].replace(/&amp;/g, '&');
          } else {
            const videoMatch =
              cleanHtml.match(/<video[^>]*src="([^"]+)"/i) ||
              cleanHtml.match(/property="og:video" content="([^"]+)"/i) ||
              cleanHtml.match(/property="og:video:secure_url" content="([^"]+)"/i) ||
              cleanHtml.match(/"video_url":"([^"]+)"/i) ||
              cleanHtml.match(/"contentUrl":"([^"]+)"/i);

            if (videoMatch && videoMatch[1]) {
              rawVideoUrl = videoMatch[1].replace(/&amp;/g, '&');
            }
          }

          if (rawVideoUrl && /^https?:\/\//i.test(rawVideoUrl)) {
            const validation = await validateMediaStreamUrl(rawVideoUrl, context.signal);
            if (validation.valid && validation.finalUrl) {
              return {
                success: true,
                status: 'SUCCESS',
                title,
                author,
                authorUrl: author ? `https://www.instagram.com/${author.replace('@', '')}/` : undefined,
                thumbnailUrl,
                previewVideoUrl: validation.finalUrl,
                formats: [
                  {
                    id: 'instagram-embed-1080p',
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
        } catch {
          // try next UA or embed URL
        }
      }
    }

    return { success: false, status: 'NOT_FOUND', message: 'No video stream URL in embed HTML.' };
  }
}

// Strategy 2: Instagram Public GraphQL Query API
export class InstagramGraphQLStrategy implements ExtractionStrategy {
  name = 'Instagram GraphQL Query API';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    const pathname = url.pathname;
    const shortcodeMatch = pathname.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_\-]+)/i);
    const shortcode = shortcodeMatch ? shortcodeMatch[2] : '';

    if (!shortcode) {
      return { success: false, status: 'UNSUPPORTED', message: 'No shortcode found.' };
    }

    const queryEndpoints = [
      `https://www.instagram.com/graphql/query/?query_hash=b301662c99320545807c13d7da561212&variables=${encodeURIComponent(JSON.stringify({ shortcode }))}`,
      `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`,
    ];

    for (const endpoint of queryEndpoints) {
      try {
        const res = await fetch(endpoint, {
          signal: context.signal,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        if (!res.ok) continue;

        const data = await res.json();
        const media = data?.graphql?.shortcode_media || data?.items?.[0] || data?.data?.shortcode_media;

        if (media) {
          const author = media.owner?.username ? `@${sanitizeText(media.owner.username)}` : undefined;
          const captionText =
            media.edge_media_to_caption?.edges?.[0]?.node?.text || media.caption?.text || media.title;
          const title = captionText ? sanitizeText(captionText.slice(0, 120)) : 'Instagram Video / Reel';
          const thumbnailUrl = media.display_url || media.thumbnail_src;

          let rawVideoUrl = media.video_url;
          if (Array.isArray(media.video_versions) && media.video_versions.length > 0) {
            rawVideoUrl = media.video_versions[0]?.url || rawVideoUrl;
          }

          if (rawVideoUrl && /^https?:\/\//i.test(rawVideoUrl)) {
            const cleanUrlStr = rawVideoUrl.replace(/&amp;/g, '&');
            const validation = await validateMediaStreamUrl(cleanUrlStr, context.signal);
            if (validation.valid && validation.finalUrl) {
              return {
                success: true,
                status: 'SUCCESS',
                title,
                author,
                authorUrl: author ? `https://www.instagram.com/${author.replace('@', '')}/` : undefined,
                thumbnailUrl,
                previewVideoUrl: validation.finalUrl,
                formats: [
                  {
                    id: 'instagram-gql-1080p',
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
      } catch {
        // try next
      }
    }

    return { success: false, status: 'NOT_FOUND', message: 'No valid media in GraphQL API.' };
  }
}

// Strategy 3: Open-Source Backend Fallback
export class InstagramOpenSourceBackendStrategy implements ExtractionStrategy {
  name = 'Instagram Open-Source Backend';

  async execute(url: URL, context: ExtractionContext): Promise<StrategyResult> {
    return executeOpenSourceBackendExtraction(url.toString(), context);
  }
}
