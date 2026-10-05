'use client';

import React from 'react';
import { ADS_ENABLED } from '@/lib/constants';

interface BannerAdProps {
  size: '320x50' | '300x250' | '468x60';
  className?: string;
}

const sizeConfig = {
  '320x50': {
    key: '5c8eeb23db24cf7728f31838ba8fae37',
    width: 320,
    height: 50,
  },
  '300x250': {
    key: '0b478124e9d6cd800c85c8924b3fc448',
    width: 300,
    height: 250,
  },
  '468x60': {
    key: '3cf920286c89f77a4ec3df961bad7ace',
    width: 468,
    height: 60,
  },
};

export default function BannerAd({ size, className = '' }: BannerAdProps) {
  if (!ADS_ENABLED) return null;

  const config = sizeConfig[size];

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; background: transparent; }
  </style>
</head>
<body>
  <script type="text/javascript">
    window.onerror = function() { return true; };
    atOptions = {
      'key' : '${config.key}',
      'format' : 'iframe',
      'height' : ${config.height},
      'width' : ${config.width},
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bellnewyork.org/22/${config.key}" onerror="console.debug('Banner ad error handled');"></script>
</body>
</html>`;

  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 ${className}`}>
      <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1 select-none">Advertisement</span>
      <div
        style={{ width: `${config.width}px`, height: `${config.height}px` }}
        className="flex items-center justify-center bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden shadow-inner"
      >
        <iframe
          title={`ad-banner-${size}`}
          srcDoc={htmlContent}
          width={config.width}
          height={config.height}
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
        />
      </div>
    </div>
  );
}
