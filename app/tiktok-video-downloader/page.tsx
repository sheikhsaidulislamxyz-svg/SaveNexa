import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Video, ShieldCheck, Smartphone, Laptop, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'TikTok Video Downloader – Save TikTok Videos in HD',
  description: 'Download public TikTok videos in HD MP4 format directly in your browser. Fast, free, and secure online downloader without software or accounts.',
  alternates: {
    canonical: '/tiktok-video-downloader',
  },
  openGraph: {
    title: 'TikTok Video Downloader – Save TikTok Videos in HD | SaveNexa',
    description: 'Save available media from public TikTok links in your browser without accounts or software.',
    url: `${SITE_URL}/tiktok-video-downloader`,
  },
};

const tiktokFaqs = [
  {
    question: 'How do I download a public TikTok video on iPhone/iOS?',
    answer: 'Copy the video link in the TikTok app by tapping Share > Copy Link. Open Safari, paste the link into SaveNexa, tap Analyze & Save Media, and tap Download. Safari saves the MP4 video to your Files app, where you can easily save it to Photos.',
  },
  {
    question: 'Can I download private TikTok videos or drafts?',
    answer: 'No. SaveNexa only resolves publicly accessible media. Private posts, friends-only videos, and deleted content cannot be analyzed.',
  },
  {
    question: 'Does this tool download original HD quality MP4 files?',
    answer: 'Yes. SaveNexa resolves the original source streams provided by the TikTok CDN, delivering the highest available resolution for offline playback.',
  },
  {
    question: 'Can I extract audio or MP3 from TikTok videos?',
    answer: 'Yes. When original audio tracks are available as separate audio streams, SaveNexa provides an audio download option alongside the video formats.',
  },
];

export default function TikTokDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-14">
      <Breadcrumbs
        items={[{ name: 'TikTok Video Downloader', url: '/tiktok-video-downloader' }]}
      />

      <SchemaOrg
        type="WebApplication"
        title="TikTok Video Downloader – Save TikTok Videos in HD | SaveNexa"
        description="Download public TikTok videos in HD MP4 format directly in your browser without software or accounts."
        url={`${SITE_URL}/tiktok-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Video className="w-3.5 h-3.5 text-emerald-600" />
          <span>TikTok Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          TikTok Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Paste any public TikTok video link to analyze available source streams and save clean MP4 video files directly in your browser.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste TikTok URL (e.g. https://www.tiktok.com/@user/video/... or https://vm.tiktok.com/...)"
            defaultSampleUrl="https://www.tiktok.com/@tiktok/video/7106594312292453675"
          />
        </div>
      </section>

      {/* Supported Links Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Supported TikTok URL Formats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standard Desktop & Web Links</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports full browser URLs like <code>https://www.tiktok.com/@creator/video/1234567890123456789</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mobile App Shortlinks</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Supports mobile share URLs such as <code>https://vm.tiktok.com/ZM.../</code> and <code>https://vt.tiktok.com/...</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Device Instructions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            How to Download TikTok Videos on Any Device
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Follow these step-by-step instructions for your specific operating system:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">iPhone & iPad (iOS Safari)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>In the TikTok app, tap <strong>Share</strong> and choose <strong>Copy link</strong>.</li>
              <li>Open <strong>Safari</strong>, paste the link into SaveNexa, and tap <strong>Analyze</strong>.</li>
              <li>Tap <strong>Download</strong>. Safari saves the MP4 video to your Files app, where you can tap &quot;Save Video&quot; to export to Photos.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Smartphone className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Android (Chrome / Firefox)</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Tap the <strong>Share</strong> button on any TikTok video and copy the URL.</li>
              <li>Open your mobile browser, paste the link into SaveNexa, and tap Analyze.</li>
              <li>Tap <strong>Download</strong> to save the video straight into your Downloads folder and Gallery.</li>
            </ol>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
              <Laptop className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Windows PC & Mac</h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Copy the full video link from your browser address bar.</li>
              <li>Paste the URL into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
              <li>Select your preferred MP4 resolution to download the video file directly to your disk.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Troubleshooting & Why a Download May Fail */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Troubleshooting & Why a Download May Fail
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Private or Deleted Video</div>
            <p className="text-slate-600 leading-relaxed">
              If the creator has set their account to private, restricted access to friends only, or deleted the post, the media stream is unavailable.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900">Region-Restricted or Sound-Muted Content</div>
            <p className="text-slate-600 leading-relaxed">
              Some clips have geo-blocked audio tracks or licensed music that cannot be streamed outside certain territories.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide Contextual Link */}
      <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>In-Depth TikTok Tutorial</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need step-by-step guidance on saving TikTok videos directly to your iPhone Camera Roll or extracting audio tracks? Check out our dedicated tutorial:
        </p>
        <div className="pt-1">
          <Link
            href="/how-to-download-tiktok-video"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-900 transition-colors shadow-sm"
          >
            <span>Read: How to Download Public TikTok Videos</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </section>

      {/* Limitations & Legal Notice */}
      <section className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Responsible Use Notice</span>
        </div>
        <p className="text-xs text-amber-900/80 leading-relaxed">
          SaveNexa is a browser-based utility for personal archival and fair use of publicly available media. Please ensure you have permission from the original creator before reusing or redistributing downloaded content.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={tiktokFaqs} />
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
