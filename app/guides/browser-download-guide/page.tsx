import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Browser Video Download Troubleshooting & Tips — Chrome, Safari, Firefox',
  description: 'Learn how to troubleshoot browser video downloads, manage popups, bypass cross-origin restrictions, and save stream links smoothly.',
  alternates: {
    canonical: '/guides/browser-download-guide',
  },
  openGraph: {
    title: 'Browser Download Troubleshooting & Tips | SaveNexa',
    description: 'Fix common browser download issues across Chrome, Safari, Firefox, and Edge.',
    url: `${SITE_URL}/guides/browser-download-guide`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function BrowserDownloadGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Browser Download Guide', url: '/guides/browser-download-guide' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="Browser Video Download Troubleshooting & Tips"
        description="Comprehensive troubleshooting guide for browser file downloads."
        url={`${SITE_URL}/guides/browser-download-guide`}
      />

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Technical Guide</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Browser Download Troubleshooting &amp; Pro Tips
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Understanding browser security policies, MIME-type handling, and cross-origin download behaviors across Chrome, Safari, Edge, and Firefox.
        </p>
      </header>

      {/* Tip 1 */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          1. Understanding the HTML5 <code>download</code> Attribute vs. Cross-Origin Policy
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Under modern W3C security specifications, the HTML5 <code>download</code> attribute is only strictly enforced for <strong>same-origin</strong> requests.
          </p>
          <p>
            Because SaveNexa delivers media directly from source CDNs (e.g. TikTok, Meta, or Reddit CDN) to maximize your download speed and avoid server bottlenecks, your browser may open the stream in a native video tab instead of automatically triggering a file save dialog.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          2. How to Force Save on Any Desktop Browser
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            If a video opens in a new tab:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>Method A:</strong> Right-click on the video player in the new tab and select <strong>&quot;Save Video As...&quot;</strong>.</li>
            <li><strong>Method B:</strong> Press <strong>Ctrl + S</strong> (Windows/Linux) or <strong>Cmd + S</strong> (Mac) while on the video tab.</li>
            <li><strong>Method C:</strong> Right-click the Download button on SaveNexa and select <strong>&quot;Save Link As...&quot;</strong>.</li>
          </ul>
        </div>
      </section>

      {/* Tip 3 */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          3. Temporary CDN Link Expiration
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Many social platforms generate signed authentication tokens attached to their media URLs that expire after several minutes or hours.
          </p>
          <p>
            If you pause a download or wait too long before clicking save and receive a <code>403 Forbidden</code> or <code>Expired Token</code> error, simply return to SaveNexa and re-analyze the original public link to generate a fresh media stream signature.
          </p>
        </div>
      </section>

      <div className="pt-4 flex justify-between items-center text-xs">
        <Link href="/guides" className="text-slate-600 hover:text-slate-900 font-medium">
          ← Back to All Guides
        </Link>
        <Link href="/" className="text-slate-900 hover:underline font-semibold">
          Open SaveNexa Tool →
        </Link>
      </div>
    </article>
  );
}
