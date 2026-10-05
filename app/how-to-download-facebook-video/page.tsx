import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Tv, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Download Facebook Videos (Watch & Reels) Online',
  description: 'Complete tutorial on copying public Facebook video links and downloading them in HD MP4 quality to your computer or phone.',
  alternates: {
    canonical: '/how-to-download-facebook-video',
  },
  openGraph: {
    title: 'How to Download Facebook Videos Online | SaveNexa',
    description: 'Learn how to download public Facebook videos, watch streams, and reels directly to your device.',
    url: `${SITE_URL}/how-to-download-facebook-video`,
  },
};

export default function HowToDownloadFacebookVideoPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'How to Download Facebook Videos', url: '/how-to-download-facebook-video' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="How to Download Facebook Videos Online"
        description="Learn how to copy and download public Facebook videos on desktop and mobile."
        url={`${SITE_URL}/how-to-download-facebook-video`}
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
          How to Download Public Facebook Videos and Watch Clips
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Learn how to get the exact URL for any public Facebook video post, watch episode, or reel, and save it in MP4 format.
        </p>
      </header>

      {/* Guide Steps */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Desktop vs. Mobile Instructions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">On Desktop (PC/Mac)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Right-click on the video player and choose &quot;Copy video URL at current time&quot; or copy the link directly from your browser&apos;s address bar when viewing the post.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">On Mobile (Facebook App)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tap the Share button below the video, tap &quot;More Options&quot;, then select &quot;Copy Link&quot;.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed border border-slate-200">
          Once you have copied the link, open our <Link href="/facebook-video-downloader" className="font-semibold underline">Facebook Video Downloader</Link>, paste the link, and click <strong>Analyze &amp; Save Media</strong>.
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Try the Facebook Downloader</h3>
          <p className="text-xs text-slate-400">Paste your Facebook link and save in MP4 format.</p>
        </div>
        <Link
          href="/facebook-video-downloader"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open Facebook Downloader
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
