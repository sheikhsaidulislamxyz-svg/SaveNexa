import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Smartphone, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mobile Video Download Guide — iPhone (iOS) & Android Tips',
  description: 'Master mobile video saving on iPhone Safari and Android Chrome. Learn how to locate downloaded files, export to Photos, and bypass common mobile browser issues.',
  alternates: {
    canonical: '/guides/phone-video-download-guide',
  },
  openGraph: {
    title: 'Mobile Video Download Guide (iPhone & Android) | SaveNexa',
    description: 'Learn how to save videos directly on iPhone and Android mobile browsers.',
    url: `${SITE_URL}/guides/phone-video-download-guide`,
  },
};

export default function PhoneVideoDownloadGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Phone Video Download Guide', url: '/guides/phone-video-download-guide' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="Mobile Video Download Guide — iPhone (iOS) & Android Tips"
        description="Comprehensive tutorial for downloading video files on smartphones."
        url={`${SITE_URL}/guides/phone-video-download-guide`}
      />

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Device Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>5 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Download and Manage Videos on iPhone and Android Phones
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Modern smartphone browsers are fully capable of downloading video files without requiring dedicated third-party downloader apps. Here is how to make the most of iOS Safari and Android Chrome.
        </p>
      </header>

      {/* iPhone Section */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          iPhone &amp; iPad (iOS Safari)
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Starting with iOS 13, Safari features an integrated Download Manager located right in the address bar.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>When you tap <strong>Download</strong> on SaveNexa, Safari prompts: <em>&quot;Do you want to download this file?&quot;</em></li>
            <li>Tap <strong>Download</strong>. A blue circular download icon will appear in the Safari address bar.</li>
            <li>Tap the download icon to view progress. Once complete, tap the file to preview.</li>
            <li><strong>To move to Photos:</strong> Tap the <strong>Share</strong> button in the bottom left corner, then tap <strong>Save Video</strong>. The video will now appear directly in your Apple Photos app.</li>
          </ol>
        </div>
      </section>

      {/* Android Section */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-600" />
          Android (Google Chrome &amp; Samsung Internet)
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Android provides straightforward file system access.
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>When you tap <strong>Download</strong> on SaveNexa, Chrome initiates a background file transfer.</li>
            <li>A notification saying <em>&quot;File downloaded&quot;</em> appears at the top of your screen.</li>
            <li>The MP4 file is immediately visible in your phone&apos;s <strong>Files</strong> app (under <em>Downloads</em>) and in your Google Photos / Samsung Gallery under the <em>Download</em> album.</li>
          </ol>
        </div>
      </section>

      {/* Common Problems */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          What If the Video Starts Playing Instead of Downloading?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Some mobile browsers open MP4 links in an inline media player by default. If this occurs, simply <strong>long-press (press and hold)</strong> the Download button, and choose <strong>&quot;Download Linked File&quot;</strong> (on iOS) or <strong>&quot;Download link&quot;</strong> (on Android).
        </p>
      </section>

      {/* Back to tools */}
      <div className="pt-4 flex justify-between items-center text-xs">
        <Link href="/guides" className="text-slate-600 hover:text-slate-900 font-medium">
          ← Back to All Guides
        </Link>
        <Link href="/" className="text-slate-900 hover:underline font-semibold">
          Try SaveNexa Downloader →
        </Link>
      </div>
    </article>
  );
}
