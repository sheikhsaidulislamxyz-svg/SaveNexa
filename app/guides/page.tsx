import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Smartphone, Globe, ShieldCheck, Video, Film, Tv, MessageSquare } from 'lucide-react';
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
  },
};

const guideList = [
  {
    slug: '/how-to-download-tiktok-video',
    title: 'How to Download Public TikTok Videos',
    category: 'Platform Guide',
    description: 'Comprehensive step-by-step tutorial for downloading public TikTok videos to iOS and Android without watermarks.',
    readTime: '4 min read',
    icon: <Video className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-save-instagram-reels',
    title: 'How to Save Instagram Reels to Camera Roll',
    category: 'Platform Guide',
    description: 'Learn how to export public Instagram Reels with full original audio directly into your phone gallery.',
    readTime: '3 min read',
    icon: <Film className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-download-facebook-video',
    title: 'How to Download Facebook Videos & Watch Clips',
    category: 'Platform Guide',
    description: 'Walkthrough on copying Facebook video URLs and saving HD MP4 streams on desktop and mobile.',
    readTime: '3 min read',
    icon: <Tv className="w-5 h-5 text-emerald-600" />,
  },
  {
    slug: '/how-to-save-reddit-video',
    title: 'How to Save Reddit Videos with Synchronized Sound',
    category: 'Platform Guide',
    description: 'Understand Reddit’s v.redd.it DASH streaming format and how to download video files with audio tracks.',
    readTime: '4 min read',
    icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
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
        type="WebSite"
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
          Learn how to save media on any device, troubleshoot common mobile browser issues, and understand copyright principles.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guideList.map((guide) => (
          <Link
            key={guide.slug}
            href={guide.slug}
            className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  {guide.icon}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{guide.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readTime}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {guide.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
              <span>Read guide</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
