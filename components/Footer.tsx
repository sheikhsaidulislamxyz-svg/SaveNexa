import React from 'react';
import Link from 'next/link';
import { Download, ShieldCheck, Heart } from 'lucide-react';
import { SITE_NAME, SITE_TAGLINE, SUPPORTED_PLATFORMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <Download className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {SITE_TAGLINE}. Save public videos, audio, and media directly in your browser without accounts or software installations.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-tracking • No permanent file storage</span>
            </div>
          </div>

          {/* Col 2: Media Tools */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Download Tools
            </div>
            <ul className="space-y-2 text-xs">
              {SUPPORTED_PLATFORMS.map((platform) => (
                <li key={platform.id}>
                  <Link
                    href={platform.slug}
                    className="hover:text-white transition-colors"
                  >
                    {platform.name} Downloader
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Step-by-Step Guides */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Guides & Tutorials
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-to-download-tiktok-video" className="hover:text-white transition-colors">
                  How to Download TikTok Videos
                </Link>
              </li>
              <li>
                <Link href="/how-to-save-instagram-reels" className="hover:text-white transition-colors">
                  How to Save Instagram Reels
                </Link>
              </li>
              <li>
                <Link href="/how-to-download-facebook-video" className="hover:text-white transition-colors">
                  How to Save Facebook Videos
                </Link>
              </li>
              <li>
                <Link href="/how-to-save-reddit-video" className="hover:text-white transition-colors">
                  How to Save Reddit Videos
                </Link>
              </li>
              <li>
                <Link href="/guides/phone-video-download-guide" className="hover:text-white transition-colors">
                  Mobile Download Guide (iOS & Android)
                </Link>
              </li>
              <li>
                <Link href="/guides/browser-download-guide" className="hover:text-white transition-colors">
                  Browser Download Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Company & Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SaveNexa
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="hover:text-white transition-colors">
                  Copyright & DMCA Notice
                </Link>
              </li>
              <li>
                <Link href="/guides/public-content-and-copyright" className="hover:text-white transition-colors">
                  Public Content & Fair Use Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Boundary Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-4">
          <div className="bg-slate-800/40 rounded-xl p-4 text-xs text-slate-400 leading-relaxed border border-slate-800">
            <strong className="text-slate-300 font-semibold">Responsible Use Disclaimer:</strong> SaveNexa is a technical analysis and browser link helper designed exclusively for publicly accessible media. Users are responsible for ensuring they own the rights or have obtained necessary permissions before saving or distributing third-party content. SaveNexa is not affiliated with, authorized by, or endorsed by TikTok, Instagram, Meta, Facebook, X (Twitter), Reddit, or Pinterest.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} {SITE_NAME}. Open-source public media utility.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-slate-400">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-400">Terms</Link>
              <Link href="/copyright" className="hover:text-slate-400">DMCA</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
