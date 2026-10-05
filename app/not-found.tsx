import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { SUPPORTED_PLATFORMS } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-slate-900 mb-2">
          <HelpCircle className="w-8 h-8 text-slate-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          404 — Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
          The requested page or media URL does not exist or may have been moved.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home Tool
        </Link>
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors"
        >
          Browse Guides
        </Link>
      </div>

      <div className="pt-8 border-t border-slate-200 max-w-xl mx-auto text-left space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
          Looking for a specific platform downloader?
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SUPPORTED_PLATFORMS.map((platform) => (
            <Link
              key={platform.id}
              href={platform.slug}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-800 flex items-center justify-between group transition-colors"
            >
              <span>{platform.name}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
