import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Image as ImageIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader — Save Video Pins Online',
  description: 'Download public Pinterest video pins, idea pins, and high-resolution clips directly in your browser without software or registration.',
  alternates: {
    canonical: '/pinterest-video-downloader',
  },
  openGraph: {
    title: 'Pinterest Video Downloader — Save Video Pins Online | SaveNexa',
    description: 'Save public Pinterest video pins and idea clips directly in high definition.',
    url: `${SITE_URL}/pinterest-video-downloader`,
  },
};

const pinterestFaqs = [
  {
    question: 'How do I download a video pin from Pinterest?',
    answer: 'Tap the three dots or Share button on the pin in the Pinterest app, select "Copy link", paste it into SaveNexa, and click "Analyze & Save Media".',
  },
  {
    question: 'Can I download idea pins and animated pins?',
    answer: 'Yes, public idea pins and animated GIF/MP4 pins with public delivery links can be analyzed and saved.',
  },
  {
    question: 'Are secret board pins downloadable?',
    answer: 'No. SaveNexa only processes publicly visible pins on public boards.',
  },
];

export default function PinterestDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'Pinterest Video Downloader', url: '/pinterest-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Pinterest Video Downloader for Public Links"
        description="Download public Pinterest video pins, idea pins, and clips directly in your browser."
        url={`${SITE_URL}/pinterest-video-downloader`}
        faqs={pinterestFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pinterest Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pinterest Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public Pinterest video pins, aesthetic clips, and idea pins directly in high-definition MP4.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Pinterest link (e.g. https://www.pinterest.com/pin/...)"
            defaultSampleUrl="https://www.pinterest.com/pin/123456789012345678/"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={pinterestFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/instagram-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Instagram Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tiktok-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>TikTok Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/online-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Direct Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
