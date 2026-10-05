# SaveNexa — Social Video & Media Downloader

> **Fast, clean, mobile-first public media downloader & stream analyzer.**

SaveNexa is a production-grade, zero-cost, open-source web utility that allows users to paste a supported **public media link** (TikTok, Instagram, Facebook, X, Reddit, Pinterest, or direct media URL) and receive an available media stream for browser-native downloading.

---

## Key Features

- **Mobile-First & Touch-Ergonomic**: Designed for one-handed thumb interaction with instant clipboard paste and native mobile download manager integration.
- **Zero-Account & Privacy-First**: No login, no accounts, no cookies, no tracking pixels, and no database.
- **Direct CDN Streaming**: Zero server media storage. Media streams are resolved in real-time and served directly from origin CDNs.
- **Modular Provider Adapters**: Independent adapters for TikTok, Instagram, Facebook, X, Reddit, Pinterest, and Generic direct video URLs.
- **Strict SSRF Hardening**: Comprehensive defense against loopback, private IPv4/IPv6 ranges, link-local addresses, and non-standard ports.
- **Zero `.env` Requirement**: All application constants reside in transparent source configuration with no secret keys required for MVP.
- **Technical SEO Master Architecture**: 100% server-rendered SEO landing pages, unique canonical tags, robots.txt, dynamic sitemap, and Schema.org JSON-LD structured data.

---

## Supported Platforms

| Platform | Primary URL Types | Output Format |
|---|---|---|
| **TikTok** | Public video links (`tiktok.com/@.../video/...`, `vm.tiktok.com/...`) | HD MP4 Stream |
| **Instagram** | Public posts, carousels, and videos (`instagram.com/p/...`) | High-res MP4 |
| **Instagram Reels** | Public Reels (`instagram.com/reel/...`) | High-res MP4 with Audio |
| **Facebook** | Public watch videos & reels (`facebook.com/watch/...`, `fb.watch/...`) | MP4 Video |
| **X (Twitter)** | Public tweets, video threads, and GIFs (`x.com/.../status/...`) | MP4 Video |
| **Reddit** | Public Reddit videos & v.redd.it links | HD Video + DASH Audio |
| **Pinterest** | Public video pins and idea pins (`pinterest.com/pin/...`) | High-res MP4 |
| **Direct Media** | `.mp4`, `.webm`, `.mov`, `.m4v`, `.mp3`, `.m4a` | Direct Source Stream |

---

## Getting Started

### Prerequisites

- Node.js 18+ or Node.js 20+
- npm / pnpm / yarn

### Installation & Local Run

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Compile and build the production bundle
npm run build

# Start the standalone production server
npm start
```

---

## Architecture Overview

```text
Browser (Mobile/Desktop) 
       │
       ▼
Next.js App Router (Static SEO Pages + Islands)
       │
       ▼ POST /api/analyze
In-Memory Rate Limiter + SSRF Security Guard
       │
       ▼
Provider Adapter Registry (TikTok, IG, FB, X, Reddit, Pinterest, Generic)
       │
       ▼ Direct Origin Response
Browser-Native Download (<a href="..." download>)
```

---

## License

SaveNexa is open-source software licensed under the [Apache License 2.0](LICENSE).
