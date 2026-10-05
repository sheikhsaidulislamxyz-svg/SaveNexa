export const SITE_NAME = 'SaveNexa';
export const SITE_TAGLINE = 'Simple tools to save public media from the web';
export const SITE_DESCRIPTION = 'Fast, clean, mobile-first public media downloader. Save public videos, audio, and media from TikTok, Instagram, Facebook, X, Reddit, Pinterest, and direct links directly in your browser.';
export const SITE_URL = process.env.APP_URL || 'https://savenexa.pages.dev';

export const MAX_URL_LENGTH = 4096;
export const MAX_ANALYZE_ATTEMPTS_PER_WINDOW = 15;
export const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
export const FETCH_TIMEOUT_MS = 8000; // 8 seconds

export const ADS_ENABLED = false; // Reserved ad slots, disabled for MVP

export const ERROR_CODES = {
  INVALID_URL: 'INVALID_URL',
  UNSUPPORTED_HOST: 'UNSUPPORTED_HOST',
  PRIVATE_OR_RESTRICTED_SOURCE: 'PRIVATE_OR_RESTRICTED_SOURCE',
  SOURCE_UNAVAILABLE: 'SOURCE_UNAVAILABLE',
  SOURCE_TIMEOUT: 'SOURCE_TIMEOUT',
  SOURCE_RATE_LIMITED: 'SOURCE_RATE_LIMITED',
  NO_MEDIA_FOUND: 'NO_MEDIA_FOUND',
  MEDIA_EXPIRED: 'MEDIA_EXPIRED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SSRF_BLOCKED: 'SSRF_BLOCKED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.INVALID_URL]: 'The provided link is not a valid URL. Please check the address and try again.',
  [ERROR_CODES.UNSUPPORTED_HOST]: 'This website is not currently supported. SaveNexa supports TikTok, Instagram, Facebook, X, Reddit, Pinterest, and direct video links.',
  [ERROR_CODES.PRIVATE_OR_RESTRICTED_SOURCE]: 'This media appears to be private, restricted, age-gated, or removed. SaveNexa only processes public, accessible media.',
  [ERROR_CODES.SOURCE_UNAVAILABLE]: 'The source media could not be analyzed right now. The platform may have updated or the post may be unavailable.',
  [ERROR_CODES.SOURCE_TIMEOUT]: 'The request timed out while contacting the source. Please check your connection and try again.',
  [ERROR_CODES.SOURCE_RATE_LIMITED]: 'The source platform is temporarily limiting requests. Please wait a moment and try again.',
  [ERROR_CODES.NO_MEDIA_FOUND]: 'No downloadable video, audio, or media stream was found in this public post.',
  [ERROR_CODES.MEDIA_EXPIRED]: 'The source media stream link has expired. Please re-analyze the original link.',
  [ERROR_CODES.NETWORK_ERROR]: 'A network error occurred while connecting to the source. Please try again.',
  [ERROR_CODES.SSRF_BLOCKED]: 'Access to local, internal, or restricted network addresses is blocked for security.',
  [ERROR_CODES.TOO_MANY_REQUESTS]: 'You have made too many analysis requests in a short time. Please wait a moment before trying again.',
  [ERROR_CODES.INTERNAL_ERROR]: 'An unexpected internal error occurred during analysis. Please try again.',
};

export interface PlatformConfig {
  id: string;
  name: string;
  slug: string;
  badge: string;
  description: string;
  iconName: string;
  sampleUrl: string;
  supportedTypes: string[];
  placeholderText: string;
}

export const SUPPORTED_PLATFORMS: PlatformConfig[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    slug: '/tiktok-video-downloader',
    badge: 'TikTok Videos',
    description: 'Save public TikTok videos and audio directly to your device with fast browser downloads.',
    iconName: 'Video',
    sampleUrl: 'https://www.tiktok.com/@username/video/1234567890123456789',
    supportedTypes: ['Public TikTok clips', 'TikTok photo slides', 'Direct audio/sound'],
    placeholderText: 'Paste TikTok video link (e.g., https://www.tiktok.com/@.../video/...)',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    slug: '/instagram-video-downloader',
    badge: 'Instagram Videos',
    description: 'Analyze public Instagram posts, reels, and video clips for safe browser saving.',
    iconName: 'Camera',
    sampleUrl: 'https://www.instagram.com/p/Cxyz1234567/',
    supportedTypes: ['Public Instagram posts', 'Feed video clips', 'IGTV videos'],
    placeholderText: 'Paste Instagram post URL (e.g., https://www.instagram.com/p/...)',
  },
  {
    id: 'instagram-reels',
    name: 'Instagram Reels',
    slug: '/instagram-reels-downloader',
    badge: 'Instagram Reels',
    description: 'Save public Instagram Reels with available audio and high-resolution video streams.',
    iconName: 'Film',
    sampleUrl: 'https://www.instagram.com/reel/Cxyz1234567/',
    supportedTypes: ['Public Instagram Reels', 'Reel audio streams'],
    placeholderText: 'Paste Instagram Reel URL (e.g., https://www.instagram.com/reel/...)',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    slug: '/facebook-video-downloader',
    badge: 'Facebook Videos',
    description: 'Save public Facebook videos, watch clips, and public reels directly in MP4 format.',
    iconName: 'Tv',
    sampleUrl: 'https://www.facebook.com/watch/?v=123456789012345',
    supportedTypes: ['Public Facebook watch videos', 'Public page videos', 'Public FB reels'],
    placeholderText: 'Paste Facebook video URL (e.g., https://www.facebook.com/watch/?v=...)',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    slug: '/x-video-downloader',
    badge: 'X / Twitter Media',
    description: 'Extract public video clips, GIFs, and media attachments from public X/Twitter posts.',
    iconName: 'Share2',
    sampleUrl: 'https://x.com/username/status/1234567890123456789',
    supportedTypes: ['Public X video posts', 'Twitter GIFs', 'Video threads'],
    placeholderText: 'Paste X / Twitter post URL (e.g., https://x.com/.../status/...)',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    slug: '/reddit-video-downloader',
    badge: 'Reddit Videos',
    description: 'Download public Reddit videos (v.redd.it) and GIFs with synchronized audio streams.',
    iconName: 'MessageSquare',
    sampleUrl: 'https://www.reddit.com/r/videos/comments/123456/sample_video/',
    supportedTypes: ['v.redd.it videos', 'Public subreddit clips', 'Reddit GIFs'],
    placeholderText: 'Paste Reddit post URL (e.g., https://www.reddit.com/r/.../comments/...)',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    slug: '/pinterest-video-downloader',
    badge: 'Pinterest Media',
    description: 'Save public Pinterest video pins, idea pins, and high-resolution media clips.',
    iconName: 'Image',
    sampleUrl: 'https://www.pinterest.com/pin/123456789012345678/',
    supportedTypes: ['Public video pins', 'Idea pins', 'Direct pin videos'],
    placeholderText: 'Paste Pinterest pin URL (e.g., https://www.pinterest.com/pin/...)',
  },
  {
    id: 'generic',
    name: 'Direct Media URL',
    slug: '/online-video-downloader',
    badge: 'Direct Video URL',
    description: 'Inspect and save direct online video files (.mp4, .webm, .mov, .m4v, .ogv) from any server.',
    iconName: 'Globe',
    sampleUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    supportedTypes: ['Direct .mp4 files', '.webm web streams', '.mov / .m4v media'],
    placeholderText: 'Paste direct video URL (e.g., https://example.com/video.mp4)',
  },
];
