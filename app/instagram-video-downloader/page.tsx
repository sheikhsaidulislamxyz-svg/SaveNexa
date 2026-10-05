import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Instagram Video Downloader — Save Public Posts Online',
  description: 'Save available media from public Instagram posts and videos in your browser. Paste a link, analyze it, and download high-resolution MP4 video directly.',
  alternates: {
    canonical: '/instagram-video-downloader',
  },
  openGraph: {
    title: 'Instagram Video Downloader — Save Public Videos Online | SaveNexa',
    description: 'Save available media from public Instagram links in your browser without accounts or software.',
    url: `${SITE_URL}/instagram-video-downloader`,
  },
};

const instagramFaqs = [
  {
    question: 'How do I download a public Instagram video on my phone?',
    answer: 'Open the Instagram app, tap the three dots or Share icon on a public post, tap "Copy link", then paste the link into SaveNexa and tap "Analyze & Save Media".',
  },
  {
    question: 'Can I download videos from private Instagram accounts?',
    answer: 'No. SaveNexa strictly works with publicly accessible content. Private profiles and story content behind login cannot be accessed.',
  },
  {
    question: 'Are downloaded Instagram videos saved with sound/audio?',
    answer: 'Yes, SaveNexa resolves original MP4 video streams that include full synchronized audio tracks where available.',
  },
];

export default function InstagramDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs
        items={[{ name: 'Instagram Video Downloader', url: '/instagram-video-downloader' }]}
      />

      <SchemaOrg
        type="WebApplication"
        title="Instagram Video Downloader for Public Links"
        description="Save available media from public Instagram posts and videos in your browser without login."
        url={`${SITE_URL}/instagram-video-downloader`}
        faqs={instagramFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Camera className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instagram Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Instagram Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public Instagram post videos, carousels, and clips directly in high definition without installing extra apps.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste Instagram link (e.g. https://www.instagram.com/p/...)"
            defaultSampleUrl="https://www.instagram.com/p/B_sample_post_url/"
          />
        </div>
      </section>

      {/* Step by step instructions */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How to Download Public Instagram Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600">Step 1</div>
            <h3 className="font-bold text-slate-900 text-sm">Copy Instagram Link</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find a public video post on Instagram and copy its URL via the Share menu.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600">Step 2</div>
            <h3 className="font-bold text-slate-900 text-sm">Analyze Stream</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste the link into SaveNexa and let our engine resolve the direct source stream.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600">Step 3</div>
            <h3 className="font-bold text-slate-900 text-sm">Save to Gallery / Files</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click &quot;Save / Download&quot; to transfer the MP4 video directly to your storage.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={instagramFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Instagram Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/instagram-reels-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Instagram Reels Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/how-to-save-instagram-reels"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>How to Save Reels Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/facebook-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Facebook Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
