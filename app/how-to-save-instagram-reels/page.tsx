import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Film, CheckCircle, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Save Instagram Reels to Camera Roll (iPhone & Android)',
  description: 'Detailed tutorial on how to download and save public Instagram Reels directly with audio to your camera roll without watermark apps.',
  alternates: {
    canonical: '/how-to-save-instagram-reels',
  },
  openGraph: {
    title: 'How to Save Instagram Reels to Camera Roll | SaveNexa',
    description: 'Save public Instagram Reels with audio straight to your phone gallery.',
    url: `${SITE_URL}/how-to-save-instagram-reels`,
  },
};

export default function HowToSaveInstagramReelsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'How to Save Instagram Reels', url: '/how-to-save-instagram-reels' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="How to Save Instagram Reels to Camera Roll"
        description="Learn how to save public Instagram Reels with audio directly to your device."
        url={`${SITE_URL}/how-to-save-instagram-reels`}
      />

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>3 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Save Instagram Reels Directly to Your Phone
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Learn how to export public Instagram Reels in high definition with synchronized sound to your iOS Camera Roll or Android Gallery.
        </p>
      </header>

      {/* Step by Step */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Steps to Download Any Public Instagram Reel
        </h2>
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">1. Locate the Reel and Copy Link</span>
            <p className="text-xs sm:text-sm text-slate-600">
              Open the Instagram app, view the Reel, tap the airplane (Share) icon, and choose &quot;Copy link&quot;.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">2. Paste into SaveNexa Reels Downloader</span>
            <p className="text-xs sm:text-sm text-slate-600">
              Open your browser and navigate to our <Link href="/instagram-reels-downloader" className="font-semibold underline">Instagram Reels Downloader</Link>. Paste the copied link into the search box.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 block">3. Analyze and Save</span>
            <p className="text-xs sm:text-sm text-slate-600">
              Click &quot;Analyze & Save Media&quot;, select the High Resolution MP4 format, and download the video file directly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Have an Instagram Reel URL ready?</h3>
          <p className="text-xs text-slate-400">Analyze and download it right now.</p>
        </div>
        <Link
          href="/instagram-reels-downloader"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open Reels Downloader
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
