import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact & Support Team',
  description: 'Get in touch with the SaveNexa team for general feedback, provider bug reports, and copyright inquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Support | SaveNexa',
    description: 'Contact SaveNexa for technical support and copyright notices.',
    url: `${SITE_URL}/contact`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'Contact', url: '/contact' }]} />

      <SchemaOrg
        type="ContactPage"
        title="Contact SaveNexa"
        description="Contact information and support for SaveNexa."
        url={`${SITE_URL}/contact`}
      />

      <header className="space-y-4 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Mail className="w-3.5 h-3.5 text-emerald-600" />
          <span>Support &amp; Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact the SaveNexa Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Have an issue with a public URL, feedback on mobile usability, or a DMCA copyright inquiry? Reach out below.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Technical Support &amp; Bugs</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            If a supported platform recently changed its public structure or an error occurred during stream resolution, submit a bug report.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-800">
            support@savenexa.org
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Copyright &amp; DMCA Agent</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For intellectual property queries, domain removal requests, or DMCA compliance notices, please review our DMCA policy.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-800">
            dmca@savenexa.org
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600 leading-relaxed">
        <strong className="text-slate-900 font-semibold block">Response Time Notice:</strong>
        We aim to respond to technical inquiries within 1–2 business days. For urgent copyright requests, please ensure all statutory information required under the DMCA is provided as outlined on our <Link href="/copyright" className="underline font-medium">Copyright Policy</Link> page.
      </div>
    </div>
  );
}
