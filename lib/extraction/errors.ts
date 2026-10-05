import { ExtractionErrorCategory } from './types';

export const EXTRACTION_ERROR_MESSAGES: Record<ExtractionErrorCategory, string> = {
  INVALID_URL: 'The provided web address is invalid or malformed. Please check the URL and try again.',
  UNSUPPORTED_PLATFORM: 'SaveNexa currently supports public media from TikTok, Instagram, Facebook, X (Twitter), Reddit, Pinterest, and direct video files.',
  PRIVATE_OR_RESTRICTED_SOURCE: 'This post is private, age-restricted, removed, or requires account authentication. SaveNexa only processes publicly available media.',
  NO_MEDIA_FOUND: 'Could not extract a public downloadable video or audio stream from this post. Please verify that the post contains a video.',
  EXTRACTION_FAILED: 'Media stream extraction encountered an issue across all provider strategies. Please try again shortly.',
  PROVIDER_BLOCKED: 'The host platform anti-bot protection temporarily rate-limited public access. Please try again in a few moments.',
  MEDIA_VALIDATION_FAILED: 'The extracted media stream link failed content-type or HTTP header validation.',
  DOWNLOAD_UNAVAILABLE: 'Direct file download is currently unavailable for this post.',
  TEMPORARY_PROVIDER_ERROR: 'The origin platform returned a temporary server error. Please try again in a few moments.',
};
