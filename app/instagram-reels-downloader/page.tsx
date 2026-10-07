import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Film, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader – Download Instagram Reels with Audio in HD',
  description: 'Download Instagram Reels with audio online in HD MP4. Free Instagram Reel downloader to save public Reels without apps on iPhone, Android, and desktop.',
  alternates: {
    canonical: '/instagram-reels-downloader',
  },
  openGraph: {
    title: 'Instagram Reels Downloader – Download Instagram Reels with Audio in HD | SaveNexa',
    description: 'Download Instagram Reels with audio online in HD MP4. Free Instagram Reel downloader to save public Reels without apps on iPhone, Android, and desktop.',
    url: `${SITE_URL}/instagram-reels-downloader`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const reelsFaqs = [
  {
    question: 'How do I save an Instagram Reel in HD with sound to my iPhone?',
    answer: 'Copy the Reel link from the Instagram app (tap Share > Copy link), open Safari, paste the link into SaveNexa, and tap "Analyze & Save Media". Tap Download to save the MP4 file to Safari Downloads (Files app). In Files, open the video, tap the Share button, and select "Save Video" to export it into your Photos library.',
  },
  {
    question: 'Does this save the original audio and background music?',
    answer: 'Yes. SaveNexa extracts the full multiplexed MP4 stream with synchronized stereo audio directly from the source CDN, preserving creator commentary and background music tracks.',
  },
  {
    question: 'Why did an Instagram Reel fail to download?',
    answer: 'Reels from private accounts or profiles with restricted visibility cannot be analyzed without login authorization. Make sure the Reel is from an open, public profile.',
  },
  {
    question: 'Can I download Instagram Stories or Highlights here?',
    answer: 'Stories and ephemeral Highlights require specific session authorization and are not supported. For permanent feed video posts, visit our Instagram Video Downloader.',
  },
];

export default function InstagramReelsDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs
        items={[
          { name: 'Instagram Downloader', url: '/instagram-video-downloader' },
          { name: 'Instagram Reels Downloader', url: '/instagram-reels-downloader' },
        ]}
      />

      <SchemaOrg
        type="WebApplication"
        title="Instagram Reels Downloader – Download Instagram Reels with Audio in HD | SaveNexa"
        description="Download public Instagram Reels in HD MP4 format with full audio directly in your browser without software."
        url={`${SITE_URL}/instagram-reels-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Film className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Online Instagram Reels Downloader</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Instagram Reels Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          SaveNexa is a fast, free online Instagram Reels downloader that lets you download Instagram Reels in high-definition MP4 with original synchronized audio. Save public Instagram Reels directly to your phone camera roll or computer files without installing apps, entering passwords, or compromising video quality.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Instagram Reel link (e.g. https://www.instagram.com/reel/...)"
            defaultSampleUrl="https://www.instagram.com/reel/DdcJGoJod0y/?stkn=MThud"
          />
        </div>
      </section>

      {/* Core Features Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          What SaveNexa Instagram Reel Downloader Supports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reels with Audio</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Extracts complete multiplexed MP4 video with synchronized audio tracks, background music, and creator voiceovers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full HD Vertical Quality</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Preserves 1080x1920 portrait aspect ratios and native CDN frame rates without compression artifacts.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Save Without Apps</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Direct mobile browser downloads straight into iOS Files (Camera Roll) and Android Gallery.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported Instagram Reel Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standard Reel Links</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports standard web and mobile URLs formatted as <code>https://www.instagram.com/reel/CODE/</code> and <code>https://instagram.com/reels/CODE/</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Share Links with Tracking Parameters</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Automatically strips tracking parameters (e.g. <code>?igsh=...</code>, <code>?stkn=...</code>) to resolve the clean media stream.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Save Instagram Reels to Camera Roll
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these step-by-step instructions for your device:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>In Instagram, tap <strong>Share</strong> on the Reel and tap <strong>Copy link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong>. Safari saves the MP4 file to your Files app.</li>
              <li>In Files, open the video, tap <strong>Share</strong>, and choose <strong>Save Video</strong> to move it into Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the three dots or <strong>Share</strong> on any public Reel and copy the URL.</li>
              <li>Open your mobile browser, paste the link into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video directly to your Gallery and Downloads folder.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the Reel link from your desktop browser address bar.</li>
              <li>Paste the URL into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Select your preferred MP4 resolution to download the vertical video file.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Why an Instagram Reel Download May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Private Account Restrictions</div>
            <p className="text-slate-600 leading-relaxed">
              Instagram enforces privacy controls on private profiles. SaveNexa operates without user logins and cannot access non-public media.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Audio Licensing Restrictions</div>
            <p className="text-slate-600 leading-relaxed">
              Certain commercial music tracks are restricted by geographic licensing, causing Instagram to deliver a muted video stream in certain regions.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Full Instagram Reels Tutorial</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need an in-depth visual guide on exporting Reels directly to your iPhone Camera Roll or troubleshooting playback on Android? Check out our dedicated tutorial:
        </p>
        <div className="pt-1">
          <Link
            href="/how-to-save-instagram-reels"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
          >
            <span>Read: How to Save Instagram Reels to Camera Roll</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Responsible Archival Notice</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa is a browser-based utility for personal archival of publicly visible media. Always respect creator copyrights and obtain permission before redistributing downloaded content.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={reelsFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Instagram Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/instagram-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Instagram Video Downloader</span>
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
            href="/facebook-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Facebook Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
