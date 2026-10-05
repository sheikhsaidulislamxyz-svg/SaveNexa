import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Direct Video Downloader — Save Online MP4, WebM, & Audio Links',
  description: 'Inspect and save direct online video files (.mp4, .webm, .mov, .m4v, .mp3) from any public server directly in your browser.',
  alternates: {
    canonical: '/online-video-downloader',
  },
  openGraph: {
    title: 'Direct Video Downloader — Save Online Video Files | SaveNexa',
    description: 'Inspect and download direct video files (.mp4, .webm, .mov) directly from your browser.',
    url: `${SITE_URL}/online-video-downloader`,
  },
};

const onlineFaqs = [
  {
    question: 'What file formats can I download directly?',
    answer: 'SaveNexa supports direct web video formats including .mp4, .webm, .mov, .m4v, .ogv, as well as audio files such as .mp3, .m4a, and .wav.',
  },
  {
    question: 'How does direct URL analysis work?',
    answer: 'When you paste a direct media URL, SaveNexa performs a lightweight HTTP HEAD inspection to verify content type, byte size, and accessibility before generating a clean download link.',
  },
  {
    question: 'Why does my direct link show an error?',
    answer: 'The link might be behind an authentication header, expire after a short time, or block external cross-origin requests. Verify that the URL can be opened directly in a private browser tab.',
  },
];

export default function OnlineVideoDownloaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'Direct Video Downloader', url: '/online-video-downloader' }]} />

      <SchemaOrg
        type="WebApplication"
        title="Direct Video Downloader for Online Media"
        description="Inspect and save direct online video files (.mp4, .webm, .mov, .m4v) directly in your browser."
        url={`${SITE_URL}/online-video-downloader`}
        faqs={onlineFaqs}
      />

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>Universal Direct Media Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Direct Video & Audio Downloader
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Inspect and download direct video files (.mp4, .webm, .mov) and audio streams from any public server directly in your browser.
        </p>

        <div className="pt-2">
          <DownloaderForm
            placeholderText="Paste direct media URL (e.g. https://example.com/video.mp4)"
            defaultSampleUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </div>
      </section>

      {/* Format Support */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Supported Media Containers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs font-bold text-slate-800">
            .MP4 (H.264/AAC)
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs font-bold text-slate-800">
            .WEBM (VP9/Opus)
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs font-bold text-slate-800">
            .MOV (QuickTime)
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs font-bold text-slate-800">
            .MP3 / .M4A
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={onlineFaqs} />
      </section>

      {/* Related Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Social Platform Downloaders
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/tiktok-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>TikTok Video Downloader</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/instagram-video-downloader"
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800"
          >
            <span>Instagram Downloader</span>
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
