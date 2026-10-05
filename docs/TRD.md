# SaveNexa — Technical Requirements Document (TRD)

## 1. System Architecture
- **Framework**: Next.js 15 App Router + React 19 + TypeScript.
- **Styling**: Tailwind CSS v4 with fluid mobile-first ergonomics.
- **State & Interactivity**: Client-side hydrated islands (`DownloaderForm`, `FaqAccordion`, `Header` mobile menu).
- **Backend**: Next.js Edge/Node API route (`/api/analyze`).

## 2. Security & SSRF Protection
- Strict URL validation against private IPv4/IPv6 ranges (RFC1918, RFC3927, loopbacks).
- Hostname blocking for `localhost`, `*.internal`, `*.local`, `*.lan`.
- Port restrictions: only 80, 443, 8080, 8443 permitted.
- In-memory sliding-window rate limiting per client IP.

## 3. Media Resolution Pipeline
1. `validateUrlSecurity(input)` verifies protocol and hostname.
2. `findMatchingProvider(url)` routes to the dedicated provider adapter.
3. Provider executes public oEmbed or metadata query with `AbortController` timeout (8s max).
4. Normalized `MediaResult` returned to client.
5. Browser directly streams from origin CDN (`<a download href="...">`).
