import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    '',
    '/tiktok-video-downloader',
    '/instagram-video-downloader',
    '/instagram-reels-downloader',
    '/facebook-video-downloader',
    '/x-video-downloader',
    '/reddit-video-downloader',
    '/pinterest-video-downloader',
    '/online-video-downloader',
    '/how-to-download-tiktok-video',
    '/how-to-save-instagram-reels',
    '/how-to-download-facebook-video',
    '/how-to-save-reddit-video',
    '/guides',
    '/guides/phone-video-download-guide',
    '/guides/browser-download-guide',
    '/guides/public-content-and-copyright',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/copyright',
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : route.includes('downloader') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.includes('downloader') ? 0.9 : route.startsWith('/guides') ? 0.8 : 0.5,
  }));
}
