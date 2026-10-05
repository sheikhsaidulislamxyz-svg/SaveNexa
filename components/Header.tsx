'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_NAME, SUPPORTED_PLATFORMS } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Download className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">{SITE_NAME}</span>
        </Link>

        {/* Zone 2: All 6 core platforms + Guides + About navigation links */}
        <nav className="hidden md:flex items-center md:gap-2.5 lg:gap-5 text-xs lg:text-sm font-medium text-slate-600 shrink-0">
          <Link href="/tiktok-video-downloader" className="hover:text-slate-900 transition-colors">
            TikTok
          </Link>
          <Link href="/instagram-video-downloader" className="hover:text-slate-900 transition-colors">
            Instagram
          </Link>
          <Link href="/facebook-video-downloader" className="hover:text-slate-900 transition-colors">
            Facebook
          </Link>
          <Link href="/x-video-downloader" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            X (Twitter)
          </Link>
          <Link href="/reddit-video-downloader" className="hover:text-slate-900 transition-colors">
            Reddit
          </Link>
          <Link href="/pinterest-video-downloader" className="hover:text-slate-900 transition-colors">
            Pinterest
          </Link>
          <Link href="/guides" className="hover:text-slate-900 transition-colors">
            Guides
          </Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">
            About
          </Link>
        </nav>

        {/* Zone 3: Direct Video primary action & Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/online-video-downloader"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 lg:px-3.5 lg:py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Direct Video
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-5 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
            Platforms
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SUPPORTED_PLATFORMS.map((platform) => (
              <Link
                key={platform.id}
                href={platform.slug}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {platform.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Resources & Legal
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/guides"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                Guides & How-To
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                About SaveNexa
              </Link>
              <Link
                href="/privacy"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
