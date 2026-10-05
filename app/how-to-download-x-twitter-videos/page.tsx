import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, CheckCircle, Smartphone, Laptop, ArrowRight, ShieldCheck, HelpCircle, AlertCircle, Share2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import SchemaOrg from '@/components/SchemaOrg';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How to Download X (Twitter) Videos Step-by-Step Guide',
  description: 'Detailed tutorial on how to copy and save public videos and GIFs from X (formerly Twitter) on iPhone, Android, Mac, and Windows without software or apps.',
  alternates: {
    canonical: '/how-to-download-x-twitter-videos',
  },
  openGraph: {
    title: 'How to Download X (Twitter) Videos Step-by-Step Guide | SaveNexa',
    description: 'Complete walkthrough for saving public X / Twitter videos and GIFs directly to your mobile camera roll or computer files.',
    url: `${SITE_URL}/how-to-download-x-twitter-videos`,
  },
};

const guideFaqs = [
  {
    question: 'How do I save an X / Twitter video directly to iPhone Photos?',
    answer: 'Copy the post link from the X app, paste it into SaveNexa in Safari, and tap Download. Safari saves the MP4 file to your Files app (Downloads folder). In the Files app, tap the video, tap the Share icon in the bottom-left corner, and select "Save Video" to move it into your Photos library.',
  },
  {
    question: 'Why do Twitter GIFs download as MP4 video files?',
    answer: 'On X/Twitter, animations and GIFs are delivered by their CDN as lightweight, looping MP4 video streams rather than traditional heavy .gif image files. SaveNexa extracts the original high-frame-rate MP4 video stream directly.',
  },
  {
    question: 'Can I download videos from private or protected accounts on X?',
    answer: 'No. Protected accounts, subscriber-only tweets, and restricted community posts are shielded by privacy controls and cannot be fetched by SaveNexa.',
  },
  {
    question: 'What should I do if SaveNexa says "No Media Found"?',
    answer: 'Ensure the link points directly to a post containing a native video attachment or GIF. Text-only posts, links pointing to external websites (like YouTube or news articles), and deleted tweets will return a No Media Found status.',
  },
];

export default function HowToDownloadXTwitterVideosPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'How to Download X (Twitter) Videos', url: '/how-to-download-x-twitter-videos' },
        ]}
      />

      <SchemaOrg
        type="Article"
        title="How to Download X (Twitter) Videos Step-by-Step Guide"
        description="Learn how to save public X (Twitter) videos and GIFs on iPhone, Android, Mac, and Windows."
        url={`${SITE_URL}/how-to-download-x-twitter-videos`}
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
          How to Download Public X (Twitter) Videos & GIFs to Any Device
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A step-by-step walkthrough for extracting original high-definition MP4 video streams and looping animations from public X (formerly Twitter) posts.
        </p>
      </header>

      {/* Quick Summary Callout */}
      <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
        <h2 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Quick Summary
        </h2>
        <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
          Tap <strong>Share &gt; Copy link</strong> on any public post on X, paste the URL into SaveNexa’s <Link href="/x-video-downloader" className="font-semibold underline hover:text-emerald-700">X Video Downloader</Link>, click <strong>Analyze & Save Media</strong>, and tap <strong>Download</strong> to save the clean MP4 file straight to your device without watermarks or login credentials.
        </p>
      </div>

      {/* Step 1: Copying the Link */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          1. How to Copy a Public X (Twitter) Video Link
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Before analyzing a post, you need its exact public status URL. Here is how to obtain it from any device:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc list-inside bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <li><strong>From the X Mobile App (iOS / Android):</strong> Open the post, tap the <strong>Share</strong> icon (tray with up-arrow or share nodes) beneath the tweet, and select <strong>Copy link</strong>.</li>
          <li><strong>From Desktop Web Browser:</strong> Click into the specific post, copy the URL directly from your browser’s address bar (e.g., <code>https://x.com/username/status/123456789...</code>), or click the Share icon and choose <strong>Copy link to post</strong>.</li>
          <li><strong>Legacy Twitter URLs:</strong> URLs formatted as <code>https://twitter.com/.../status/...</code> or shortened <code>https://x.com/i/status/...</code> share links are both fully supported.</li>
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
            <li>Copy the link to the public X post.</li>
            <li>Open <strong>Safari</strong> and navigate to the <Link href="/x-video-downloader" className="text-emerald-600 font-medium hover:underline">SaveNexa X Downloader</Link>.</li>
            <li>Paste the URL into the input field and tap <strong>Analyze & Save Media</strong>.</li>
            <li>Once resolved, tap <strong>Download</strong> on your preferred resolution (1080p, 720p, or 360p).</li>
            <li>Safari will display a download confirmation prompt. Tap <strong>Download</strong>.</li>
            <li>Open your <strong>Files</strong> app, go to the <strong>Downloads</strong> folder, tap the video, tap <strong>Share</strong>, and tap <strong>Save Video</strong> to move it into your iPhone Photos Camera Roll.</li>
          </ol>
        </div>

        {/* Android */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Android (Chrome, Firefox, or Samsung Internet)</span>
          </div>
          <ol className="text-xs sm:text-sm text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>In the X app, tap <strong>Share &gt; Copy link</strong>.</li>
            <li>Open your mobile web browser and visit SaveNexa.</li>
            <li>Paste the link into the search box and tap <strong>Analyze & Save Media</strong>.</li>
            <li>Select your desired video quality and tap <strong>Download</strong>.</li>
            <li>The MP4 video will save directly into your device&apos;s <strong>Downloads</strong> directory and appear automatically in Google Photos or your Gallery.</li>
          </ol>
        </div>

        {/* Desktop PC/Mac */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Laptop className="w-4 h-4 text-emerald-600" />
            <span>Windows PC & Mac Desktop</span>
          </div>
          <ol className="text-xs sm:text-sm text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Copy the post URL from your browser address bar.</li>
            <li>Paste the URL into SaveNexa and click <strong>Analyze & Save Media</strong>.</li>
            <li>Choose your preferred video bitrate and click <strong>Download</strong> to save the MP4 video directly to your PC or Mac hard drive.</li>
          </ol>
        </div>
      </section>

      {/* Section 3: Understanding X Videos vs GIFs */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          3. Understanding X Video Formats & Looping GIFs
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          When creators upload animations to X/Twitter, the platform automatically transcodes them into looping <strong>MP4 video streams</strong> with an H.264 video codec. SaveNexa detects these native streams directly, allowing you to download high-framerate, lightweight files that can be shared across messaging apps and video editors without quality degradation.
        </p>
      </section>

      {/* Section 4: Troubleshooting & Limitations */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          4. Troubleshooting & Platform Limitations
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs sm:text-sm text-amber-900/90">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Protected Accounts & Private Posts</span>
            </div>
            <p>SaveNexa only analyzes publicly visible tweets. Content from locked/protected accounts or private community circles cannot be resolved.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-xs sm:text-sm text-slate-700">
            <div className="font-bold text-slate-900">Embedded External Links (YouTube, Spotify, Articles)</div>
            <p>If a tweet contains a link preview card to an external site rather than an uploaded native video file, SaveNexa cannot extract video streams from it. For direct video files from online servers, use our <Link href="/online-video-downloader" className="text-emerald-600 font-medium hover:underline">Direct Video Downloader</Link>.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Responsible Use & Copyright */}
      <section className="p-5 bg-slate-100 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Responsible Use & Fair Use Notice</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          SaveNexa is a technical browser utility designed for personal archival and fair use of publicly available media. Always ensure you have the creator&apos;s permission before redistributing or publishing downloaded media content. For further legal information, see our <Link href="/guides/public-content-and-copyright" className="text-emerald-600 font-medium hover:underline">Public Content & Copyright Guide</Link>.
        </p>
      </section>

      {/* Direct CTA */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-base text-white">Ready to Save an X (Twitter) Video?</div>
          <div className="text-xs text-slate-400">Paste your link into our browser-based utility.</div>
        </div>
        <Link
          href="/x-video-downloader"
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Open X Downloader</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* FAQ Accordion */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={guideFaqs} />
      </section>

      {/* Related Guides & Tools */}
      <section className="pt-6 border-t border-slate-200 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Related Guides & Tools
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/how-to-save-reddit-video"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>How to Save Reddit Videos</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/how-to-download-tiktok-video"
            className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-xs font-medium text-slate-800 transition-colors"
          >
            <span>How to Download TikTok Videos</span>
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
