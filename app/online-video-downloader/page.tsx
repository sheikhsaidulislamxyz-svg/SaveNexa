import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Online Video Downloader – Download Public Video Links',
  description: 'Inspect and save direct online video files (.mp4, .webm, .mov, .m4v, .mp3) from any public server directly in your browser without software.',
  alternates: {
    canonical: '/online-video-downloader',
  },
  openGraph: {
    title: 'Online Video Downloader – Download Public Video Links | SaveNexa',
    description: 'Inspect and download direct video files (.mp4, .webm, .mov) directly from your browser.',
    url: `${SITE_URL}/online-video-downloader`,
  },
};

const onlineFaqs = [
  {
    question: 'What file formats can I download directly?',
    answer: 'SaveNexa supports direct web video formats including .mp4, .webm, .mov, .m4v, .ogv, as well as audio files such as .mp3, .m4a, and .wav.',
  },
  {
    question: 'How does direct URL analysis work?',
    answer: 'When you paste a direct media URL, SaveNexa performs a lightweight server-side HEAD inspection to verify content type, byte size, and accessibility before generating a clean download token.',
  },
  {
    question: 'Why does my direct link show an error?',
    answer: 'The link might be behind authentication, expire after a short duration, or block external cross-origin requests. Verify that the URL can be accessed directly without cookies in an incognito window.',
  },
];

export default function OnlineVideoDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs items={[{ name: 'Direct Video Downloader', url: '/online-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Online Video Downloader – Download Public Video Links | SaveNexa"
        description="Inspect and save direct online video files (.mp4, .webm, .mov, .m4v) directly in your browser."
        url={`${SITE_URL}/online-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>Universal Direct Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Direct Video & Audio Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Inspect, analyze, and save direct public media links (MP4, WebM, MOV, MP3) from web servers and CDNs.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste direct media URL (e.g. https://.../video.mp4)"
            defaultSampleUrl="https://www.w3schools.com/html/mov_bbb.mp4"
          />
        </div>
      </section>

      {/* Supported Media Containers */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported Media Containers & Encodings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>MP4 & M4V Video</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Standard H.264/AVC and H.265/HEVC video containers with AAC or MP3 audio tracks.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>WebM & MOV</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Open-source VP8/VP9 WebM streams and Apple QuickTime MOV video files.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Direct Audio Streams</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Direct audio links ending in .mp3, .m4a, .wav, or .ogg with native headers.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Save Direct Online Video Files
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these steps to save direct server links on your device:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the direct media URL.</li>
              <li>Paste into SaveNexa in Safari and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong> to save the file to your Files app, where you can move it to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Paste the link into SaveNexa on your Android browser.</li>
              <li>Tap <strong>Analyze & Save Media</strong>.</li>
              <li>Tap <strong>Download</strong> to save the file into your Downloads folder.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Paste the media URL and click Analyze.</li>
              <li>Click <strong>Download</strong> to save the verified file directly to your desktop or downloads directory.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Why a Direct Link May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Signed or Expired CDN Token</div>
            <p className="text-slate-600 leading-relaxed">
              Some media servers attach temporary signature query parameters that expire within minutes. Re-copy the fresh link if expired.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">SSRF / Private IP Protection</div>
            <p className="text-slate-600 leading-relaxed">
              SaveNexa blocks requests to local, internal, or non-routable private IP addresses (e.g., localhost, 192.168.x.x, AWS metadata endpoints) for security.
            </p>
          </div>
        </div>
      </section>

      {/* Helpful Guides & Knowledge Base */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Device & Browser Guides</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need assistance managing downloads or learning about copyright permissions?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <Link
            href="/guides/browser-download-guide"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
          >
            <span>Browser Download Troubleshooting</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/public-content-and-copyright"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
          >
            <span>Public Content & Fair Use Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Security & Fair Use Notice</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa only fetches publicly accessible media URLs from remote web servers. Users are responsible for ensuring they have permission to access and download files from third-party hosting providers.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={onlineFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Social Media Downloaders
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/tiktok-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>TikTok Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/instagram-reels-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Instagram Reels Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/facebook-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Facebook Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
