import React from 'react';
import { ADS_ENABLED } from '@/lib/constants';

interface AdSlotProps {
  slot: 'hero-below-tool' | 'result-below-options' | 'article-mid' | 'footer-above';
  className?: string;
}

export default function AdSlot({ slot, className = '' }: AdSlotProps) {
  if (!ADS_ENABLED) {
    return null; // MVP strictly disables ads with zero layout shift
  }

  return (
    <aside
      aria-label="Sponsorship notice"
      data-slot={slot}
      className={`w-full min-h-[90px] bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 ${className}`}
    >
      <span className="sr-only">Advertisement</span>
    </aside>
  );
}
