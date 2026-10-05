import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader – Download Instagram Videos',
  description: 'Download public Instagram feed videos, IGTV clips, and carousel media in high-definition MP4 format directly in your browser without accounts or software.',
  alternates: {
    canonical: '/instagram-video-downloader',
  },
  openGraph: {
    title: 'Instagram Video Downloader – Download Instagram Videos | SaveNexa',
    description: 'Save available media from public Instagram feed posts and videos in your browser without accounts or software.',
    url: `${SITE_URL}/instagram-video-downloader`,
  },
};

const instagramFaqs = [
  {
    question: 'How do I download a public Instagram feed video on my phone?',
    answer: 'Open Instagram, tap the three dots or Share icon on any public post, tap "Copy link", paste the URL into SaveNexa in Safari or Chrome, and tap "Analyze & Save Media" to download the MP4 file.',
  },
  {
    question: 'Can I download videos from private Instagram accounts?',
    answer: 'No. SaveNexa strictly operates on publicly accessible content. Private profiles and content behind login cannot be fetched.',
  },
  {
    question: 'Are downloaded Instagram videos saved with sound and audio?',
    answer: 'Yes. SaveNexa extracts the original source stream from the Instagram CDN with full synchronized audio tracks where provided by the publisher.',
  },
  {
    question: 'How is this different from the Instagram Reels Downloader?',
    answer: 'This page is optimized for standard feed posts (square and landscape aspect ratios, multi-slide carousels, and legacy IGTV posts). For vertical short-form clips, visit our Instagram Reels Downloader.',
  },
];

export default function InstagramDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs
        items={[{ name: 'Instagram Video Downloader', url: '/instagram-video-downloader' }]}
      />

      <SchemaOrg
        type="WebApplication"
        title="Instagram Video Downloader – Download Instagram Videos | SaveNexa"
        description="Save public Instagram feed posts and videos in your browser without login or software."
        url={`${SITE_URL}/instagram-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Camera className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instagram Feed Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Instagram Video Downloader for Public Posts
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Save public Instagram feed videos, multi-slide carousel videos, and IGTV clips in full resolution MP4 format.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Instagram post URL (e.g. https://www.instagram.com/p/...)"
            defaultSampleUrl="https://www.instagram.com/p/C9Xexample_post"
          />
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported Instagram URL Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Feed Posts & Carousels</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports standard post URLs formatted as <code>https://www.instagram.com/p/SHORTCODE/</code> containing video media.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>IGTV & Long-Form Video Posts</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports long-form video links formatted as <code>https://www.instagram.com/tv/SHORTCODE/</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Download Public Instagram Videos
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
              <li>In Instagram, tap the three dots or <strong>Share</strong> on the post and choose <strong>Copy link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong>. Safari saves the MP4 file to your Files app, where you can save it to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the <strong>Share</strong> button on any public video post and copy the URL.</li>
              <li>Open your mobile browser, paste into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video straight into your Downloads folder and Gallery.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the post URL directly from your desktop browser address bar.</li>
              <li>Paste the URL into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Select your preferred MP4 resolution to download the video file to your computer.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Troubleshooting & Why a Post May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Static Photo Only Post</div>
            <p className="text-slate-600 leading-relaxed">
              If the post contains only static images without an active video track, SaveNexa will report that no downloadable video was detected.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Private Account or Expired Story</div>
            <p className="text-slate-600 leading-relaxed">
              Private accounts and 24-hour ephemeral Stories require active session cookies and cannot be fetched by our public utility.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Need Help Saving Instagram Media?</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Check out our detailed guides on saving Instagram media directly to your mobile phone or saving vertical Reels with full audio:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <Link
            href="/how-to-save-instagram-reels"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
          >
            <span>Read: How to Save Instagram Reels</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/instagram-reels-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-semibold text-slate-800 transition-colors"
          >
            <span>Instagram Reels Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
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
          SaveNexa is an online utility for personal archival of publicly available content. Always obtain permission before redistributing or publishing downloaded media.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={instagramFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Download Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            <span>Facebook Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tiktok-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>TikTok Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
