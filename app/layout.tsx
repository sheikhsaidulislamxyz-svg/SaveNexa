import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaOrg from '@/components/SchemaOrg';
import SocialBar from '@/components/ads/SocialBar';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SaveNexa – Free Online Video Downloader for Social Media & URLs',
    template: '%s | SaveNexa',
  },
  description: SITE_DESCRIPTION,
  applicationName: 'SaveNexa',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  keywords: [
    'video downloader',
    'free video downloader',
    'savenexa',
    'tiktok video downloader',
    'instagram reels downloader',
    'facebook video downloader',
    'reddit video downloader',
    'x twitter video downloader',
    'pinterest video downloader',
    'save public media online',
  ],
  authors: [{ name: 'SaveNexa Team', url: SITE_URL }],
  creator: 'SaveNexa',
  publisher: 'SaveNexa',
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'SaveNexa',
    title: 'SaveNexa – Free Online Video Downloader for Social Media & URLs',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'SaveNexa — Free Video Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Video Downloader for TikTok, Instagram & More | SaveNexa',
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'nVN-QMqk9vLK3P8un4o4KKFqzdvZmW59j74cewfGOjY',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon & Web App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        <meta name="google-site-verification" content="nVN-QMqk9vLK3P8un4o4KKFqzdvZmW59j74cewfGOjY" />

        {/* Adsterra Native Notification Protection: Allows authentic ad rendering & voluntary clicks while blocking website click hijacking and fullscreen overlays */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                function isAdElement(el) {
                  if (!el || el === document || el === window || el === document.body || el === document.documentElement) {
                    return false;
                  }
                  var curr = el;
                  while (curr && curr !== document.body && curr !== document.documentElement) {
                    if (
                      curr.hasAttribute('data-adsterra-ad') ||
                      curr.hasAttribute('data-ad-unit') ||
                      curr.hasAttribute('data-cfasync') ||
                      (curr.id && /adsterra|bellnewyork|container-789ab693|social-bar/i.test(curr.id)) ||
                      (curr.className && typeof curr.className === 'string' && /adsterra|social-bar|in-page-push|notification-ad|at-sb|asg-/i.test(curr.className)) ||
                      curr.tagName === 'INS' ||
                      curr.tagName === 'IFRAME'
                    ) {
                      return true;
                    }
                    if (curr.parentNode === document.body) {
                      var style = window.getComputedStyle(curr);
                      if (style.position === 'fixed' || style.position === 'absolute') {
                        var w = curr.offsetWidth || parseInt(style.width, 10);
                        var h = curr.offsetHeight || parseInt(style.height, 10);
                        if (w > 0 && w <= 480 && h > 0 && h <= 260) {
                          curr.setAttribute('data-adsterra-ad', 'true');
                          return true;
                        }
                      }
                    }
                    curr = curr.parentElement;
                  }
                  return false;
                }

                // Intercept third-party click listeners attached to global window/document
                var originalAddEventListener = EventTarget.prototype.addEventListener;
                EventTarget.prototype.addEventListener = function(type, listener, options) {
                  var target = this;
                  var isGlobalTarget = (target === window || target === document || target === document.documentElement || target === document.body);
                  var isClickType = (type === 'click' || type === 'touchstart' || type === 'touchend' || type === 'pointerdown' || type === 'mousedown' || type === 'mouseup');
                  
                  if (isGlobalTarget && isClickType && typeof listener === 'function') {
                    var stack = '';
                    try { stack = (new Error()).stack || ''; } catch(e) {}
                    var isInternal = stack.indexOf('_next/') !== -1 || stack.indexOf('node_modules') !== -1;
                    if (!isInternal) {
                      var safeListener = function(event) {
                        if (event && event.target && isAdElement(event.target)) {
                          return listener.call(this, event);
                        }
                      };
                      safeListener._orig = listener;
                      return originalAddEventListener.call(this, type, safeListener, options);
                    }
                  }
                  return originalAddEventListener.call(this, type, listener, options);
                };

                // Prevent full-viewport / fullscreen interstitial overlays from third-party scripts
                if (typeof MutationObserver !== 'undefined') {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var added = mutations[i].addedNodes;
                      for (var j = 0; j < added.length; j++) {
                        var node = added[j];
                        if (node.nodeType === 1 && node.parentNode === document.body) {
                          var el = node;
                          var style = window.getComputedStyle(el);
                          if (style.position === 'fixed' || style.position === 'absolute') {
                            var w = parseInt(style.width, 10) || el.offsetWidth;
                            var h = parseInt(style.height, 10) || el.offsetHeight;
                            var isFullScreen = (w >= window.innerWidth * 0.75 || style.width === '100vw' || style.width === '100%') &&
                                               (h >= window.innerHeight * 0.75 || style.height === '100vh' || style.height === '100%');
                            if (isFullScreen && !el.getAttribute('data-savenexa-modal')) {
                              el.style.display = 'none';
                              el.style.pointerEvents = 'none';
                              if (el.parentNode) el.parentNode.removeChild(el);
                            } else if (w <= 480 && h <= 260) {
                              el.setAttribute('data-adsterra-ad', 'true');
                            }
                          }
                        }
                      }
                    }
                  });
                  if (document.body) {
                    observer.observe(document.body, { childList: true });
                  } else {
                    document.addEventListener('DOMContentLoaded', function() {
                      observer.observe(document.body, { childList: true });
                    });
                  }
                }

                // Cross-origin script error suppression
                window.addEventListener('error', function(e) {
                  if (e && (e.message === 'Script error.' || !e.filename || e.filename.indexOf(window.location.origin) === -1)) {
                    e.preventDefault && e.preventDefault();
                    e.stopPropagation && e.stopPropagation();
                    return true;
                  }
                }, true);
                window.addEventListener('unhandledrejection', function(e) {
                  if (e && e.reason && e.reason.message && e.reason.message.indexOf('Script error') !== -1) {
                    e.preventDefault && e.preventDefault();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <SchemaOrg />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <SocialBar />
      </body>
    </html>
  );
}
