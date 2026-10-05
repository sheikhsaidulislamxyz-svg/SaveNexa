'use client';

import React from 'react';
import { ADS_ENABLED } from '@/lib/constants';

export default function SocialBar() {
  if (!ADS_ENABLED) return null;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
  </style>
</head>
<body>
  <script type="text/javascript">
    window.onerror = function() { return true; };
  </script>
  <script type="text/javascript" src="https://bellnewyork.org/14/82392d996fbb040f16c1ca3fcfda6e95" data-cfasync="false" async onerror="console.debug('Social bar error handled');"></script>
</body>
</html>`;

  return (
    <iframe
      title="social-bar"
      srcDoc={htmlContent}
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
}
