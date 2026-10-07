import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Film, CheckCircle, Smartphone, ArrowRight, ShieldCheck, Camera, HelpCircle, Layers } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Save Instagram Reels to Camera Roll (iPhone & Android)',
  description: 'Detailed tutorial on how to download and save public Instagram Reels with original synchronized audio to your iPhone Camera Roll or Android Gallery without apps.',
  alternates: {
    canonical: '/how-to-save-instagram-reels',
  },
  openGraph: {
    title: 'How to Save Instagram Reels to Camera Roll | SaveNexa',
    description: 'Save public Instagram Reels with audio straight to your phone gallery in HD MP4.',
    url: `${SITE_URL}/how-to-save-instagram-reels`,
    images: [`${SITE_URL}/og-image.png`],
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
          <span className="text-emerald-600 font-bold uppercase tracking-wider">Instagram Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Save Instagram Reels Directly to Your Phone Camera Roll
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Learn how to export public Instagram Reels in vertical HD MP4 quality with full synchronized audio straight to your iOS Photos app or Android Gallery without installing watermarking apps.
        </p>
      </header>

      {/* Quick Summary Callout */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
        <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Quick Summary
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          1. Tap <strong>Share (Airplane icon) &gt; Copy Link</strong> on any public Instagram Reel.<br />
          2. Open <Link href="/instagram-reels-downloader" className="font-semibold underline">SaveNexa Instagram Reels Downloader</Link>.<br />
          3. Paste the URL and tap <strong>Analyze &amp; Save Media</strong>.<br />
          4. Tap <strong>Download</strong>. On iPhone, open Files app &gt; Share &gt; <em>&quot;Save Video&quot;</em> to move to Photos.
        </p>
      </div>

      {/* Instagram Reels vs Feed Videos Comparison */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Instagram Reels vs. Standard Feed Video Posts
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Media Type</th>
                <th className="p-3.5">Aspect Ratio &amp; URL Format</th>
                <th className="p-3.5">Best Tool to Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Instagram Reel</td>
                <td className="p-3.5">9:16 Vertical (<code>instagram.com/reel/...</code>)</td>
                <td className="p-3.5">
                  <Link href="/instagram-reels-downloader" className="text-emerald-700 font-medium underline">
                    Instagram Reels Downloader
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Feed Video Post</td>
                <td className="p-3.5">1:1 Square / 16:9 Landscape (<code>instagram.com/p/...</code>)</td>
                <td className="p-3.5">
                  <Link href="/instagram-video-downloader" className="text-emerald-700 font-medium underline">
                    Instagram Video Downloader
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Carousel Album</td>
                <td className="p-3.5">Multi-slide mixed media (<code>instagram.com/p/...</code>)</td>
                <td className="p-3.5">
                  <Link href="/instagram-video-downloader" className="text-emerald-700 font-medium underline">
                    Instagram Video Downloader
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Handling Share Links & Tracking Parameters */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          Automatic Tracking Parameter Stripping
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            When you copy a link from the Instagram mobile app, it frequently appends long tracking queries such as <code>?igsh=MXR...&amp;utm_source=qr</code>.
          </p>
          <p>
            SaveNexa automatically sanitizes these query tokens to identify the core shortcode (e.g. <code>/reel/SHORTCODE/</code>) and query the public endpoint cleanly without triggering Instagram security blocks.
          </p>
        </div>
      </section>

      {/* iPhone Instructions */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          Step-by-Step: iPhone &amp; iPad (iOS Safari to Camera Roll)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>In Instagram, locate the public Reel you want to save.</li>
            <li>Tap the <strong>Share</strong> (paper airplane) icon and select <strong>Copy link</strong>.</li>
            <li>Open <strong>Safari</strong> and navigate to SaveNexa&apos;s <Link href="/instagram-reels-downloader" className="underline font-semibold">Reels Downloader</Link>.</li>
            <li>Paste your URL and tap <strong>Analyze &amp; Save Media</strong>.</li>
            <li>Tap <strong>Download</strong> on the resolved HD MP4 stream.</li>
            <li>When Safari prompts to download, tap <strong>Download</strong>.</li>
            <li>Open the iOS <strong>Files</strong> app, go to <strong>Downloads</strong>, tap the downloaded video, tap the bottom-left Share icon, and select <strong>Save Video</strong>. The Reel is now in your Apple Photos Camera Roll.</li>
          </ol>
        </div>
      </section>

      {/* Android Instructions */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          Step-by-Step: Android (Chrome / Samsung Internet)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>In the Instagram app, tap <strong>Share &gt; Copy link</strong>.</li>
            <li>Open <strong>Chrome</strong>, go to SaveNexa, paste the link, and tap <strong>Analyze &amp; Save Media</strong>.</li>
            <li>Tap <strong>Download</strong>. Chrome will save the file directly to your <em>Download</em> directory and display it in Google Photos / Gallery.</li>
          </ol>
        </div>
      </section>

      {/* Common Limitations */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Privacy Restrictions &amp; Ephemeral Stories
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SaveNexa strictly analyzes publicly accessible media. Reels from private profiles and 24-hour ephemeral Stories require active session cookies and cannot be fetched. Always ensure you have creator permission before redistributing saved media.
        </p>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Ready to save an Instagram Reel?</h3>
          <p className="text-xs text-slate-400">Download with full audio in high definition.</p>
        </div>
        <Link
          href="/instagram-reels-downloader"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open Reels Downloader
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Related Guides */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Instagram Guides &amp; Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/instagram-video-downloader"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Instagram Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/download-videos-without-app"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Download Without Apps</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/why-video-downloads-fail"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Why Downloads Fail</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </article>
  );
}
