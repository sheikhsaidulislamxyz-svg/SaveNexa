# SaveNexa — Search Engine Optimization (SEO) Playbook

> **Internal Reference Manual for Canonical Architecture, Search Intent Mapping, Structured Data, and Measurement Readiness.**

---

## 1. Executive Strategy & Core Principles

SaveNexa's search architecture is built on **Quality over Quantity**, strict topical authority, clean URL hierarchy, and zero keyword cannibalization.

### Core Principles
1. **1:1 Intent-to-URL Mapping**: Each indexable page answers a single distinct search query intent (transactional tool vs. instructional guide vs. legal/brand trust).
2. **Self-Referential Canonicalization**: Every production route specifies an exact, absolute canonical URL pointing to `https://save-nexa.vercel.app/<path>`.
3. **Indexable vs. Non-Indexable Boundary**:
   - **Indexed**: Homepage (`/`), Platform landing pages (`/*-video-downloader`, `/instagram-reels-downloader`), Guides hub (`/guides`), Instructional Guides (`/guides/*`, `/how-to-*`), Brand & Legal (`/about`, `/contact`, `/privacy`, `/terms`, `/copyright`).
   - **Excluded (`robots.txt` + `noindex`)**: API endpoints (`/api/*`), analysis requests, user session URLs, temporary redirects, and dynamic query filters.
4. **Zero AI Slop / Anti-Doorway Rule**: Never generate thin variant pages (e.g., `/download-tiktok-on-iphone-14` or `/free-tiktok-downloader-2026`). All device and platform variations are unified under authoritative pillar pages.

---

## 2. Page-by-Page Keyword Architecture & Intent Map

| Route / Path | Canonical URL | Page Purpose & Type | Primary Keyword Cluster | Search Intent | Supporting Topics & Features | Related Guide Link | What NOT to Target (Avoid Cannibalization) |
|---|---|---|---|---|---|---|---|
| `/` | `https://save-nexa.vercel.app/` | Homepage / Multi-Platform Hub | `free video downloader`, `online video downloader`, `social media video downloader` | Transactional / Navigational | Unified link analyzer, platform selector, 3-step guide, FAQ | `/guides/download-videos-without-app` | Specific single platforms (leave to dedicated pages) |
| `/tiktok-video-downloader` | `https://save-nexa.vercel.app/tiktok-video-downloader` | Transactional Downloader | `TikTok video downloader`, `download TikTok videos`, `TikTok downloader online` | Transactional | HD MP4 without watermark, audio stream extraction, photo slides | `/how-to-download-tiktok-video` | Private TikToks, account hacking, bulk scraping |
| `/instagram-video-downloader` | `https://save-nexa.vercel.app/instagram-video-downloader` | Transactional Downloader | `Instagram video downloader`, `download Instagram video`, `save Instagram video` | Transactional | Feed video MP4, carousel video inspection, high-res output | `/how-to-save-instagram-reels` | Instagram Stories downloader, Private IG viewer, IG profile picture downloader |
| `/instagram-reels-downloader` | `https://save-nexa.vercel.app/instagram-reels-downloader` | Transactional Downloader | `Instagram Reels downloader`, `download Instagram Reels`, `save Instagram Reels with audio` | Transactional | Reel MP4 with synchronized original audio, mobile browser saving | `/how-to-save-instagram-reels` | Audio-only rip without video attribution, private Reels |
| `/facebook-video-downloader` | `https://save-nexa.vercel.app/facebook-video-downloader` | Transactional Downloader | `Facebook video downloader`, `download Facebook video`, `FB video downloader` | Transactional | Watch links, public page videos, FB Reels in HD MP4 | `/how-to-download-facebook-video` | Private Facebook groups, locked profile videos, friend-only posts |
| `/x-video-downloader` | `https://save-nexa.vercel.app/x-video-downloader` | Transactional Downloader | `X video downloader`, `Twitter video downloader`, `download Twitter video` | Transactional | 1080p/720p MP4, Twitter GIF-to-MP4 conversion, tweet status links | `/how-to-download-x-twitter-videos` | Protected tweets, Spaces audio recording, direct message media |
| `/reddit-video-downloader` | `https://save-nexa.vercel.app/reddit-video-downloader` | Transactional Downloader | `Reddit video downloader`, `download Reddit video`, `Reddit video with sound` | Transactional | v.redd.it DASH audio+video stream extraction, subreddit clips | `/how-to-save-reddit-video` | Quarantined/private subreddit media, Reddit chat media |
| `/pinterest-video-downloader` | `https://save-nexa.vercel.app/pinterest-video-downloader` | Transactional Downloader | `Pinterest video downloader`, `download Pinterest video`, `save Pinterest Pin video` | Transactional | Video pins, Idea pins, pin.it shortlinks, original 1080p stream | `/how-to-download-pinterest-videos` | Secret board pins, board bulk downloader |
| `/online-video-downloader` | `https://save-nexa.vercel.app/online-video-downloader` | Universal Direct Downloader | `online video downloader`, `download video from URL`, `direct MP4 downloader` | Transactional / Utility | MIME validation, HEAD inspect, direct stream delivery (.mp4/.webm/.mov) | `/guides/browser-download-guide` | YouTube downloading (avoid legal issues), torrent links |
| `/guides` | `https://save-nexa.vercel.app/guides` | Educational Hub | `how to download social media videos`, `video download tutorials` | Informational Hub | Index of all platform walkthroughs, mobile OS tips, troubleshooting | All platform downloaders | Generic regurgitated wiki articles |
| `/how-to-download-tiktok-video` | `https://save-nexa.vercel.app/how-to-download-tiktok-video` | Educational Guide | `how to download TikTok video`, `save TikTok to camera roll`, `TikTok without watermark guide` | Informational | iOS Files save steps, Android download manager, troubleshooting | `/tiktok-video-downloader` | Duplicate transactional tool |
| `/how-to-save-instagram-reels` | `https://save-nexa.vercel.app/how-to-save-instagram-reels` | Educational Guide | `how to save Instagram Reels`, `download Instagram Reels with sound on iPhone` | Informational | Mobile Safari workflow, Files app integration, Reels audio guide | `/instagram-reels-downloader` | Instagram video feed duplicate guide |
| `/how-to-download-facebook-video` | `https://save-nexa.vercel.app/how-to-download-facebook-video` | Educational Guide | `how to download Facebook videos`, `save FB video on mobile` | Informational | Watch URL extraction, mobile Chrome saving, public link checks | `/facebook-video-downloader` | Facebook private group scrapers |
| `/how-to-download-x-twitter-videos` | `https://save-nexa.vercel.app/how-to-download-x-twitter-videos` | Educational Guide | `how to download Twitter videos`, `save X video on iPhone Android` | Informational | Tweet URL copying, GIF saving as MP4, resolution selection | `/x-video-downloader` | Deleted tweet recovery |
| `/how-to-save-reddit-video` | `https://save-nexa.vercel.app/how-to-save-reddit-video` | Educational Guide | `how to save Reddit video with audio`, `download v.redd.it video` | Informational | DASH video/audio stream explanation, mobile app link sharing | `/reddit-video-downloader` | Third-party Reddit bot commands |
| `/how-to-download-pinterest-videos` | `https://save-nexa.vercel.app/how-to-download-pinterest-videos` | Educational Guide | `how to download Pinterest videos`, `save Pinterest video to gallery` | Informational | Video Pin vs Idea Pin resolution, pin.it resolution tips | `/pinterest-video-downloader` | Static image pin scraping |
| `/guides/download-videos-without-app` | `https://save-nexa.vercel.app/guides/download-videos-without-app` | Pillar Guide | `download social media videos without app`, `save video online without software` | Informational | Browser vs App security, avoiding malware/bloatware, storage saving | `/` | Single-platform app alternatives |
| `/guides/why-video-downloads-fail` | `https://save-nexa.vercel.app/guides/why-video-downloads-fail` | Diagnostic Guide | `why video download fails`, `social media video download error troubleshooting` | Informational | CDN token expiry, private account restrictions, geo-blocks, CORS | `/guides` | Promoting unauthorized circumvention |
| `/guides/phone-video-download-guide` | `https://save-nexa.vercel.app/guides/phone-video-download-guide` | Device Guide | `how to download videos on iPhone`, `download videos on Android browser` | Informational | iOS Safari Downloads, Files app 'Save Video' to Camera Roll, Chrome Downloads | `/guides/browser-download-guide` | Jailbreak / APK installation guides |
| `/guides/browser-download-guide` | `https://save-nexa.vercel.app/guides/browser-download-guide` | Browser Guide | `browser video download guide`, `how browser video saving works` | Informational | Chrome, Safari, Firefox, Edge native download managers and HTTP streaming | `/online-video-downloader` | Browser extension promotions |
| `/guides/public-content-and-copyright` | `https://save-nexa.vercel.app/guides/public-content-and-copyright` | Legal / Educational | `social media video copyright rules`, `fair use video downloads` | Informational / Trust | Public domain, Fair Use, creator attribution, Terms of Service compliance | `/copyright` | Legal advice or copyright bypass |
| `/about` | `https://save-nexa.vercel.app/about` | Brand / E-E-A-T | `about SaveNexa`, `SaveNexa video downloader` | Navigational / Trust | Mission, architecture, security standards, privacy principles | `/` | Commercial product comparisons |
| `/contact` | `https://save-nexa.vercel.app/contact` | Brand / Support | `contact SaveNexa`, `SaveNexa support` | Navigational | Bug reports, DMCA requests, support channel | `/about` | Unrelated promotional offers |
| `/privacy` | `https://save-nexa.vercel.app/privacy` | Legal / Compliance | `SaveNexa privacy policy` | Legal | Zero-log policy, no tracking, ephemeral analysis, data privacy | `/terms` | Marketing cookies policy |
| `/terms` | `https://save-nexa.vercel.app/terms` | Legal / Compliance | `SaveNexa terms of service` | Legal | Permitted use, fair use, non-commercial educational utility | `/privacy` | Warranty / commercial SLA |
| `/copyright` | `https://save-nexa.vercel.app/copyright` | Legal / DMCA | `SaveNexa DMCA copyright policy` | Legal / Trust | DMCA takedown process, designated agent notice, creator rights | `/contact` | Counterfeit claim generation |

---

## 3. Structured Data (Schema.org JSON-LD) Standards

All structured data is generated via standard, validated JSON-LD schema blocks:

1. **`Organization` & `WebSite`**: Injected globally across root layout to establish brand identity, search actions, and publisher credentials.
2. **`WebApplication`**: Embedded on all transactional downloader pages with `applicationCategory: "MultimediaApplication"`, `operatingSystem: "All"`, and `offers: { price: "0", priceCurrency: "USD" }`.
3. **`Article` & `TechArticle`**: Applied to all guides and educational articles with `headline`, `author`, `publisher`, `datePublished`, and `dateModified`.
4. **`BreadcrumbList`**: Configured on every secondary page reflecting standard hierarchy (`Home` > `Guides` > `Page` or `Home` > `Platform Downloader`).
5. **`FAQPage`**: Included on pages with visible, high-value FAQ sections matching user search queries.

---

## 4. Measurement & Search Console Readiness

### Verification Meta Tags
- **Google Search Console**: Configured in `app/layout.tsx` via `verification.google` and `<meta name="google-site-verification" />`.
- **Bing Webmaster Tools**: Compatible with automated Google Search Console import or dedicated `<meta name="msvalidate.01" />`.

### Sitemap & Robots Validation
- **Robots.txt (`/robots.txt`)**: Points directly to `${SITE_URL}/sitemap.xml`. Permits all search engines (`User-agent: *`) on public paths while restricting `/api/*` and dynamic internal routes.
- **Sitemap XML (`/sitemap.xml`)**: Clean list of all 26 canonical URLs with priority scores (1.0 for home, 0.9 for platform tools, 0.8 for guides, 0.5 for legal).

### Analytics & Performance Measurement
- Core Web Vitals targets:
  - **LCP (Largest Contentful Paint)**: < 1.2s
  - **FID / INP (Interaction to Next Paint)**: < 50ms
  - **CLS (Cumulative Layout Shift)**: 0.00
  - **TBT (Total Blocking Time)**: < 50ms
- No heavy third-party tracking scripts or blocking tags are embedded, preserving maximum Lighthouse speed scores (98–100).
