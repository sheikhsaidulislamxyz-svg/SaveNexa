# SaveNexa — Product Requirements Document (PRD)

## 1. Product Vision & Positioning
**SaveNexa** is an open-source, mobile-first web utility for analyzing and downloading publicly available social media and video content directly in the browser without accounts, login walls, or invasive advertisements.

## 2. Target Audience & Core User Scenarios
- **Primary Persona**: Mobile user who copies a public TikTok, Instagram Reel, Facebook video, Reddit clip, or X tweet URL and wants to quickly save the MP4 or MP3 file to their device.
- **Key User Flows**:
  1. *Paste & Save*: Paste URL -> Instant platform detection -> Click "Analyze & Save Media" -> Instant preview -> Click "Save / Download".
  2. *Educational Discovery*: Landing on platform-specific SEO pages (e.g. `/tiktok-video-downloader`) or device tutorials (e.g. `/guides/phone-video-download-guide`).

## 3. Explicit Non-Goals (MVP Boundary)
- No private-account or credentials-bypass mechanisms.
- No permanent server-side media file storage or mirroring.
- No user accounts, passwords, or authentication.
- No database requirements or `.env` dependencies in MVP.
- No intrusive interstitial advertisements or pop-unders.

## 4. Acceptance Criteria
- Full mobile responsiveness across 360px–1440px viewports.
- WCAG AA accessibility compliance (contrast, keyboard focus, semantic HTML).
- Clean error messaging with actionable recovery suggestions.
