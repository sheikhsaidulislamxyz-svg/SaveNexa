import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Tv, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Facebook Video Downloader — Save Public Videos Online',
  description: 'Download public Facebook videos, watch clips, and FB reels in MP4 format directly in your browser without accounts or software.',
  alternates: {
    canonical: '/facebook-video-downloader',
  },
  openGraph: {
    title: 'Facebook Video Downloader — Save Public Videos Online | SaveNexa',
    description: 'Save public Facebook videos and watch streams directly to your phone or PC.',
    url: `${SITE_URL}/facebook-video-downloader`,
  },
};

const fbFaqs = [
  {
    question: 'How do I copy a public Facebook video link?',
    answer: 'On desktop, right-click the video and click "Copy video URL at current time" or copy the address bar URL. On mobile, tap Share > More options > Copy link.',
  },
  {
    question: 'Can I download private Facebook videos or private group posts?',
    answer: 'No. SaveNexa strictly analyzes publicly accessible content. Private group videos and restricted posts cannot be saved.',
  },
  {
    question: 'What video quality formats are supported?',
    answer: 'SaveNexa resolves available HD and SD MP4 streams provided by the Facebook public delivery network.',
  },
];

export default function FacebookDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs
        items={[{ name: 'Facebook Video Downloader', url: '/facebook-video-downloader' }]}
      />

      <SchemaOrg
        type="WebApplication"
        title="Facebook Video Downloader for Public Links"
        description="Download public Facebook videos, watch clips, and FB reels in MP4 format directly in your browser."
        url={`${SITE_URL}/facebook-video-downloader`}
        faqs={fbFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Tv className="w-3.5 h-3.5 text-emerald-600" />
          <span>Facebook Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Facebook Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public Facebook Watch videos, page posts, and public reels directly in standard MP4 format.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Facebook video URL (e.g. https://www.facebook.com/watch/?v=...)"
            defaultSampleUrl="https://www.facebook.com/watch/?v=10156382072120000"
          />
        </div>
      </section>

      {/* Instructions */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Supported Facebook Video Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Facebook Watch Videos</span>
            <code className="text-slate-600 break-all">https://www.facebook.com/watch/?v=123456789...</code>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Mobile & Short Links</span>
            <code className="text-slate-600 break-all">https://fb.watch/... / https://m.facebook.com/...</code>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={fbFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Tools & Guides
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/how-to-download-facebook-video"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Facebook Download Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tiktok-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>TikTok Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/reddit-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Reddit Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
