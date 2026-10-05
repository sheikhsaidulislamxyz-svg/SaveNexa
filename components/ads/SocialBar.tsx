'use client';

import { useEffect } from 'react';
import { ADS_ENABLED } from '@/lib/constants';

export default function SocialBar() {
  useEffect(() => {
    if (!ADS_ENABLED) return;

    const script = document.createElement('script');
    script.src = 'https://bellnewyork.org/14/82392d996fbb040f16c1ca3fcfda6e95';
    script.setAttribute('data-cfasync', 'false');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
