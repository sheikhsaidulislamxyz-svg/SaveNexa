'use client';

import Script from 'next/script';
import { ADS_ENABLED } from '@/lib/constants';

export default function SocialBar() {
  if (!ADS_ENABLED) return null;

  return (
    <Script
      id="adsterra-social-bar"
      src="https://bellnewyork.org/14/82392d996fbb040f16c1ca3fcfda6e95"
      strategy="afterInteractive"
      data-cfasync="false"
    />
  );
}
