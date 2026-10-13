import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader HD MP4',
  description:
    'Download Pinterest videos and pin ideas online in HD MP4. Free Pinterest video downloader to save public video pins on iPhone, Android, and PC.',
  alternates: {
    canonical: '/pinterest-video-downloader',
  },
  openGraph: {
    title: 'Pinterest Video Downloader HD MP4 | SaveNexa',
    description:
      'Download Pinterest videos and pin ideas online in HD MP4. Free Pinterest video downloader to save public video pins on iPhone, Android, and PC.',
    url: `${SITE_URL}/pinterest-video-downloader`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const pinterestFaqs = [
  {
    question: 'How do I save a video from Pinterest to my phone?',
    answer: 'Tap the three dots or Share icon on any public video Pin in the Pinterest app, tap "Copy link", paste it into SaveNexa in Safari or Chrome, and tap "Analyze & Save Media" to download the direct MP4 file.',
  },
  {
    question: 'Does SaveNexa support short pin.it links?',
    answer: 'Yes. SaveNexa automatically follows and resolves shortened pin.it URLs as well as full standard https://www.pinterest.com/pin/... links.',
  },
  {
    question: 'Can I download private, secret board, or archive Pins?',
    answer: 'No. SaveNexa only analyzes public Pinterest content. Secret boards, private group boards, and restricted Pins cannot be accessed.',
  },
  {
    question: 'What format are downloaded Pinterest videos?',
    answer: 'Pinterest videos are extracted in standard high-compatibility MP4 format (H.264 video codec with AAC audio) suitable for native playback on iOS, Android, macOS, and Windows.',
  },
];

export default function PinterestDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs items={[{ name: 'Pinterest Downloader', url: '/pinterest-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Pinterest Video Downloader – Download Video Pins & Idea Pins in HD MP4 | SaveNexa"
        description="Download public Pinterest video pins, idea pins, and high-resolution clips directly in your browser without software."
        url={`${SITE_URL}/pinterest-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pinterest Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Pinterest Video Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          SaveNexa is a free online Pinterest video downloader that allows you to download public Pinterest video pins, animated idea clips, and tutorial videos in HD MP4 format. Save Pinterest video online directly through your browser without installing apps, browser extensions, or signing up on iPhone, Android, or desktop.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Pinterest Pin URL (e.g. https://www.pinterest.com/pin/... or https://pin.it/...)"
            defaultSampleUrl="https://www.pinterest.com/pin/579908889542843424/"
          />
        </div>
      </section>

      {/* Core Features Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          What Our Pinterest Video Downloader Supports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Video Pins in HD MP4</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Extracts high-resolution MP4 video streams encoded in H.264 with synchronized AAC audio tracks.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Idea Pin Video Downloads</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Captures animated recipe clips, DIY walkthroughs, and multi-page video pins with crystal clarity.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>pin.it Mobile Shortlinks</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Seamlessly resolves shortened mobile app links (pin.it) and standard desktop pinterest.com URLs.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported Pinterest URL Types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standard Video Pins</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports standard web URLs like <code>https://www.pinterest.com/pin/123456789/</code> with native MP4 streams.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mobile Shortlinks (pin.it)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports mobile share links like <code>https://pin.it/...</code> with automatic redirect following.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Download Pinterest Videos on Any Device
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these step-by-step instructions to save video Pins directly to your camera roll or desktop files:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Open the Pinterest app, tap <strong>Share</strong> on the Pin, and tap <strong>Copy Link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste the link into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong> to save the MP4 video to your Files app, where you can move it to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android Devices</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the <strong>Send / Share</strong> icon on any video Pin and copy the link.</li>
              <li>Open Chrome or your mobile browser, paste into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video directly to your Gallery.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the Pin URL from your browser address bar.</li>
              <li>Paste the link into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Select your desired MP4 quality to save the video file directly to your disk.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Why a Pinterest Video Download May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Secret or Private Board</div>
            <p className="text-slate-600 leading-relaxed">
              Pins saved on Secret Boards or private shared workspaces require account authentication and cannot be accessed.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Static Photo Pin Only</div>
            <p className="text-slate-600 leading-relaxed">
              Pins containing only static photography or illustrations do not have video streams to extract.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Comprehensive Pinterest Download Tutorial</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need step-by-step instructions on resolving short <code>pin.it</code> links and saving Pinterest video Pins to your iPhone Camera Roll or Android Gallery? Check out our dedicated guide:
        </p>
        <div className="pt-1">
          <Link
            href="/how-to-download-pinterest-videos"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
          >
            <span>Read: How to Download Pinterest Videos & Pins</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Responsible Use & Secret Boards</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa operates exclusively on public Pinterest Pins. Secret boards, private collaboration collections, and age-restricted Pins are strictly protected and cannot be downloaded.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={pinterestFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Download Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/instagram-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Instagram Downloader</span>
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
