import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Tv, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Facebook Video Downloader – Download FB Videos & Reels in HD MP4 Online',
  description: 'Download Facebook videos, FB Reels, and Watch clips online in HD MP4. Free Facebook video downloader for iPhone, Android, and PC with no app installation required.',
  alternates: {
    canonical: '/facebook-video-downloader',
  },
  openGraph: {
    title: 'Facebook Video Downloader – Download FB Videos & Reels in HD MP4 Online | SaveNexa',
    description: 'Download Facebook videos, FB Reels, and Watch clips online in HD MP4. Free Facebook video downloader for iPhone, Android, and PC with no app installation required.',
    url: `${SITE_URL}/facebook-video-downloader`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const fbFaqs = [
  {
    question: 'How do I download a public Facebook video on mobile?',
    answer: 'Tap the Share button on any public Facebook post, reel, or watch clip, tap "Copy link", paste it into SaveNexa in Safari or Chrome, and tap "Analyze & Save Media" to download the direct MP4 file.',
  },
  {
    question: 'Can I download Facebook Reels with this tool?',
    answer: 'Yes. SaveNexa unifies Facebook post videos, Watch episodes, and Facebook Reels. Simply paste the public facebook.com/reel/... URL to save vertical MP4 clips with full audio.',
  },
  {
    question: 'Can I download videos from private Facebook groups or accounts?',
    answer: 'No. SaveNexa strictly operates on public posts. Videos inside private groups, closed communities, or restricted to friends cannot be fetched.',
  },
  {
    question: 'Does this support fb.watch shortlinks?',
    answer: 'Yes. SaveNexa automatically resolves fb.watch/... mobile shortlinks, facebook.com/watch/... streams, and standard feed video links.',
  },
  {
    question: 'What video quality is available for Facebook downloads?',
    answer: 'SaveNexa delivers the highest quality stream provided by the Facebook CDN, including 1080p Full HD and 720p HD MP4 video with synchronized audio.',
  },
];

export default function FacebookDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs items={[{ name: 'Facebook Downloader', url: '/facebook-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Facebook Video Downloader – Download FB Videos & Reels in HD MP4 Online | SaveNexa"
        description="Download public Facebook videos, Watch clips, and FB Reels in MP4 format directly in your browser."
        url={`${SITE_URL}/facebook-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Tv className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Online Facebook Downloader</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Facebook Video Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          SaveNexa is a free online Facebook video downloader that allows you to download public Facebook videos, FB Reels, and Watch clips in HD MP4 format. Save Facebook video online directly through your browser with full synchronized audio without installing software or creating an account on iPhone, Android, or PC.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Facebook video link (e.g. https://www.facebook.com/watch/?v=... or /reel/...)"
            defaultSampleUrl="https://www.facebook.com/watch/?v=123456789012345"
          />
        </div>
      </section>

      {/* Core Features Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          What Our Facebook Downloader Supports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Facebook Watch & Post Videos</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Extracts high-definition 1080p and 720p MP4 streams from public desktop and mobile feed videos.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Facebook Reels Downloader</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Saves vertical short-form Facebook Reels with synchronized stereo audio and original sound tracks.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mobile Shortlinks (fb.watch)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Automatically handles and resolves shortened mobile share URLs without browser redirects failing.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported Facebook Video Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Facebook Watch & Post Videos</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports <code>facebook.com/watch/?v=...</code>, standard post videos, and <code>fb.watch/...</code> shortlinks.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Facebook Reels (Vertical Clips)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports public <code>facebook.com/reel/...</code> short-form video clips with synchronized stereo audio.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Download Public Facebook Videos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these simple steps to save Facebook videos directly to your phone, tablet, or desktop computer:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>In the Facebook app, tap <strong>Share</strong> on the post and choose <strong>Copy link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste the link into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong>. Safari saves the MP4 file directly to your Files app, where you can save to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the three dots or <strong>Share</strong> on the video and copy the URL.</li>
              <li>Open Chrome or your mobile browser, paste into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video straight into your Downloads folder.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the Facebook video or reel URL from your browser address bar.</li>
              <li>Paste the URL into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Choose your preferred MP4 resolution to download the video file directly to your hard drive.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Why a Facebook Video Download May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Private Group or Friends-Only Post</div>
            <p className="text-slate-600 leading-relaxed">
              Posts restricted to private group members or specific friend lists cannot be retrieved by our public scraper.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Age or Location Gate</div>
            <p className="text-slate-600 leading-relaxed">
              Videos flagged with 18+ age restrictions require logged-in verification and are shielded by Facebook.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Detailed Facebook Download Tutorial</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need step-by-step guidance on copying clean Facebook URLs and resolving common mobile link issues? Check out our dedicated tutorial:
        </p>
        <div className="pt-1">
          <Link
            href="/how-to-download-facebook-video"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
          >
            <span>Read: How to Download Facebook Videos & Watch Clips</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Responsible Use & Privacy Limitations</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa only fetches publicly visible videos. Content from private groups, personal accounts with restricted audience settings, or age-restricted posts cannot be accessed.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={fbFaqs} />
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
