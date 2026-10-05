import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Save Reddit Videos with Audio (v.redd.it Guide)',
  description: 'Learn why Reddit videos often download without sound and how to save complete Reddit video and audio tracks in high definition.',
  alternates: {
    canonical: '/how-to-save-reddit-video',
  },
  openGraph: {
    title: 'How to Save Reddit Videos with Audio | SaveNexa',
    description: 'A complete walkthrough for saving v.redd.it videos with synchronized audio tracks.',
    url: `${SITE_URL}/how-to-save-reddit-video`,
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
          <span>Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Save Reddit Videos with Synchronized Sound
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Understanding Reddit&apos;s DASH video streaming architecture (v.redd.it) and how to resolve complete high-definition video files.
        </p>
      </header>

      {/* Explanation */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Why Do Reddit Videos Often Download Without Sound?
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            When Reddit hosts videos on its <code>v.redd.it</code> domain, it uses MPEG-DASH (Dynamic Adaptive Streaming over HTTP). Under this system, the video stream (e.g., 720p/1080p MP4) and audio stream (DASH_audio.mp4) are stored as separate files on the server and merged dynamically by the web player.
          </p>
          <p>
            When you try to &quot;Right-Click &gt; Save Video As&quot; directly on Reddit, your browser only downloads the muted video container without the corresponding audio track.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How SaveNexa Resolves Reddit Media
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            SaveNexa queries the public Reddit endpoint for the post, inspects the <code>secure_media</code> schema, and resolves the highest quality video feed alongside the dedicated audio track so you can save both files directly to your machine.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Copy the Reddit post link (Share &gt; Copy Link).</li>
            <li>Paste it into the <Link href="/reddit-video-downloader" className="font-semibold underline">SaveNexa Reddit Downloader</Link>.</li>
            <li>Click <strong>Analyze &amp; Save Media</strong>.</li>
            <li>Choose your preferred video and audio options from the list.</li>
          </ol>
        </div>
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
    </article>
  );
}
