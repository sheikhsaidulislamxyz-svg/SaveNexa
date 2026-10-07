import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, ArrowRight, CheckCircle, ShieldCheck, Volume2, Smartphone, Laptop, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Save Reddit Videos with Audio (v.redd.it Guide)',
  description: 'Learn why Reddit videos often download without sound and how to save complete Reddit video and audio tracks in HD MP4 using SaveNexa.',
  alternates: {
    canonical: '/how-to-save-reddit-video',
  },
  openGraph: {
    title: 'How to Save Reddit Videos with Audio | SaveNexa',
    description: 'A complete walkthrough for saving v.redd.it videos with synchronized audio tracks.',
    url: `${SITE_URL}/how-to-save-reddit-video`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function HowToSaveRedditVideoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'How to Save Reddit Videos', url: '/how-to-save-reddit-video' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="How to Save Reddit Videos with Audio"
        description="Learn why Reddit separates video and audio and how to download complete media files."
        url={`${SITE_URL}/how-to-save-reddit-video`}
      />

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-emerald-600 font-bold uppercase tracking-wider">Reddit Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>5 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Save Reddit Videos with Synchronized Sound
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Understanding Reddit&apos;s DASH streaming architecture (v.redd.it) and why regular browser saving yields muted files, plus the complete step-by-step method to download full audio/video files.
        </p>
      </header>

      {/* Quick Summary Callout */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
        <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Quick Summary
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          1. Copy the Reddit post link (tap <strong>Share &gt; Copy link</strong>).<br />
          2. Open <Link href="/reddit-video-downloader" className="font-semibold underline">SaveNexa Reddit Downloader</Link>.<br />
          3. Paste the URL and click <strong>Analyze &amp; Save Media</strong>.<br />
          4. Choose your resolution (1080p, 720p, or Audio) and download the complete media file.
        </p>
      </div>

      {/* DASH Architecture Deep-Dive */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-emerald-600" />
          Why Do Reddit Videos Often Download Without Sound?
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            When Reddit hosts videos on its <code>v.redd.it</code> domain, it implements MPEG-DASH (Dynamic Adaptive Streaming over HTTP). Under this system:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600">
            <li><strong>Video Track:</strong> Encoded into multiple video-only files (such as <code>DASH_1080.mp4</code>, <code>DASH_720.mp4</code>).</li>
            <li><strong>Audio Track:</strong> Stored as an isolated audio stream (e.g. <code>DASH_audio.mp4</code> or <code>DASH_AUDIO_128.mp4</code>).</li>
            <li><strong>Dynamic Player:</strong> Reddit&apos;s web and mobile app players dynamically multiplex the two separate streams in real-time during playback.</li>
          </ul>
          <p>
            When you try to &quot;Right-Click &gt; Save Video As&quot; directly on Reddit, your browser only downloads the muted video container without the corresponding audio track.
          </p>
        </div>
      </section>

      {/* Supported URL Formats Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Supported Reddit URL Formats
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Reddit Link Type</th>
                <th className="p-3.5">URL Pattern</th>
                <th className="p-3.5">Handling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Standard Post URL</td>
                <td className="p-3.5 font-mono text-xs">reddit.com/r/sub/comments/id/title/</td>
                <td className="p-3.5">Full JSON manifest parsing</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Direct v.redd.it Link</td>
                <td className="p-3.5 font-mono text-xs">v.redd.it/abcdef123456</td>
                <td className="p-3.5">Direct DASH manifest stream resolution</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Mobile Shortlink</td>
                <td className="p-3.5 font-mono text-xs">redd.it/abcdef</td>
                <td className="p-3.5">Automatic redirection and parsing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step by Step Device Instructions */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          Step-by-Step Mobile Instructions (iPhone &amp; Android)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>In the Reddit mobile app, tap the <strong>Share</strong> button beneath the video post and choose <strong>Copy link</strong>.</li>
            <li>Open Safari (iPhone) or Chrome (Android) and navigate to <Link href="/reddit-video-downloader" className="font-semibold underline">SaveNexa Reddit Downloader</Link>.</li>
            <li>Paste your Reddit URL and tap <strong>Analyze &amp; Save Media</strong>.</li>
            <li>Select your preferred MP4 resolution and tap <strong>Download</strong>.</li>
            <li>On iPhone, open the Files app &gt; Downloads &gt; Share &gt; <em>&quot;Save Video&quot;</em> to add it into Photos. On Android, the video is saved directly into your device Gallery.</li>
          </ol>
        </div>
      </section>

      {/* Limitations Notice */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Private Subreddits &amp; External Embeds
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SaveNexa only analyzes public subreddit posts with native <code>v.redd.it</code> media. Subreddits set to private, quarantined communities requiring user verification, and posts embedding external players (like YouTube or Streamable) cannot be extracted.
        </p>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Try the Reddit Downloader</h3>
          <p className="text-xs text-slate-400">Analyze any public Reddit post or v.redd.it link.</p>
        </div>
        <Link
          href="/reddit-video-downloader"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open Reddit Downloader
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Related Guides */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Guides &amp; Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/guides/why-video-downloads-fail"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Why Downloads Fail &amp; Fixes</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/download-videos-without-app"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Download Videos Without Apps</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </article>
  );
}
