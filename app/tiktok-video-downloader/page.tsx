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
  title: 'TikTok Video Downloader Online – Download TikTok Videos in HD MP4',
  description: 'Download TikTok videos online in HD MP4 without watermarks or app installations. Free, fast TikTok video downloader for iPhone, Android, and PC with audio extraction.',
  alternates: {
    canonical: '/tiktok-video-downloader',
  },
  openGraph: {
    title: 'TikTok Video Downloader Online – Download TikTok Videos in HD MP4 | SaveNexa',
    description: 'Download TikTok videos online in HD MP4 without watermarks or app installations. Free, fast TikTok video downloader for iPhone, Android, and PC with audio extraction.',
    url: `${SITE_URL}/tiktok-video-downloader`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const tiktokFaqs = [
  {
    question: 'How do I download a public TikTok video without watermarks?',
    answer: 'SaveNexa accesses the public source stream provided by TikTok content delivery servers. Because it extracts the direct media file rather than screen-recording or re-encoding with branding stamps, available downloads provide clean MP4 video playback.',
  },
  {
    question: 'How do I save TikTok videos to my iPhone Photos library?',
    answer: 'In the TikTok app, tap Share > Copy Link. Open Safari, navigate to SaveNexa, paste the link, and tap "Analyze & Save Media". Tap Download to save the MP4 to the Safari Download Manager (Files app). In Files, tap Share and choose "Save Video" to move it directly into your Photos camera roll.',
  },
  {
    question: 'Can I download private TikTok clips or videos from private accounts?',
    answer: 'No. SaveNexa strictly analyzes publicly accessible links. Private accounts, friends-only videos, and draft videos protected by user authentication cannot be accessed.',
  },
  {
    question: 'Can I extract the audio or sound track from a TikTok video?',
    answer: 'Yes. When the publisher provides an isolated original audio stream, SaveNexa resolves a dedicated direct audio option alongside the MP4 video format choices.',
  },
  {
    question: 'What video quality is available for TikTok downloads?',
    answer: 'SaveNexa delivers the highest quality stream provided by the TikTok CDN for the post, including 1080p Full HD and 720p HD MP4 video with synchronized audio.',
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
        title="TikTok Video Downloader Online – Download TikTok Videos in HD MP4 | SaveNexa"
        description="Download public TikTok videos in HD MP4 format directly in your browser without watermarks or app installs."
        url={`${SITE_URL}/tiktok-video-downloader`}
      />

      {/* Hero Section & Downloader Island (Above the fold) */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <Video className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Online TikTok Downloader</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          TikTok Video Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          SaveNexa is a free online TikTok video downloader that allows you to download public TikTok videos in HD MP4 directly in your browser. Save clean clips without watermarks, extract original audio (MP3/M4A) when provided, and download TikTok videos without installing any app on iPhone, Android, or PC.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste TikTok video link (e.g. https://www.tiktok.com/@.../video/... or https://vm.tiktok.com/...)"
            defaultSampleUrl="https://www.tiktok.com/@tiktok/video/7106594312292453675"
          />
        </div>
      </section>

      {/* Core Features & Intent Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          What SaveNexa TikTok Downloader Supports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>TikTok HD MP4 (No Watermark)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Extracts original high-definition streams delivered by TikTok CDN servers without re-encoding or adding stamped logos.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>TikTok Audio / Sound Track</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When an isolated creator sound or background music stream is available, SaveNexa resolves a dedicated direct audio download option.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Browser-Based (No App)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Works directly in Safari, Chrome, and Firefox on iOS, Android, macOS, and Windows with zero software installation or signup.
            </p>
          </div>
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
