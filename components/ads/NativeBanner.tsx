'use client';

import React from 'react';
import { ADS_ENABLED } from '@/lib/constants';

export default function NativeBanner() {
  if (!ADS_ENABLED) return null;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-family: sans-serif; background: transparent; }
    #container-789ab693c6687d19182df51556048563 { width: 100%; display: flex; justify-content: center; }
  </style>
</head>
<body>
  <div id="container-789ab693c6687d19182df51556048563"></div>
  <script type="text/javascript">
    window.onerror = function() { return true; };
  </script>
  <script type="text/javascript" src="https://bellnewyork.org/21/789ab693c6687d19182df51556048563" data-cfasync="false" async onerror="console.debug('Native ad error handled');"></script>
</body>
</html>`;

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 select-none">Sponsored Feed</span>
      <div
        id="container-789ab693c6687d19182df51556048563"
        className="w-full min-h-[250px] flex items-center justify-center bg-slate-50/50 border border-slate-100 rounded-2xl overflow-hidden"
      >
        <iframe
          title="ad-native-banner"
          srcDoc={htmlContent}
          className="w-full min-h-[250px]"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        />
      </div>
    </div>
  );
}
