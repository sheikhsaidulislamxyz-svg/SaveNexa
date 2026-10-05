'use client';

import React, { useEffect, useRef } from 'react';
import { ADS_ENABLED } from '@/lib/constants';

export default function NativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ADS_ENABLED || !containerRef.current) return;

    const currentContainer = containerRef.current;

    // Check if script already appended to body to avoid duplicates
    const scriptId = 'ad-script-native-banner';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://bellnewyork.org/21/789ab693c6687d19182df51556048563';
      script.setAttribute('data-cfasync', 'false');
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, []);

  if (!ADS_ENABLED) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 select-none">Sponsored Feed</span>
      <div
        ref={containerRef}
        id="container-789ab693c6687d19182df51556048563"
        className="w-full min-h-[250px] flex items-center justify-center bg-slate-50/50 border border-slate-100 rounded-2xl overflow-hidden"
      />
    </div>
  );
}
