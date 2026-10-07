import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Bookmark, CheckCircle, Smartphone, Laptop, ArrowRight, ShieldCheck, HelpCircle, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Download Pinterest Videos Step-by-Step Guide',
  description: 'Step-by-step tutorial on how to copy and save public Pinterest video pins and idea clips on iPhone, Android, Mac, and Windows in full HD MP4 format.',
  alternates: {
    canonical: '/how-to-download-pinterest-videos',
  },
  openGraph: {
    title: 'How to Download Pinterest Videos Step-by-Step Guide | SaveNexa',
    description: 'Learn how to download and save public Pinterest video pins and idea clips directly to your phone or desktop in HD MP4.',
    url: `${SITE_URL}/how-to-download-pinterest-videos`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

const pinterestGuideFaqs = [
  {
    question: 'How do I save a Pinterest video to my iPhone camera roll?',
    answer: 'In the Pinterest app, tap the Share icon on any video Pin and select "Copy link". Open Safari, go to SaveNexa Pinterest Downloader, paste the link, and tap Download. Safari saves the MP4 file to your Files app. In the Files app, open the video, tap Share, and select "Save Video" to move it into your Photos library.',
  },
  {
    question: 'Does SaveNexa work with shortened pin.it links?',
    answer: 'Yes. SaveNexa automatically follows and resolves shortened mobile share URLs (e.g., https://pin.it/...) as well as full standard https://www.pinterest.com/pin/... links.',
  },
  {
    question: 'Can I download private Pins or secret boards?',
    answer: 'No. SaveNexa only analyzes publicly visible Pinterest content. Secret boards, private collaboration folders, and archived Pins are protected by account authorization and cannot be accessed.',
  },
  {
    question: 'What video quality does SaveNexa extract from Pinterest?',
    answer: 'SaveNexa extracts the original source resolution uploaded by the creator, including 1080p Full HD and 720p HD MP4 video streams with synchronized AAC audio.',
  },
];

export default function HowToDownloadPinterestVideosPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'How to Download Pinterest Videos', url: '/how-to-download-pinterest-videos' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="How to Download Pinterest Videos Step-by-Step Guide"
        description="Learn how to save public Pinterest video pins and idea clips on iPhone, Android, Mac, and Windows."
        url={`${SITE_URL}/how-to-download-pinterest-videos`}
      />

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="text-emerald-600 font-bold uppercase tracking-wider">Platform Tutorial</span>
          <span aria-hidden="true">·</span>
          <span>Updated October 2026</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          How to Download Public Pinterest Video Pins to Any Device
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A step-by-step walkthrough for saving video Pins, craft tutorials, recipe clips, and animated idea Pins directly to your mobile phone or computer.
        </p>
      </header>

      {/* Quick Summary Callout */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
        <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Quick Summary
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
          Tap <strong>Share &gt; Copy link</strong> on any public Pinterest video Pin, paste the URL into SaveNexa’s <Link href="/pinterest-video-downloader" className="font-semibold underline hover:text-emerald-700">Pinterest Video Downloader</Link>, click <strong>Analyze & Save Media</strong>, and tap <strong>Download</strong> to save the high-resolution MP4 file directly to your files or gallery.
        </p>
      </div>

      {/* Step 1: Copying the Link */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          1. How to Copy a Public Pinterest Video URL
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Pinterest allows copying share links from both the mobile application and desktop browser:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc list-inside bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <li><strong>From the Pinterest Mobile App (iOS / Android):</strong> Open the video Pin, tap the <strong>Share / Send</strong> icon (or the three dots menu in the top right), and tap <strong>Copy link</strong>.</li>
          <li><strong>From Desktop Web Browser:</strong> Navigate to the Pin, copy the full URL from your browser&apos;s address bar (e.g., <code>https://www.pinterest.com/pin/123456789/</code>), or click the Share icon and select <strong>Copy Link</strong>.</li>
          <li><strong>Shortlinks (pin.it):</strong> Shortened URLs generated by the Pinterest mobile app (e.g., <code>https://pin.it/...</code>) are automatically parsed and resolved.</li>
        </ul>
      </section>

      {/* Step 2: Device-Specific Instructions */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          2. Step-by-Step Instructions by Device
        </h2>

        {/* iOS */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>iPhone & iPad (iOS Safari)</span>
          </div>
          <ol className="text-xs sm:text-sm text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Copy the link to the public video Pin from Pinterest.</li>
            <li>Open <strong>Safari</strong> and visit the <Link href="/pinterest-video-downloader" className="text-emerald-600 font-medium hover:underline">SaveNexa Pinterest Downloader</Link>.</li>
            <li>Paste the URL into the search box and tap <strong>Analyze & Save Media</strong>.</li>
            <li>Tap <strong>Download</strong> on the high-definition MP4 stream.</li>
            <li>When Safari prompts you with a download confirmation, tap <strong>Download</strong>.</li>
            <li>Open the <strong>Files</strong> app on your iPhone, locate the video in the <strong>Downloads</strong> folder, tap the <strong>Share</strong> icon, and select <strong>Save Video</strong> to transfer it into Photos.</li>
          </ol>
        </div>

        {/* Android */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Android (Chrome, Firefox, or Samsung Internet)</span>
          </div>
          <ol className="text-xs sm:text-sm text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>In the Pinterest app, tap <strong>Share &gt; Copy link</strong> on the video Pin.</li>
            <li>Open your mobile browser, go to SaveNexa, and paste the URL.</li>
            <li>Tap <strong>Analyze & Save Media</strong>.</li>
            <li>Tap <strong>Download</strong> to save the MP4 video directly to your device storage.</li>
            <li>The video will appear immediately in your device&apos;s Downloads folder and Photo Gallery.</li>
          </ol>
        </div>

        {/* Desktop PC/Mac */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Laptop className="w-4 h-4 text-emerald-600" />
            <span>Windows PC & Mac Desktop</span>
          </div>
          <ol className="text-xs sm:text-sm text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Copy the Pin URL from your browser address bar.</li>
            <li>Paste the link into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
            <li>Select your preferred MP4 video resolution to save the file straight to your computer drive.</li>
          </ol>
        </div>
      </section>

      {/* Section 3: Understanding Video Pins vs Idea Pins */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          3. Understanding Video Pins & Multi-Page Idea Pins
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Pinterest hosts both single standalone video Pins and multi-page Idea Pins. When analyzing an Idea Pin containing video elements, SaveNexa resolves the primary high-definition video track in standard MP4 container format, ensuring smooth offline playback on any media player.
        </p>
      </section>

      {/* Section 4: Troubleshooting & Limitations */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          4. Troubleshooting & Common Questions
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs sm:text-sm text-amber-900/90">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Secret Boards & Restricted Collections</span>
            </div>
            <p>SaveNexa only fetches content from public boards. Pins stored inside Secret Boards, private group boards, or accounts requiring login authorization cannot be accessed.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-xs sm:text-sm text-slate-700">
            <div className="font-bold text-slate-900">Static Image Pins vs Video Pins</div>
            <p>If a Pin contains only static photography or illustrations rather than an animated/video media stream, SaveNexa will report that no video track was detected.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Responsible Use & Copyright */}
      <section className="p-5 bg-slate-100 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Responsible Archival & Fair Use Notice</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          SaveNexa is designed for personal archival and offline viewing of publicly accessible media. Please respect content creator copyrights and do not re-upload or commercially distribute downloaded Pinterest media without permission. Learn more in our <Link href="/guides/public-content-and-copyright" className="text-emerald-600 font-medium hover:underline">Public Content & Copyright Guide</Link>.
        </p>
      </section>

      {/* Direct CTA */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-base text-white">Ready to Save a Pinterest Video?</div>
          <div className="text-xs text-slate-400">Paste your Pin URL into our free browser downloader.</div>
        </div>
        <Link
          href="/pinterest-video-downloader"
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Open Pinterest Downloader</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={pinterestGuideFaqs} />
      </section>

      {/* Related Guides & Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Guides & Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/how-to-save-instagram-reels"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>How to Save Instagram Reels</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/how-to-download-x-twitter-videos"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>How to Download X / Twitter Videos</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/guides/phone-video-download-guide"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>Mobile File Management Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </section>
    </article>
  );
}
