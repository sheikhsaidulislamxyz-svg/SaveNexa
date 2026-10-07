import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, Scale } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Copyright & DMCA Notice Procedures',
  description: 'Copyright and DMCA Takedown Notice procedures for SaveNexa. Learn how to report intellectual property concerns.',
  alternates: {
    canonical: '/copyright',
  },
  openGraph: {
    title: 'Copyright & DMCA Policy | SaveNexa',
    description: 'DMCA Takedown & Copyright Notice procedures for SaveNexa.',
    url: `${SITE_URL}/copyright`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function CopyrightPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs items={[{ name: 'Copyright & DMCA', url: '/copyright' }]} />

      <SchemaOrg
        type="WebPage"
        title="Copyright & DMCA Policy | SaveNexa"
        description="Copyright policy and DMCA takedown procedures for SaveNexa."
        url={`${SITE_URL}/copyright`}
      />

      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Intellectual Property</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Copyright &amp; DMCA Notice
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 2026</p>
      </header>

      <section className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Intellectual Property Compliance</h2>
          <p>
            {SITE_NAME} respects the intellectual property rights of authors, creators, and publishers. In accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512) and international copyright legislation, we respond promptly to notices of alleged copyright infringement.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Nature of Service</h2>
          <p>
            {SITE_NAME} is a client-side link resolution helper. We do not store, host, or archive third-party video or audio files on our servers. All media resolved by our tool is served directly from the public content delivery network of the respective host platform.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Filing a DMCA Notice</h2>
          <p>
            If you believe your copyrighted work is being accessed inappropriately via our tool or if you wish to request domain-level blocking, please send a written notification to our Designated Copyright Agent with the following details:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-600">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material or URL that is claimed to be infringing.</li>
            <li>Your contact information (name, physical address, telephone number, and email address).</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement made under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf.</li>
            <li>Your physical or electronic signature.</li>
          </ol>
        </div>

        <div className="p-5 bg-slate-100 rounded-2xl border border-slate-200 space-y-1 text-xs">
          <span className="font-bold text-slate-900 block">Designated DMCA Agent Contact:</span>
          <span className="text-slate-700">Email: dmca@savenexa.org</span>
        </div>
      </section>
    </article>
  );
}
