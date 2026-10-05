import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Scale, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Public Content, Copyright, and Fair Use Guide — SaveNexa',
  description: 'Understand the legal principles of downloading public online media, copyright ownership, fair use exceptions, and creator rights.',
  alternates: {
    canonical: '/guides/public-content-and-copyright',
  },
  openGraph: {
    title: 'Public Content, Copyright, and Fair Use Guide | SaveNexa',
    description: 'Guidelines on responsible media saving, fair use, and copyright compliance.',
    url: `${SITE_URL}/guides/public-content-and-copyright`,
  },
};

export default function PublicContentAndCopyrightGuidePage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Public Content & Copyright Guide', url: '/guides/public-content-and-copyright' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="Public Content, Copyright, and Fair Use Guide"
        description="Learn the fundamentals of copyright law, fair use doctrines, and responsible media downloading."
        url={`${SITE_URL}/guides/public-content-and-copyright`}
      />

      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Legal &amp; Policy</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>6 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Public Content, Copyright, and Fair Use: What You Need to Know
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A clear, practical overview of intellectual property principles, fair use provisions, and your responsibilities when saving online content.
        </p>
      </header>

      {/* Core Principle */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600" />
          1. Understanding Copyright in the Digital Era
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Whenever an author, videographer, or artist creates an original piece of work and fixes it in a tangible medium (such as recording a video or publishing an audio track), they automatically hold copyright protection under international intellectual property treaties (such as the Berne Convention).
          </p>
          <p>
            Even if a video is posted to a publicly accessible platform (such as TikTok, Instagram, YouTube, or Reddit), the creator retains their intellectual property rights. A video being &quot;publicly viewable&quot; does not automatically place it into the &quot;public domain.&quot;
          </p>
        </div>
      </section>

      {/* When is Downloading Permitted */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          2. When Are You Permitted to Save Media?
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            You are generally authorized to save and utilize media under the following conditions:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong>You Are the Creator:</strong> Backing up or archiving your own uploaded content, reels, or video clips across platforms.</li>
            <li><strong>Explicit Permission:</strong> You have received written or verbal consent from the copyright holder.</li>
            <li><strong>Open Licenses (Creative Commons):</strong> The content has been released under a Creative Commons (CC) license permitting personal reuse or distribution.</li>
            <li><strong>Public Domain Content:</strong> Works where copyright protection has expired or government works explicitly dedicated to the public domain.</li>
            <li><strong>Fair Use / Fair Dealing:</strong> Qualifying under statutory copyright exceptions such as commentary, criticism, news reporting, teaching, scholarship, or parody.</li>
          </ul>
        </div>
      </section>

      {/* What is Fair Use */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          3. The Four Factors of Fair Use
        </h2>
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Under US copyright law (17 U.S.C. § 107) and similar international doctrines, fair use is assessed using four statutory factors:
          </p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li><strong>Purpose and Character of the Use:</strong> Transformative uses (such as video critiques, educational breakdowns, or satire) favor fair use over commercial exploitation.</li>
            <li><strong>Nature of the Copyrighted Work:</strong> Factual or documentary works are more susceptible to fair use than highly creative fictional films.</li>
            <li><strong>Amount and Substantiality:</strong> Using a brief excerpt or clip is more likely to be fair use than copying an entire feature-length work.</li>
            <li><strong>Effect on the Potential Market:</strong> Does your use substitute for or harm the original creator&apos;s commercial market?</li>
          </ol>
        </div>
      </section>

      {/* SaveNexa's Boundary */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          SaveNexa&apos;s Policy &amp; DMCA Compliance
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          SaveNexa is a neutral technical utility designed exclusively to assist users with link analysis and browser downloads of publicly available content. SaveNexa does not host, mirror, or index private materials, nor does it bypass digital rights management (DRM) or access control paywalls.
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          For inquiries regarding copyright protection or takedown requests, please review our official <Link href="/copyright" className="font-semibold underline">Copyright &amp; DMCA Notice</Link>.
        </p>
      </section>

      <div className="pt-4 flex justify-between items-center text-xs">
        <Link href="/guides" className="text-slate-600 hover:text-slate-900 font-medium">
          ← Back to All Guides
        </Link>
        <Link href="/" className="text-slate-900 hover:underline font-semibold">
          Back to Downloader Tool →
        </Link>
      </div>
    </article>
  );
}
