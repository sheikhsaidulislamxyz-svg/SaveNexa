import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Tv, ArrowRight, CheckCircle, Smartphone, Laptop, ShieldCheck, Film, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Download Facebook Videos (Watch & Reels) Online',
  description: 'Complete tutorial on copying public Facebook video links and downloading them in HD MP4 quality to your computer or phone without software.',
  alternates: {
    canonical: '/how-to-download-facebook-video',
  },
  openGraph: {
    title: 'How to Download Facebook Videos Online | SaveNexa',
    description: 'Learn how to download public Facebook videos, watch streams, and reels directly to your device.',
    url: `${SITE_URL}/how-to-download-facebook-video`,
    images: [`${SITE_URL}/og-image.png`],
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
        description="Learn how to copy and download public Facebook videos on desktop and mobile in HD MP4."
        url={`${SITE_URL}/how-to-download-facebook-video`}
      />

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-emerald-600 font-bold uppercase tracking-wider">Facebook Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Download Public Facebook Videos and Watch Clips
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A step-by-step guide to finding the true media URL for any public Facebook video post, watch episode, or reel, and saving it in 1080p/720p HD MP4 format.
        </p>
      </header>

      {/* Quick Summary Callout */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
        <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Quick Summary
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          1. Copy the link from Facebook (tap <strong>Share &gt; Copy link</strong>).<br />
          2. Open <Link href="/facebook-video-downloader" className="font-semibold underline">SaveNexa Facebook Video Downloader</Link>.<br />
          3. Paste the URL and click <strong>Analyze &amp; Save Media</strong>.<br />
          4. Select your preferred resolution (1080p Full HD, 720p HD, or SD MP4) and download.
        </p>
      </div>

      {/* Supported Facebook Content Types Table */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Supported Facebook Media Types
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Facebook Content</th>
                <th className="p-3.5">URL Pattern</th>
                <th className="p-3.5">Resolution Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Facebook Watch Shows</td>
                <td className="p-3.5 font-mono text-xs">facebook.com/watch/?v=12345...</td>
                <td className="p-3.5">Up to 1080p Full HD MP4</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Mobile Shortlinks</td>
                <td className="p-3.5 font-mono text-xs">fb.watch/...</td>
                <td className="p-3.5">Automatic redirection to HD stream</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Facebook Reels</td>
                <td className="p-3.5 font-mono text-xs">facebook.com/reel/12345...</td>
                <td className="p-3.5">Vertical 1080x1920 with stereo audio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step by Step Device Instructions */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How to Copy &amp; Save Facebook Videos on Any Device
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Laptop className="w-4 h-4 text-emerald-600" />
              On Desktop (PC/Mac)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Navigate to the post, right-click on the video player and choose <em>&quot;Show video URL&quot;</em> or copy the link directly from your browser&apos;s address bar. Paste into SaveNexa to get direct MP4 download choices.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              On Mobile (Facebook App)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tap the <strong>Share</strong> button below the video, tap <em>&quot;More Options&quot;</em>, then select <em>&quot;Copy Link&quot;</em>. Open Safari or Chrome, paste into SaveNexa, and tap Analyze.
            </p>
          </div>
        </div>
      </section>

      {/* Private Group & Privacy Notice */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Private Groups &amp; Audience Restrictions
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SaveNexa only fetches publicly visible videos. Content from closed or secret Facebook groups, personal profiles set to &quot;Friends Only&quot;, or videos with age-gate restrictions cannot be accessed. For troubleshooting help, read our <Link href="/guides/why-video-downloads-fail" className="underline font-semibold">Why Video Downloads Fail Guide</Link>.
        </p>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Try the Facebook Downloader</h3>
          <p className="text-xs text-slate-400">Paste your Facebook link and save in HD MP4 format.</p>
        </div>
        <Link
          href="/facebook-video-downloader"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open Facebook Downloader
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
            href="/guides/download-videos-without-app"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Download Videos Without Apps</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/browser-download-guide"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Browser Download Troubleshooting</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </article>
  );
}
