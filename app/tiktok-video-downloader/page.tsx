import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Video, ShieldCheck, Smartphone, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'TikTok Video Downloader — Save Public Videos Online',
  description: 'Save available media from public TikTok links in your browser. Paste a link, analyze it, and choose an available download option without watermark or login.',
  alternates: {
    canonical: '/tiktok-video-downloader',
  },
  openGraph: {
    title: 'TikTok Video Downloader — Save Public Videos Online | SaveNexa',
    description: 'Save available media from public TikTok links in your browser without accounts or software.',
    url: `${SITE_URL}/tiktok-video-downloader`,
  },
};

const tiktokFaqs = [
  {
    question: 'How do I download a public TikTok video on iPhone/iOS?',
    answer: 'Copy the video link in the TikTok app by tapping Share > Copy Link. Paste it into SaveNexa in Safari, tap Analyze & Save Media, and tap Download. Safari will prompt you to download the file to your Files app.',
  },
  {
    question: 'Can I download private TikTok videos or drafts?',
    answer: 'No. SaveNexa only resolves publicly accessible media. Private posts, friends-only videos, and deleted content cannot be analyzed.',
  },
  {
    question: 'Does this tool remove TikTok watermarks?',
    answer: 'SaveNexa resolves the direct original media streams provided by the public content delivery network. When high-definition direct streams are available from the source, they are presented in the options list.',
  },
  {
    question: 'Can I extract audio or MP3 from TikTok videos?',
    answer: 'Yes, when audio tracks are available as independent streams, SaveNexa provides an audio download option alongside the video formats.',
  },
];

export default function TikTokDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs
        items={[{ name: 'TikTok Video Downloader', url: '/tiktok-video-downloader' }]}
      />

      <SchemaOrg
        type="WebApplication"
        title="TikTok Video Downloader for Public Links"
        description="Save available media from public TikTok links in your browser. Paste a link, analyze it, and choose an available download option."
        url={`${SITE_URL}/tiktok-video-downloader`}
        faqs={tiktokFaqs}
      />

      {/* Header & Tool Box */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Video className="w-3.5 h-3.5 text-emerald-600" />
          <span>TikTok Public Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          TikTok Video Downloader for Public Links
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Save public TikTok videos, clips, and sound streams directly to your phone or computer. No software or login needed.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste TikTok link (e.g. https://www.tiktok.com/@user/video/...)"
            defaultSampleUrl="https://www.tiktok.com/@tiktok/video/7106594312292453678"
          />
        </div>
      </section>

      {/* Supported Link Formats */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Supported TikTok URL Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Standard Web Links</span>
            <code className="text-slate-600 break-all">https://www.tiktok.com/@username/video/123456789...</code>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-900 block mb-1">Mobile Short Links</span>
            <code className="text-slate-600 break-all">https://vm.tiktok.com/ZM8x... / https://vt.tiktok.com/...</code>
          </div>
        </div>
      </section>

      {/* Step by step instructions */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          How to Download Public TikTok Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600">Step 1</div>
            <h3 className="font-bold text-slate-900 text-sm">Copy Link</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open the TikTok app or website, tap Share on any public video, and select &quot;Copy Link&quot;.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600">Step 2</div>
            <h3 className="font-bold text-slate-900 text-sm">Paste & Analyze</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paste the link in SaveNexa and tap &quot;Analyze & Save Media&quot; to inspect available streams.
            </p>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-600">Step 3</div>
            <h3 className="font-bold text-slate-900 text-sm">Download File</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click &quot;Save / Download&quot; to save the MP4 video directly into your browser download folder.
            </p>
          </div>
        </div>
      </section>

      {/* Troubleshooting & Legal */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Common Issues & Tips
        </h2>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li><strong>Private Accounts:</strong> If the creator’s profile or post is private, SaveNexa cannot resolve the video stream.</li>
          <li><strong>iOS Safari Download:</strong> If the video plays in full screen instead of downloading, long-press the Download button and select &quot;Download Linked File&quot;.</li>
          <li><strong>Fair Use:</strong> Save only content you have permission to download. Respect creator copyright and terms of service.</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={tiktokFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Media Downloaders
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
            href="/how-to-download-tiktok-video"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>TikTok Download Guide</span>
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
