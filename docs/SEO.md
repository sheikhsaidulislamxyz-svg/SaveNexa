# SaveNexa — SEO Architecture & Search Strategy

## 1. Information Architecture & Canonical Strategy
All indexable pages feature unique titles, tailored meta descriptions, singular H1 tags, self-referential canonical tags, and structured data schemas.

### Route Index:
- `/` — Homepage WebApplication & WebSite schema
- `/tiktok-video-downloader` — TikTok specific WebApplication + BreadcrumbList
- `/instagram-video-downloader` — Instagram post & video utility
- `/instagram-reels-downloader` — Instagram Reels downloader
- `/facebook-video-downloader` — Facebook Watch & video downloader
- `/x-video-downloader` — X (Twitter) media downloader
- `/reddit-video-downloader` — Reddit v.redd.it downloader
- `/pinterest-video-downloader` — Pinterest video pin downloader
- `/online-video-downloader` — Direct MP4/WebM downloader
- `/guides/*` — Article schemas with step-by-step instructions
- `/about`, `/contact`, `/privacy`, `/terms`, `/copyright` — Brand, trust, and legal policies

## 2. Non-Indexable Boundaries
All API routes (`/api/*`), query-string generation endpoints, and user result pages are explicitly excluded via `robots.txt` and `X-Robots-Tag: noindex, nofollow` headers to eliminate duplicate content and crawl budget waste.

## 3. Schema.org Structured Data
- `WebSite` & `Organization`
- `WebApplication` (free utility, multimedia category)
- `BreadcrumbList` (hierarchical navigation)
- `Article` (for tutorial and guide entries)
- `FAQPage` (for user-visible FAQ sections)
