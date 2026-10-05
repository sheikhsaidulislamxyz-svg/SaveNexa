'use client';

import { useEffect } from 'react';
import { ADS_ENABLED } from '@/lib/constants';

export default function SocialBar() {
  useEffect(() => {
    if (!ADS_ENABLED) return;

    const scriptId = 'adsterra-social-bar';
    if (document.getElementById(scriptId)) return;

    try {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://bellnewyork.org/14/82392d996fbb040f16c1ca3fcfda6e95';
      script.setAttribute('data-cfasync', 'false');
      script.async = true;
      script.onerror = () => {
        // Swallowed silently so third-party failure does not affect the downloader
      };

      document.body.appendChild(script);
    } catch {
      // Ignore if DOM not ready
    }

    return () => {
      const el = document.getElementById(scriptId);
      if (el && document.body.contains(el)) {
        document.body.removeChild(el);
      }
    };
  }, []);

  return null;
}
