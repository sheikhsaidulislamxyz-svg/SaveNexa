import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Reddit Video Downloader with Sound',
  description:
    'Download Reddit videos with sound in HD MP4 online. Free Reddit video downloader via link to save public posts on iPhone, Android, and PC.',
  alternates: {
    canonical: '/reddit-video-downloader',
  },
  openGraph: {
    title: 'Reddit Video Downloader with Sound | SaveNexa',
    description:
      'Download Reddit videos with sound in HD MP4 online. Free Reddit video downloader via link to save public posts on iPhone, Android, and PC.',
    url: `${SITE_URL}/reddit-video-downloader`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const redditFaqs = [
  {
    question: 'How do I download Reddit videos with synchronized sound/audio?',
    answer: 'Reddit serves video (v.redd.it) and audio in separate adaptive DASH streams. SaveNexa analyzes both tracks and resolves the high-definition video track alongside the audio stream so you can save them directly.',
  },
  {
    question: 'Can I download videos from private or quarantined subreddits?',
    answer: 'No. SaveNexa only resolves publicly accessible subreddit posts. Content behind private community walls or requiring user login cannot be fetched.',
  },
  {
    question: 'Does this support shortened redd.it and v.redd.it links?',
    answer: 'Yes. Full reddit.com post URLs, v.redd.it direct links, and redd.it shortlinks are all fully supported.',
  },
  {
    question: 'Where do downloaded Reddit videos get saved on iPhone and Android?',
    answer: 'On iPhone, Safari downloads the MP4 file to your Files app (Downloads folder). On Android, Chrome saves the video directly to your Downloads folder and device Gallery.',
  },
];

export default function RedditDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs items={[{ name: 'Reddit Video Downloader', url: '/reddit-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Reddit Video Downloader – Download Reddit Video with Sound in HD MP4 | SaveNexa"
        description="Download public Reddit videos (v.redd.it) and GIFs with audio streams directly in your browser."
        url={`${SITE_URL}/reddit-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reddit Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Reddit Video Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          SaveNexa is a free online Reddit video downloader that solves the common issue of muted downloads by letting you download Reddit video with sound in high-definition MP4. Extract public v.redd.it video streams and synchronized audio tracks directly in your web browser without installing software or logging in.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Reddit URL (e.g. https://www.reddit.com/r/.../comments/... or https://v.redd.it/...)"
            defaultSampleUrl="https://www.reddit.com/r/NatureIsFuckingLit/comments/1example_reddit_post"
          />
        </div>
      </section>

      {/* Core Features Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          What Our Reddit Video Downloader Supports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reddit Video with Sound</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Resolves split MPEG-DASH audio and video streams and provides complete media tracks for download.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>HD v.redd.it Downloader</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Provides direct access to 1080p Full HD, 720p HD, and 480p streams hosted on Reddit content delivery networks.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>redd.it & App Shortlinks</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Easily paste mobile app share links formatted as redd.it or direct v.redd.it links from any client.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported Reddit URL Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Post & Comments URLs</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports standard web links like <code>https://www.reddit.com/r/subreddit/comments/id/title/</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Direct v.redd.it & Shortlinks</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports mobile app share links formatted as <code>https://redd.it/...</code> and direct <code>https://v.redd.it/...</code> links.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Download Reddit Videos with Sound
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these simple steps to save public Reddit videos to your camera roll or desktop hard drive:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>In the Reddit app, tap <strong>Share</strong> on the post and choose <strong>Copy Link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste the link into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong> to save the MP4 video straight to your Files app, where you can save to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the <strong>Share</strong> button on any Reddit video post and copy the URL.</li>
              <li>Open Chrome or your mobile browser, paste into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video directly into your Gallery.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the thread URL from your browser address bar.</li>
              <li>Paste the link into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Select your preferred resolution (1080p, 720p, 480p) to download the MP4 file.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Why a Reddit Video Download May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Private Subreddit Community</div>
            <p className="text-slate-600 leading-relaxed">
              Subreddits marked as private or quarantined require user authentication and cannot be accessed by public tools.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">External Video Embed (YouTube / Streamable)</div>
            <p className="text-slate-600 leading-relaxed">
              If the post links to an external host rather than Reddit&apos;s native <code>v.redd.it</code> video player, SaveNexa cannot extract native streams.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Comprehensive Reddit Video Tutorial</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need an in-depth walkthrough on extracting audio tracks or troubleshooting Reddit video downloads on iOS and Android? Check out our dedicated guide:
        </p>
        <div className="pt-1">
          <Link
            href="/how-to-save-reddit-video"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
          >
            <span>Read: How to Save Reddit Videos with Sound</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Responsible Use & Subreddit Guidelines</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa only fetches publicly available content from open subreddits. Private subreddits, deleted posts, and third-party embeds are handled in accordance with their source permissions.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={redditFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Download Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/x-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>X (Twitter) Downloader</span>
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
