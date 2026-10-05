import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy — SaveNexa',
  description: 'SaveNexa Privacy Policy. We do not require accounts, do not store download history, and do not archive user media on our servers.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | SaveNexa',
    description: 'Privacy Policy for SaveNexa public media downloader.',
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy' }]} />

      <SchemaOrg
        type="WebSite"
        title="Privacy Policy | SaveNexa"
        description="Privacy policy and zero-tracking commitment of SaveNexa."
        url={`${SITE_URL}/privacy`}
      />

      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacy First</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 2026</p>
      </header>

      <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Overview and Core Privacy Commitment</h2>
          <p>
            {SITE_NAME} is built with a strict privacy-first architecture. We do not require you to create an account, register your email address, or provide any personal identification information to use our public media analysis and download utility.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. No Media or URL Storage</h2>
          <p>
            When you submit a URL for analysis:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-600">
            <li>We do not record or save your submitted URL to a persistent database.</li>
            <li>We do not store, mirror, or cache the downloaded media files on our servers.</li>
            <li>Media files are streamed directly between the origin platform&apos;s public CDN and your browser.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. In-Memory Security &amp; Rate Limiting</h2>
          <p>
            To protect our server infrastructure from automated scraping and abuse, our servers maintain short-lived, in-memory rate limiting counters (cleared every few minutes). These counters are not linked to individual user profiles or persistent trackers.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party CDN Content</h2>
          <p>
            When you initiate a media download, your browser requests the file directly from the content delivery network of the source platform (e.g., TikTok, Meta, Reddit). Your interaction with those networks is governed by the respective platform&apos;s terms and privacy policies.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Us</h2>
          <p>
            If you have questions about our privacy practices, please contact us at <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">privacy@savenexa.org</code> or visit our <Link href="/contact" className="underline font-medium">Contact Page</Link>.
          </p>
        </div>
      </section>
    </article>
  );
}
