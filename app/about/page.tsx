import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Info, ShieldCheck, Zap, Lock, HardDrive, ArrowRight, Code } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Our Mission & Open Architecture',
  description: 'Learn about SaveNexa, our zero-account privacy philosophy, lightweight edge architecture, and mission to provide clean public web utilities.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About SaveNexa | Open Public Media Downloader Utility',
    description: 'SaveNexa is a clean, mobile-first web utility for saving public online media.',
    url: `${SITE_URL}/about`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'About', url: '/about' }]} />

      <SchemaOrg
        type="AboutPage"
        title="About SaveNexa"
        description="Learn about SaveNexa's architecture and public media utility mission."
        url={`${SITE_URL}/about`}
      />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Info className="w-3.5 h-3.5 text-emerald-600" />
          <span>About the Project</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About {SITE_NAME}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          SaveNexa is an open-source, mobile-first web utility engineered to make analyzing and saving publicly accessible online media fast, honest, and clutter-free.
        </p>
      </header>

      {/* What SaveNexa is and is not */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          What SaveNexa Is (and Is Not)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-emerald-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              What SaveNexa Is:
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• A lightweight URL analyzer for public video and audio streams.</li>
              <li>• A mobile-optimized web tool designed for fast one-handed use.</li>
              <li>• A privacy-first application that requires no login or account.</li>
              <li>• A transparent tool with clear format resolution and no deceptive buttons.</li>
            </ul>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-red-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              What SaveNexa Is NOT:
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Not a private account or paywall bypasser.</li>
              <li>• Not a permanent storage archive for third-party media files.</li>
              <li>• Not affiliated with Meta, TikTok, X, Reddit, or Pinterest.</li>
              <li>• Not an ad-cluttered spam site with deceptive pop-unders.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Architecture & Engineering Principles */}
      <section className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Code className="w-5 h-5 text-emerald-600" />
          Technical &amp; Privacy Philosophy
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Traditional video downloader websites are often filled with misleading ads, tracking pixels, and fake download buttons that confuse users. We built SaveNexa to demonstrate that utilities can be:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Ultra-Lightweight:</strong> Powered by static HTML and serverless edge functions for near-instant load times.</li>
            <li><strong>Zero Server Media Buffering:</strong> All media downloads stream directly from origin CDNs to your device, keeping latency low and bandwidth clean.</li>
            <li><strong>Strict Security:</strong> Hardened against Server-Side Request Forgery (SSRF), internal IP traversal, and malicious input.</li>
          </ul>
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Try SaveNexa Now</h3>
          <p className="text-xs text-slate-400">Save public media in seconds without registration.</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
        >
          Open Downloader
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
