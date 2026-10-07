# SaveNexa — Social Video & Media Downloader

> **Fast, clean, privacy-first web utility for analyzing and downloading public media streams.**

SaveNexa is an open-source, mobile-first web application designed to analyze public media links (from TikTok, Instagram, Facebook, X/Twitter, Reddit, Pinterest, and direct video URLs) and deliver available public streams directly to the browser for native saving.

---

## 🌐 Live Website

Access the official production web application at:

**[https://save-nexa.vercel.app/](https://save-nexa.vercel.app/)**

*Free to use, zero account creation required, and 100% browser-based.*

---

## 🚀 Key Features

- **Mobile-First Ergonomics**: Designed for single-hand touch interaction, instant clipboard pasting, and native mobile download managers (iOS Safari & Android Chrome).
- **Direct Origin Streaming**: Zero server media storage. SaveNexa analyzes public stream locations and provides direct CDN streams for native browser downloads without intermediate file retention.
- **Privacy by Default**: No user accounts, no login walls, no tracking databases, and no unnecessary tracking scripts.
- **Multi-Platform Support**: Specialized analyzers for TikTok, Instagram posts & Reels, Facebook videos, X (formerly Twitter) clips & GIFs, Reddit DASH video/audio, Pinterest video pins, and direct media URLs (.mp4, .webm, .mov, etc.).
- **Security & SSRF Hardening**: Strict host whitelisting, RFC 1918 private IP blocking, loopback prevention, and sanitization of user-supplied URLs.
- **Structured Semantic SEO**: Full Next.js server-rendered metadata, Schema.org JSON-LD structured data (WebApplication, BreadcrumbList, Article, FAQPage), self-referential canonicals, dynamic sitemap, and Open Graph / Twitter Card support.

---

## 📱 Supported Platforms & URL Formats

| Platform | Supported Formats | Primary URL Patterns | Output Type |
|---|---|---|---|
| **TikTok** | Public videos & audio clips | `tiktok.com/@.../video/...`, `vm.tiktok.com/...` | HD MP4 / M4A |
| **Instagram** | Feed videos & carousels | `instagram.com/p/...` | HD MP4 |
| **Instagram Reels** | Public Reels with synchronized audio | `instagram.com/reel/...` | HD MP4 (with audio) |
| **Facebook** | Public watch videos & FB Reels | `facebook.com/watch/?v=...`, `fb.watch/...` | MP4 Video |
| **X (Twitter)** | Public tweets with video & GIFs | `x.com/.../status/...`, `twitter.com/...` | MP4 Video / GIF-as-MP4 |
| **Reddit** | Public Reddit videos & v.redd.it links | `reddit.com/r/.../comments/...`, `v.redd.it/...` | MP4 (Video + Audio) |
| **Pinterest** | Public video pins & idea pins | `pinterest.com/pin/...`, `pin.it/...` | High-res MP4 |
| **Direct Media** | Public media links | Direct `.mp4`, `.webm`, `.mov`, `.m4v`, `.mp3` | Original File Stream |

*Note: SaveNexa strictly supports public, accessible media. Private posts, stories, copyrighted DRMs, and password-protected streams are intentionally unsupported.*

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Motion](https://motion.dev/)
- **Deployment Target**: Vercel / Node.js Serverless Container

---

## 💻 Getting Started (Local Development)

### Prerequisites

- Node.js 18.x or 20.x+
- npm, pnpm, or bun

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/savenexa.git
cd savenexa

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

### Production Build & Verification

```bash
# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📖 Documentation & Specifications

- [`/docs/SEO-PLAYBOOK.md`](docs/SEO-PLAYBOOK.md) — Technical SEO strategy, keyword clustering, search intent mapping, and canonical rules.
- [`/docs/SEO-CONTENT-MAP.md`](docs/SEO-CONTENT-MAP.md) — Complete content inventory, URL structure, and cannibalization prevention rules.
- [`/docs/LAUNCH-COPY.md`](docs/LAUNCH-COPY.md) — Factual launch and distribution copy for Product Hunt, developer communities, and social platforms.
- [`/docs/OUTREACH-PLAN.md`](docs/OUTREACH-PLAN.md) — Ethical outreach targets across open-source directories, tech blogs, and developer hubs.
- [`/docs/PRD.md`](docs/PRD.md) — Product Requirements Document.
- [`/docs/TRD.md`](docs/TRD.md) — Technical Requirements & Architecture Document.
- [`/docs/PROVIDERS.md`](docs/PROVIDERS.md) — Media extractor and provider adapter specifications.

---

## 🏷 GitHub Topics & Categorization

Suggested repository topics for open-source discovery:
`video-downloader`, `nextjs`, `typescript`, `tailwind-css`, `tiktok-downloader`, `instagram-downloader`, `reddit-video-downloader`, `twitter-downloader`, `media-analyzer`, `open-source-tool`

---

## ⚖️ License & Fair Use

SaveNexa is open-source software licensed under the [Apache License 2.0](LICENSE). 

SaveNexa is an educational and personal stream utility designed solely for public, non-copyrighted or user-owned content. Please review our [Terms of Service](https://save-nexa.vercel.app/terms), [Privacy Policy](https://save-nexa.vercel.app/privacy), and [Copyright / DMCA Guidelines](https://save-nexa.vercel.app/copyright).
