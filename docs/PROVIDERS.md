# SaveNexa — Provider Adapter Architecture

## 1. Provider Adapter Interface
All platform extractors implement the standardized `MediaProvider` contract:

```typescript
export interface MediaProvider {
  id: string;
  name: string;
  match(url: URL): boolean;
  analyze(url: URL, signal: AbortSignal): Promise<MediaResult | MediaErrorResult>;
}
```

## 2. Active Platform Adapters
1. **TikTokProvider** (`lib/providers/tiktok.ts`):
   - Matches: `tiktok.com`, `vm.tiktok.com`, `vt.tiktok.com`
   - Mechanism: Official public oEmbed endpoint + public video stream headers.
2. **InstagramProvider** (`lib/providers/instagram.ts`):
   - Matches: `instagram.com` (`/p/`, `/reel/`, `/tv/`)
   - Mechanism: Public caption embed parser and media container extraction.
3. **FacebookProvider** (`lib/providers/facebook.ts`):
   - Matches: `facebook.com`, `fb.watch`, `m.facebook.com`
   - Mechanism: Public watch meta tags and open-graph video stream resolution.
4. **TwitterProvider** (`lib/providers/twitter.ts`):
   - Matches: `twitter.com`, `x.com`, `t.co`
   - Mechanism: Publish Twitter oEmbed and media syndication format resolution.
5. **RedditProvider** (`lib/providers/reddit.ts`):
   - Matches: `reddit.com`, `redd.it`, `v.redd.it`
   - Mechanism: Reddit public JSON parser, resolving `v.redd.it` HD video stream and DASH audio stream.
6. **PinterestProvider** (`lib/providers/pinterest.ts`):
   - Matches: `pinterest.com`, `pin.it`
   - Mechanism: Public pin open-graph video metadata parser.
7. **GenericMediaProvider** (`lib/providers/generic.ts`):
   - Matches: Direct extensions (`.mp4`, `.webm`, `.mov`, `.m4v`, `.mp3`, `.m4a`)
   - Mechanism: HTTP HEAD request inspection for MIME type and `Content-Length`.
