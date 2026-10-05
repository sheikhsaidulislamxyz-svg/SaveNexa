export type MediaType = 'video' | 'audio' | 'image' | 'file';

export interface MediaFormat {
  id: string;
  label: string;
  quality?: string;
  mime: string;
  sizeBytes?: number | null;
  downloadUrl: string;
  downloadId?: string;
  isDownloadable?: boolean;
  ext?: string;
  hasAudio?: boolean;
  bitrate?: number;
  sourceCdnUrl?: string;
}

export interface MediaResult {
  ok: true;
  platform: string;
  platformName: string;
  type: MediaType;
  title: string;
  author?: string;
  authorUrl?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  durationSeconds?: number | null;
  formats: MediaFormat[];
  sourceUrl: string;
  expiresAt?: string | null;
}

export interface MediaErrorResult {
  ok: false;
  code: string;
  message: string;
  details?: string;
}

export type AnalyzeApiResponse = MediaResult | MediaErrorResult;

export interface AnalyzeApiRequest {
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  step: number;
  title: string;
  description: string;
}

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedDate: string;
}
