import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Share2, ArrowRight, ShieldCheck } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'X (Twitter) Video Downloader — Save Public Posts Online',
  description: 'Download public videos, GIFs, and media attachments from X (formerly Twitter) directly in your browser. Fast, free, and secure.',
  alternates: {
    canonical: '/x-video-downloader',
  },
  openGraph: {
    title: 'X (Twitter) Video Downloader — Save Public Media Online | SaveNexa',
    description: 'Download public videos, GIFs, and media from X / Twitter directly to your phone or desktop.',
    url: `${SITE_URL}/x-video-downloader`,
  },
};

const xFaqs = [
  {
    question: 'How do I save a video or GIF from X (Twitter)?',
    answer: 'Tap the Share button on any public tweet/post, tap "Copy link", paste it into SaveNexa, and tap "Analyze & Save Media" to download the MP4 file.',
  },
  {
    question: 'Can I download videos from private or protected accounts on X?',
    answer: 'No. Protected tweets and private posts are restricted and cannot be analyzed.',
  },
  {
    question: 'Does this convert Twitter GIFs to video?',
    answer: 'Yes. On X/Twitter, animations and GIFs are delivered as looping MP4 video streams, which SaveNexa resolves directly.',
  },
];

export default function XDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'X (Twitter) Downloader', url: '/x-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="X (Twitter) Video Downloader for Public Links"
        description="Download public videos, GIFs, and media attachments from X (formerly Twitter) directly in your browser."
        url={`${SITE_URL}/x-video-downloader`}
        faqs={xFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Share2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>X / Twitter Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          X (Twitter) Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public video clips, GIFs, and media attachments from X (formerly Twitter) straight to your device.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste X / Twitter URL (e.g. https://x.com/.../status/...)"
            defaultSampleUrl="https://x.com/Twitter/status/1234567890123456789"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={xFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/reddit-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Reddit Video Downloader</span>
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
