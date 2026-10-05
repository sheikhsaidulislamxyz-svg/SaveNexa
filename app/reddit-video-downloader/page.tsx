import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Reddit Video Downloader — Save v.redd.it Videos with Sound',
  description: 'Download public Reddit videos (v.redd.it) and GIFs with synchronized audio streams directly in your browser without software.',
  alternates: {
    canonical: '/reddit-video-downloader',
  },
  openGraph: {
    title: 'Reddit Video Downloader — Save v.redd.it Videos Online | SaveNexa',
    description: 'Download Reddit videos with sound directly to your phone or desktop.',
    url: `${SITE_URL}/reddit-video-downloader`,
  },
};

const redditFaqs = [
  {
    question: 'How do I download Reddit videos with sound/audio?',
    answer: 'Reddit serves video (v.redd.it) and audio in separate streams. SaveNexa identifies both the high-definition video track and the synchronized audio stream so you can save both directly.',
  },
  {
    question: 'Can I download videos from private or NSFW subreddits?',
    answer: 'SaveNexa only analyzes public subreddit posts. Content behind private community walls cannot be fetched.',
  },
  {
    question: 'Does this support shortened redd.it and v.redd.it links?',
    answer: 'Yes, full reddit.com comments URLs, v.redd.it video links, and redd.it shortlinks are all supported.',
  },
];

export default function RedditDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'Reddit Video Downloader', url: '/reddit-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Reddit Video Downloader for Public Links"
        description="Download public Reddit videos (v.redd.it) and GIFs with audio streams directly in your browser."
        url={`${SITE_URL}/reddit-video-downloader`}
        faqs={redditFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reddit Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Reddit Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public Reddit videos (v.redd.it), clips, and audio tracks straight to your device in high resolution.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Reddit URL (e.g. https://www.reddit.com/r/.../comments/...)"
            defaultSampleUrl="https://www.reddit.com/r/videos/comments/123456/sample_video/"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={redditFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Tools & Guides
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/how-to-save-reddit-video"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Reddit Download Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/x-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>X (Twitter) Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tiktok-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>TikTok Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
