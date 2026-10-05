import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Share2, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'X (Twitter) Video Downloader – Download HD MP4',
  description: 'Download public videos, GIFs, and media attachments from X (formerly Twitter) in HD MP4 format directly in your browser. Fast, free, and secure.',
  alternates: {
    canonical: '/x-video-downloader',
  },
  openGraph: {
    title: 'X (Twitter) Video Downloader – Download HD MP4 | SaveNexa',
    description: 'Download public videos, GIFs, and media from X / Twitter directly to your phone or desktop in high definition.',
    url: `${SITE_URL}/x-video-downloader`,
  },
};

const xFaqs = [
  {
    question: 'How do I save a video or GIF from X (formerly Twitter)?',
    answer: 'Tap the Share icon on any public post, tap "Copy link", paste it into SaveNexa, and tap "Analyze & Save Media". SaveNexa resolves the direct CDN video stream so you can choose your preferred resolution.',
  },
  {
    question: 'Does SaveNexa convert Twitter GIFs into MP4 video files?',
    answer: 'Yes. On X/Twitter, animations and GIFs are internally delivered as looping MP4 video streams. SaveNexa extracts the original high-performance MP4 file directly for offline playback.',
  },
  {
    question: 'Can I download videos from private or protected X accounts?',
    answer: 'No. SaveNexa strictly analyzes publicly accessible media. Protected tweets, subscriber-only content, and deleted posts cannot be accessed or downloaded.',
  },
  {
    question: 'What resolutions are available for Twitter/X video downloads?',
    answer: 'SaveNexa extracts the highest resolution stream published by the author, including 1080p Full HD, 720p HD, and mobile-optimized 360p/270p MP4 formats when provided by the platform CDN.',
  },
];

export default function XDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs items={[{ name: 'X (Twitter) Downloader', url: '/x-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="X (Twitter) Video Downloader – Download HD MP4 | SaveNexa"
        description="Download public videos, GIFs, and media attachments from X (formerly Twitter) directly in your browser in MP4 format."
        url={`${SITE_URL}/x-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Share2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>X / Twitter Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          X (Twitter) Video Downloader for Public Posts
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Save public video clips, GIFs, and media attachments from X (formerly Twitter) straight to your device in original high definition.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste X / Twitter URL (e.g. https://x.com/.../status/... or https://twitter.com/...)"
            defaultSampleUrl="https://x.com/NASA/status/2105677597078126844"
          />
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported X & Twitter Media Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standard Public Video Posts</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports both modern <code>https://x.com/user/status/...</code> links and legacy <code>https://twitter.com/...</code> URLs with multi-bitrate resolution options.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Animated GIFs & Loops</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Extracts high-frame-rate MP4 video files from embedded animations without quality degradation.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Download X (Twitter) Videos on Any Device
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these simple steps to save public media from your phone, tablet, or desktop computer:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Open X, tap the <strong>Share</strong> button on the post, and tap <strong>Copy Link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste the link into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong>. Safari saves the MP4 file to your Files app, where you can move it to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the <strong>Share</strong> icon on the post and copy the URL.</li>
              <li>Open Chrome or your mobile browser, paste the link into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video straight into your Downloads folder and Gallery.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the full post URL from your desktop browser address bar.</li>
              <li>Paste the URL into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Select your preferred MP4 video resolution to save the file to your hard drive.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Why an X / Twitter Download May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Protected Account or Circle Tweet</div>
            <p className="text-slate-600 leading-relaxed">
              Content from private accounts or subscriber-only creator tiers cannot be accessed by public scraper tools.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">External Article or YouTube Preview</div>
            <p className="text-slate-600 leading-relaxed">
              If the tweet contains an external web card rather than a native MP4 video upload, no direct video track is present.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Comprehensive X (Twitter) Tutorial Guide</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Looking for detailed step-by-step instructions on exporting X videos and GIFs directly to your iPhone Camera Roll or Android Gallery? Read our full guide:
        </p>
        <div className="pt-1">
          <Link
            href="/how-to-download-x-twitter-videos"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
          >
            <span>Read: How to Download X (Twitter) Videos & GIFs</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Responsible Use & Platform Limitations</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa only analyzes publicly visible media. Content from protected accounts, subscriber-only communities, or posts subject to age-gate restrictions cannot be accessed. Always respect original creator copyrights and fair use laws.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={xFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Download Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/reddit-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Reddit Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tiktok-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>TikTok Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/online-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Direct Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
