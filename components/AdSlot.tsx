'use client';

import React from 'react';
import { ADS_ENABLED } from '@/lib/constants';
import BannerAd from './ads/BannerAd';
import NativeBanner from './ads/NativeBanner';

interface AdSlotProps {
  slot: 'hero-below-tool' | 'result-below-options' | 'content-mid' | 'article-mid' | 'footer-above';
  className?: string;
}

export default function AdSlot({ slot, className = '' }: AdSlotProps) {
  if (!ADS_ENABLED) {
    return null;
  }

  switch (slot) {
    case 'hero-below-tool':
      return (
        <div className={`w-full flex justify-center ${className}`}>
          {/* Render 320x50 for mobile and 468x60 for tablet/desktop */}
          <div className="block sm:hidden">
            <BannerAd size="320x50" />
          </div>
          <div className="hidden sm:block">
            <BannerAd size="468x60" />
          </div>
        </div>
      );

    case 'result-below-options':
      return (
        <div className={`w-full flex justify-center ${className}`}>
          <BannerAd size="300x250" />
        </div>
      );

    case 'content-mid':
      return (
        <div className={`w-full flex justify-center my-6 ${className}`}>
          <BannerAd size="300x250" />
        </div>
      );

    case 'article-mid':
      return (
        <div className={`w-full ${className}`}>
          <NativeBanner />
        </div>
      );

    case 'footer-above':
      return (
        <div className={`w-full flex justify-center ${className}`}>
          <div className="block sm:hidden">
            <BannerAd size="320x50" />
          </div>
          <div className="hidden sm:block">
            <BannerAd size="468x60" />
          </div>
        </div>
      );

    default:
      return null;
  }
}
