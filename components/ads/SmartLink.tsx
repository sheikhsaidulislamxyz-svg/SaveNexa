'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ADS_ENABLED } from '@/lib/constants';

export default function SmartLink() {
  if (!ADS_ENABLED) return null;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 max-w-md mx-auto my-6 space-y-2 text-center animate-in fade-in duration-300">
      <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
        Sponsored Premium Stream
      </div>
      <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
        Looking for ultra-high speed direct links? Try our external sponsored server.
      </p>
      <a
        href="https://ardance.org/4/f5c2bbde748faeb9b20943c7d3f3fc9f7"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
      >
        <span>Access Sponsored Server</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
