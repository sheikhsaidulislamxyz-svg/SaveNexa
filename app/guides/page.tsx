import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Smartphone, Globe, ShieldCheck, Video, Film, Tv, MessageSquare, Share2, Bookmark } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Guides & Tutorials — Public Media Download Knowledge Base',
  description: 'Step-by-step guides for downloading and saving public videos, audio, and reels on iPhone, Android, Chrome, and Safari, plus copyright and fair use information.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'Guides & Tutorials — Public Media Download Knowledge Base | SaveNexa',
    description: 'Learn how to save public media on any mobile or desktop device with SaveNexa guides.',
    url: `${SITE_URL}/guides`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const platformGuides = [
  {
    slug: '/how-to-download-tiktok-video',
    title: 'How to Download Public TikTok Videos',
    category: 'TikTok Guide',
    description: 'Comprehensive step-by-step tutorial for downloading public TikTok videos to iOS and Android without watermarks.',
    readTime: '4 min read',
    icon: <Video className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-save-instagram-reels',
    title: 'How to Save Instagram Reels to Camera Roll',
    category: 'Instagram Guide',
    description: 'Learn how to export public Instagram Reels with full original audio directly into your phone gallery.',
    readTime: '3 min read',
    icon: <Film className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-download-facebook-video',
    title: 'How to Download Facebook Videos & Watch Clips',
    category: 'Facebook Guide',
    description: 'Walkthrough on copying Facebook video URLs and saving HD MP4 streams on desktop and mobile.',
    readTime: '3 min read',
    icon: <Tv className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-save-reddit-video',
    title: 'How to Save Reddit Videos with Synchronized Sound',
    category: 'Reddit Guide',
    description: 'Understand Reddit’s v.redd.it DASH streaming format and how to download video files with audio tracks.',
    readTime: '4 min read',
    icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-download-x-twitter-videos',
    title: 'How to Download X (Twitter) Videos & GIFs',
    category: 'X / Twitter Guide',
    description: 'Tutorial on extracting original HD MP4 video streams and looping animations from public X/Twitter posts.',
    readTime: '4 min read',
    icon: <Share2 className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-download-pinterest-videos',
    title: 'How to Download Pinterest Video Pins',
    category: 'Pinterest Guide',
    description: 'Step-by-step guide to saving public video Pins and animated idea clips to your phone or computer.',
    readTime: '4 min read',
    icon: <Bookmark className="w-5 h-5 text-emerald-600" />,
  },
];

const generalGuides = [
  {
    slug: '/guides/download-videos-without-app',
    title: 'How to Download Videos Without an App',
    category: 'Device & Safety',
    description: 'Save social media videos directly in Safari and Chrome without installing third-party apps or APKs.',
    readTime: '5 min read',
    icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/guides/why-video-downloads-fail',
    title: 'Why Online Video Downloads Fail & How to Fix Them',
    category: 'Troubleshooting',
    description: 'Diagnose and fix common download errors: private accounts, expired CDN tokens, split DASH audio, and region gates.',
    readTime: '5 min read',
    icon: <Globe className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/guides/phone-video-download-guide',
    title: 'Mobile Video Download Guide (iPhone & Android)',
    category: 'Device Guide',
    description: 'Mastering mobile file management: how Safari Download Manager and Chrome handle MP4 downloads.',
    readTime: '5 min read',
    icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/guides/browser-download-guide',
    title: 'Browser Download Troubleshooting & Tips',
    category: 'Browser Guide',
    description: 'What to do when videos play in a tab instead of downloading, long-press gestures, and CORS tips.',
    readTime: '4 min read',
    icon: <Globe className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/guides/public-content-and-copyright',
    title: 'Public Content, Copyright, and Fair Use Guide',
    category: 'Legal & Policy',
    description: 'An essential guide on responsible downloading, copyright compliance, fair use boundaries, and creator permissions.',
    readTime: '6 min read',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      <Breadcrumbs items={[{ name: 'Guides', url: '/guides' }]} />

      <SchemaOrg
        type="WebPage"
        title="Guides & Tutorials | SaveNexa"
        description="Comprehensive guides for saving public videos and audio on any platform."
        url={`${SITE_URL}/guides`}
      />

      <header className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Guides &amp; Step-by-Step Tutorials
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Clear, honest instructions for saving public media on mobile and desktop browsers, plus file management and copyright guidance.
        </p>
      </header>

      {/* Section 1: Platform-Specific Guides */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900">Platform Download Guides</h2>
          <span className="text-xs text-slate-500 font-medium">6 Guides</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platformGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.slug}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    {guide.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {guide.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 pt-2 border-t border-slate-100">
                <span>{guide.readTime}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Tutorial <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 2: General & Device Guides */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900">Device &amp; Browser Guides</h2>
          <span className="text-xs text-slate-500 font-medium">3 Guides</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generalGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={guide.slug}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    {guide.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {guide.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 pt-2 border-t border-slate-100">
                <span>{guide.readTime}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="p-8 bg-slate-900 text-white rounded-3xl text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to Save Public Media?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          No registrations or software downloads required. Paste your public link to start.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-colors"
          >
            <span>Open SaveNexa Downloader</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
