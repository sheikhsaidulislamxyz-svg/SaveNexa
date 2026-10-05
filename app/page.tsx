import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
  Lock,
  HardDrive,
  FileQuestion,
  Layers,
  ArrowRight
} from 'lucide-react';
import DownloaderForm from '@/components/DownloaderForm';
import PlatformCard from '@/components/PlatformCard';
import FaqAccordion from '@/components/FaqAccordion';
import AdSlot from '@/components/AdSlot';
import SchemaOrg from '@/components/SchemaOrg';
import { SUPPORTED_PLATFORMS, SITE_NAME } from '@/lib/constants';

const homeFaqs = [
  {
    question: 'How do I download a public video or audio file?',
    answer:
      'Simply copy the public link from TikTok, Instagram, Facebook, X, Reddit, or Pinterest, paste it into the search box above, and click "Analyze & Save Media". Once the source is resolved, choose your preferred format to save it directly to your device.',
  },
  {
    question: 'Do I need an account, login, or app installation?',
    answer:
      'No. SaveNexa is 100% free and open to use without registering, logging in, or installing any third-party browser extensions or mobile applications.',
  },
  {
    question: 'Does SaveNexa work on iPhone, iPad, and Android?',
    answer:
      'Yes. SaveNexa is built mobile-first. On Android (Chrome), taps trigger native browser file downloads. On iOS (Safari), taps open the stream or prompt the Safari Download Manager directly.',
  },
  {
    question: 'Does SaveNexa store my downloaded videos or personal data on a server?',
    answer:
      'No. SaveNexa does not host, store, or archive downloaded media on any server database. Analysis streams are resolved in real-time and served directly from the original public content delivery network (CDN).',
  },
  {
    question: 'Why did my link fail to analyze?',
    answer:
      'The video may be from a private account, deleted by the author, restricted by region or age, or the platform HTML structure might have changed. Please verify that the link opens publicly in an incognito browser window.',
  },
  {
    question: 'What content am I allowed to save?',
    answer:
      'You must only save media that you own, have explicit creator permission to download, or that falls under legal public domain / fair use guidelines. SaveNexa strictly complies with copyright protection laws.',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SchemaOrg
        type="WebApplication"
        title="Download Public Videos & Media Online | SaveNexa"
        description="Paste a supported public link. Save available video, audio, image, or file formats directly from your browser without accounts or software."
        faqs={homeFaqs}
      />

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fast, Free Public Media Downloader</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
            Download Public Videos & Media Online
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
            Paste a supported public media link. Save available video, audio, image, or file formats directly from your browser.
          </p>

          {/* Interactive Downloader Island */}
          <div className="pt-2">
            <DownloaderForm defaultSampleUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
          </div>

          {/* Microcopy Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No account required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No app installation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Public links only</span>
            </div>
          </div>
        </div>
      </section>

      <AdSlot slot="hero-below-tool" className="max-w-4xl mx-auto px-4" />

      {/* Section A: Supported Platforms Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Supported Social Platforms
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select a dedicated platform tool below for platform-specific guides, formats, and mobile instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPPORTED_PLATFORMS.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </section>

      {/* Section B: How It Works */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How to Save Public Media in 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              SaveNexa is designed to be instantaneous on desktop, tablet, and mobile browsers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Copy Public Link',
                description: 'Find a public video or post on TikTok, Instagram, X, Facebook, Reddit, or Pinterest and copy the share link.',
              },
              {
                step: '02',
                title: 'Paste into SaveNexa',
                description: 'Paste the copied URL into the single input box at the top of this page.',
              },
              {
                step: '03',
                title: 'Analyze Media',
                description: 'Click "Analyze & Save Media" to resolve real-time streams and metadata directly from the source.',
              },
              {
                step: '04',
                title: 'Save to Device',
                description: 'Choose your desired format (HD video, standard MP4, or audio) and download it straight to your files.',
              },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative">
                <div className="text-xs font-mono font-bold text-emerald-600">
                  Step {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: Why SaveNexa */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Use SaveNexa?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered with a focus on speed, privacy, transparent limitations, and mobile convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mobile-First Touch Ergonomics</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tailored specifically for one-handed thumb interaction with instant clipboard paste buttons and clean mobile sheets.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Accounts & Zero Tracking</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No login barriers, no registration forms, and no database tracking your download history or personal identifiers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <HardDrive className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct CDN Streaming</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Streams are fetched directly from original content distribution networks without buffering heavy media through intermediary servers.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Callout Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Educational Resources
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Need Help Saving Media on iPhone or Android?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Read our step-by-step mobile guides for Safari, Chrome, and desktop browsers, along with copyright & fair use fundamentals.
            </p>
          </div>
          <Link
            href="/guides"
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm rounded-xl inline-flex items-center gap-2 transition-transform active:scale-95 shrink-0"
          >
            Explore All Guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section E: FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Common questions about downloading public media with SaveNexa.
          </p>
        </div>

        <FaqAccordion items={homeFaqs} />
      </section>
    </div>
  );
}
