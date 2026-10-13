import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
  Lock,
  HardDrive,
  FileQuestion,
  Layers,
  ArrowRight
} from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import PlatformCard from '@/components/PlatformCard';
import FaqAccordion from '@/components/FaqAccordion';
import AdSlot from '@/components/AdSlot';
import SchemaOrg from '@/components/SchemaOrg';
import { SUPPORTED_PLATFORMS, SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'SaveNexa – Free Online Video Downloader',
  description:
    'Free online video downloader for TikTok, Instagram, Facebook, X, and Pinterest. Save HD MP4 videos and reels via link without watermarks or app installs.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SaveNexa – Free Online Video Downloader',
    description:
      'Free online video downloader for TikTok, Instagram, Facebook, X, and Pinterest. Save HD MP4 videos and reels via link without watermarks or app installs.',
    url: SITE_URL,
    siteName: 'SaveNexa',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'SaveNexa — Free Video Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaveNexa – Free Online Video Downloader',
    description:
      'Free online video downloader for TikTok, Instagram, Facebook, X, and Pinterest. Save HD MP4 videos and reels via link without watermarks or app installs.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const homeFaqs = [
  {
    question: 'How do I download a public video or audio file?',
    answer:
      'Simply copy the public link from TikTok, Instagram, Facebook, X, Reddit, or Pinterest, paste it into the search box above, and click "Analyze & Save Media". Once the source is resolved, choose your preferred format to save it directly to your device.',
  },
  {
    question: 'Do I need an account, login, or app installation?',
    answer:
      'No. SaveNexa is 100% free and open to use without registering, logging in, or installing any third-party browser extensions or mobile applications.',
  },
  {
    question: 'Does SaveNexa work on iPhone, iPad, and Android?',
    answer:
      'Yes. SaveNexa is built mobile-first. On Android (Chrome), taps trigger native browser file downloads. On iOS (Safari), taps open the stream or prompt the Safari Download Manager directly.',
  },
  {
    question: 'Does SaveNexa store my downloaded videos or personal data on a server?',
    answer:
      'No. SaveNexa does not host, store, or archive downloaded media on any server database. Analysis streams are resolved in real-time and served directly from the original public content delivery network (CDN).',
  },
  {
    question: 'Why did my link fail to analyze?',
    answer:
      'The video may be from a private account, deleted by the author, restricted by region or age, or the platform HTML structure might have changed. Please verify that the link opens publicly in an incognito browser window.',
  },
  {
    question: 'What content am I allowed to save?',
    answer:
      'You must only save media that you own, have explicit creator permission to download, or that falls under legal public domain / fair use guidelines. SaveNexa strictly complies with copyright protection laws.',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SchemaOrg
        type="WebApplication"
        title="Free Online Video Downloader | SaveNexa"
        description="Free online video downloader for TikTok, Instagram, Facebook, X, and Pinterest. Save HD MP4 videos via link without watermarks."
      />

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free All Video Downloader Online</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
            Free Online Video Downloader & All Video Downloader
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
            SaveNexa is a fast, free online video downloader. Download video via link from TikTok, Instagram, Facebook, X (Twitter), Reddit, and Pinterest in HD MP4 without watermarks, zero ads interruption, and no software installations.
          </p>

          {/* Interactive Downloader Island */}
          <div className="pt-2">
            <DownloaderForm defaultSampleUrl="https://www.w3schools.com/html/mov_bbb.mp4" />
          </div>

          {/* Microcopy Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No account required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No app installation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Public links only</span>
            </div>
          </div>
        </div>
      </section>

      <AdSlot slot="hero-below-tool" className="max-w-4xl mx-auto px-4" />

      {/* Section A: Supported Platforms Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Supported Social Platforms
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select a dedicated platform tool below for platform-specific guides, formats, and mobile instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPPORTED_PLATFORMS.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </section>

      {/* Section B: How It Works */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How to Save Public Media in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              SaveNexa is designed to be instantaneous on desktop, tablet, and mobile browsers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Copy Public Link',
                description: 'Find a public video or post on TikTok, Instagram, X, Facebook, Reddit, or Pinterest and copy the share link.',
              },
              {
                step: '02',
                title: 'Paste into SaveNexa',
                description: 'Paste the copied URL into the single input box at the top of this page.',
              },
              {
                step: '03',
                title: 'Analyze Media',
                description: 'Click "Analyze & Save Media" to resolve real-time streams and metadata directly from the source.',
              },
              {
                step: '04',
                title: 'Save to Device',
                description: 'Choose your desired format (HD video, standard MP4, or audio) and download it straight to your files.',
              },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative">
                <div className="text-xs font-mono font-bold text-emerald-600">
                  Step {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Mid-Content Ad Banner */}
      <AdSlot slot="content-mid" />

      {/* Section D: Why SaveNexa */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Use SaveNexa?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered with a focus on speed, privacy, transparent limitations, and mobile convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mobile-First Touch Ergonomics</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tailored specifically for one-handed thumb interaction with instant clipboard paste buttons and clean mobile sheets.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Accounts & Zero Tracking</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No login barriers, no registration forms, and no database tracking your download history or personal identifiers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <HardDrive className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct CDN Streaming</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Streams are fetched directly from original content distribution networks without buffering heavy media through intermediary servers.
            </p>
          </div>
        </div>
      </section>

      {/* High-Volume Keyword Integration: All Video Downloader & Platform Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All Video Downloader: Save Public Media via Link
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            SaveNexa is an all-in-one free online video downloader designed to analyze and download video from webpage links quickly, cleanly, and securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              TikTok Video Downloader No Watermark
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Download TikTok videos without watermark in high-definition 1080p and 720p MP4. Our online video downloader extracts original CDN video streams directly so your saved clips remain clean, without distracting logo overlays or compression artifacts.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Instagram Video Downloader Without Watermark
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Looking for a reliable Instagram video downloader? Save public Instagram Reels, feed video posts, and IGTV clips with synchronized audio. No app install required—just paste the link in Safari or Chrome to download and save videos instantly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Facebook Video Downloader HD
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Save public Facebook videos, FB Reels, and Watch streams in full HD quality. Simply copy the post link or fb.watch shortlink and our free video downloader online will generate direct MP4 download links for your smartphone or desktop.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Twitter (X), Reddit & Pinterest Video Downloader
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Extract tweet videos and animated GIFs from X, save Reddit videos with synchronized sound, or download aesthetic Pinterest video pins in MP4 format. SaveNexa gives you a complete, all video downloader toolkit accessible from any modern web browser.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Callout Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Educational Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Need Help Saving Media on iPhone or Android?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Read our step-by-step mobile guides for Safari, Chrome, and desktop browsers, along with copyright & fair use fundamentals.
            </p>
          </div>
          <Link
            href="/guides"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm rounded-xl inline-flex items-center gap-2 transition-transform active:scale-95 shrink-0"
          >
            Explore All Guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section E: FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Common questions about downloading public media with SaveNexa.
          </p>
        </div>

        <FaqAccordion items={homeFaqs} />
      </section>
    </div>
  );
}
