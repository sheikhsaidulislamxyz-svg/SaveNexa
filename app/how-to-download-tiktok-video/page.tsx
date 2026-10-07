import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, CheckCircle, Smartphone, Laptop, ArrowRight, ShieldCheck, HelpCircle, Music, Video, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Download Public TikTok Videos Step-by-Step Guide',
  description: 'Detailed tutorial on how to copy and save public TikTok videos on iPhone, Android, Mac, and Windows in HD MP4 without watermarks using browser tools.',
  alternates: {
    canonical: '/how-to-download-tiktok-video',
  },
  openGraph: {
    title: 'How to Download Public TikTok Videos Step-by-Step Guide | SaveNexa',
    description: 'Complete guide for downloading public TikTok videos and audio without software or apps.',
    url: `${SITE_URL}/how-to-download-tiktok-video`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function HowToDownloadTikTokVideoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'How to Download TikTok Videos', url: '/how-to-download-tiktok-video' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="How to Download Public TikTok Videos Step-by-Step Guide"
        description="Learn how to save public TikTok videos in HD MP4 and extract audio tracks on iPhone, Android, and PC."
        url={`${SITE_URL}/how-to-download-tiktok-video`}
      />

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-emerald-600 font-bold uppercase tracking-wider">TikTok Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>5 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Download Public TikTok Videos to Your Device
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A complete walkthrough for saving public TikTok clips in crisp HD MP4 format, extracting original audio sound tracks, and managing media files on iOS, Android, and desktop browsers without installing extra apps.
        </p>
      </header>

      {/* Quick Summary Callout */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
        <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Quick Summary
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          1. Tap <strong>Share &gt; Copy Link</strong> on any public TikTok video.<br />
          2. Open <Link href="/tiktok-video-downloader" className="font-semibold underline">SaveNexa TikTok Downloader</Link>.<br />
          3. Paste the link and click <strong>Analyze &amp; Save Media</strong>.<br />
          4. Choose your preferred quality format (HD MP4 or Audio) and tap Download.
        </p>
      </div>

      {/* Watermark Explanation Section */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How Clean TikTok Downloads Work (No Watermark)
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            When you save a video natively through the TikTok mobile application, the app re-encodes the file to overlay a bouncing creator watermark and logo.
          </p>
          <p>
            SaveNexa works differently: it inspects the public server response to identify the direct source stream delivered by TikTok&apos;s origin media servers before the application-layer watermark is stamped. This allows you to obtain clean, uncompressed video playback for your personal offline archives.
          </p>
        </div>
      </section>

      {/* Supported URL Types Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Supported TikTok URL Formats
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Format Type</th>
                <th className="p-3.5">Example URL Structure</th>
                <th className="p-3.5">Source Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Standard Web URL</td>
                <td className="p-3.5 font-mono text-xs">https://www.tiktok.com/@creator/video/123456789...</td>
                <td className="p-3.5">Desktop Browser</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Mobile Shortlink (vm)</td>
                <td className="p-3.5 font-mono text-xs">https://vm.tiktok.com/ZM.../</td>
                <td className="p-3.5">iOS / Android App Share</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Regional Shortlink (vt)</td>
                <td className="p-3.5 font-mono text-xs">https://vt.tiktok.com/.../</td>
                <td className="p-3.5">International Mobile Share</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 1: iOS iPhone Steps */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          How to Save TikTok Videos on iPhone (Safari)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Apple&apos;s iOS includes a built-in Safari Download Manager that eliminates the need for sketchy App Store downloader apps:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Open the TikTok app and navigate to the public video you want to keep.</li>
            <li>Tap the arrow <strong>Share</strong> button on the bottom right.</li>
            <li>Select <strong>Copy Link</strong> from the sharing tray.</li>
            <li>Launch <strong>Safari</strong> and navigate to <Link href="/tiktok-video-downloader" className="font-semibold underline">SaveNexa TikTok Downloader</Link>.</li>
            <li>Tap <strong>Paste</strong> and press <strong>Analyze &amp; Save Media</strong>.</li>
            <li>When the download card appears, tap <strong>Download</strong>.</li>
            <li>Safari will prompt: <em>&quot;Do you want to download &apos;savenexa-media.mp4&apos;?&quot;</em> Tap <strong>Download</strong>.</li>
            <li>Open your iPhone <strong>Files</strong> app &gt; <strong>Downloads</strong>, tap the video, then tap the Share icon and select <strong>Save Video</strong> to move it into your Photos library.</li>
          </ol>
        </div>
      </section>

      {/* Section 2: Android Steps */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          How to Save TikTok Videos on Android (Chrome / Firefox)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            On Android devices, downloads are saved directly into your device storage and Gallery:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>In the TikTok app, tap <strong>Share &gt; Copy link</strong>.</li>
            <li>Open <strong>Chrome</strong> on your Android phone and visit SaveNexa.</li>
            <li>Paste the URL and tap <strong>Analyze &amp; Save Media</strong>.</li>
            <li>Tap <strong>Download</strong>. Chrome will save the MP4 file directly to your <em>Download</em> folder and Gallery.</li>
          </ol>
        </div>
      </section>

      {/* Section 3: Extracting TikTok Audio / Sound Tracks */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Music className="w-5 h-5 text-emerald-600" />
          Extracting TikTok Audio &amp; Original Sound Tracks
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            When a video features an original creator sound or background music track, SaveNexa provides a dedicated direct audio option alongside the video resolution choices. This lets you save clean M4A/MP3 audio files for music production, personal offline listening, or speech archiving without needing audio conversion software.
          </p>
        </div>
      </section>

      {/* Section 4: Photo Slideshow Posts */}
      <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-slate-700" />
          Photo Mode &amp; Slideshow Posts
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          TikTok supports multi-image &quot;Photo Mode&quot; slideshow posts that swipe horizontally. Because these posts consist of static image sets rather than a single continuous MP4 video stream, video downloaders will extract the underlying audio track or primary video stream when present.
        </p>
      </section>

      {/* Section 5: Legal & Copyright Guidance */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Copyright &amp; Responsible Use
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Always respect the intellectual property rights of content creators. You should only download videos for personal offline viewing, archiving your own content, or when you have explicit permission from the creator. For more details on statutory copyright rules, read our <Link href="/guides/public-content-and-copyright" className="underline font-semibold">Public Content &amp; Fair Use Guide</Link>.
        </p>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Ready to save a TikTok video?</h3>
          <p className="text-xs text-slate-400">Use our dedicated TikTok tool right now.</p>
        </div>
        <Link
          href="/tiktok-video-downloader"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open TikTok Downloader
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Related Guides */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Guides
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/guides/download-videos-without-app"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Download Videos Without an App</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/why-video-downloads-fail"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Why Video Downloads Fail &amp; Fixes</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </article>
  );
}
