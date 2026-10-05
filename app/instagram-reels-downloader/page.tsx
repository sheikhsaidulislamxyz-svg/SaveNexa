import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Film, ArrowRight, Smartphone, CheckCircle } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader — Save Public Reels Online',
  description: 'Download public Instagram Reels with high-definition MP4 video and audio streams directly in your browser without watermarks or login.',
  alternates: {
    canonical: '/instagram-reels-downloader',
  },
  openGraph: {
    title: 'Instagram Reels Downloader — Save Public Reels Online | SaveNexa',
    description: 'Save public Instagram Reels directly in your browser with high audio/video quality.',
    url: `${SITE_URL}/instagram-reels-downloader`,
  },
};

const reelsFaqs = [
  {
    question: 'How do I download an Instagram Reel in HD?',
    answer: 'Copy the Reel link from the Instagram app (Share > Copy link), paste it into the search box above, and select the High Resolution MP4 option.',
  },
  {
    question: 'Does this save the original background music or audio track?',
    answer: 'Yes, SaveNexa resolves full composite video files with the original audio included in the MP4 stream.',
  },
  {
    question: 'Why did an Instagram Reel fail to analyze?',
    answer: 'Reels from private accounts or restricted profiles cannot be accessed without credentials. Make sure the Reel is from a public creator account.',
  },
];

export default function InstagramReelsDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Instagram Downloader', url: '/instagram-video-downloader' },
          { name: 'Instagram Reels Downloader', url: '/instagram-reels-downloader' },
        ]}
      />

      <SchemaOrg
        type="WebApplication"
        title="Instagram Reels Downloader for Public Links"
        description="Download public Instagram Reels with high-definition MP4 video and audio streams directly in your browser."
        url={`${SITE_URL}/instagram-reels-downloader`}
        faqs={reelsFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Film className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instagram Reels Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Instagram Reels Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public Instagram Reels with original audio and video quality straight to your mobile or desktop device.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Instagram Reel link (e.g. https://www.instagram.com/reel/...)"
            defaultSampleUrl="https://www.instagram.com/reel/Csample_reel_url/"
          />
        </div>
      </section>

      {/* Guide Links & Steps */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">How to Save Instagram Reels on Any Phone</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
            <span className="font-semibold text-slate-900">iPhone / iOS (Safari)</span>
            <p>Paste the Reel link, click Analyze, and tap Download. Safari will save the video to your Files app, where you can tap &quot;Save Video&quot; to export to Photos.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl space-y-1.5 border border-slate-100">
            <span className="font-semibold text-slate-900">Android (Chrome)</span>
            <p>Paste the Reel link and tap Download. Chrome will automatically download the MP4 file to your Downloads folder and Gallery.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={reelsFaqs} />
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
            <span>Instagram Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/how-to-save-instagram-reels"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Full Reels Tutorial Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/tiktok-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>TikTok Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
