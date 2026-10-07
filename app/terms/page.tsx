import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, AlertTriangle, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service & Usage Guidelines',
  description: 'Terms of Service and conditions for using SaveNexa public media download utility.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | SaveNexa',
    description: 'Terms of Service and responsible use guidelines for SaveNexa.',
    url: `${SITE_URL}/terms`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms' }]} />

      <SchemaOrg
        type="WebPage"
        title="Terms of Service | SaveNexa"
        description="Terms of service and user agreements for SaveNexa."
        url={`${SITE_URL}/terms`}
      />

      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Scale className="w-3.5 h-3.5 text-emerald-600" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 2026</p>
      </header>

      <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {SITE_NAME} (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Permitted Use &amp; Public Media Only</h2>
          <p>
            {SITE_NAME} is intended exclusively as a technical browser helper for analyzing publicly accessible online media streams. You agree:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-slate-600">
            <li>To only save content that you own, have explicit authorization to download, or that qualifies under applicable fair use laws.</li>
            <li>Not to use the Service to circumvent paywalls, access control mechanisms, digital rights management (DRM), or authentication requirements.</li>
            <li>Not to use automated scripts, botnets, or scrapers to flood our API endpoints.</li>
            <li>Not to attempt Server-Side Request Forgery (SSRF) or scan internal IP networks.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Disclaimer of Affiliation</h2>
          <p>
            {SITE_NAME} is an independent utility and is NOT affiliated with, endorsed by, sponsored by, or associated with TikTok, Meta Platforms (Instagram, Facebook), X Corp (Twitter), Reddit, Pinterest, or any other social platform.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Disclaimer of Warranties &amp; Limitation of Liability</h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. Platform compatibility may change at any time without notice. In no event shall {SITE_NAME} or its developers be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Service.
          </p>
        </div>
      </section>
    </article>
  );
}
