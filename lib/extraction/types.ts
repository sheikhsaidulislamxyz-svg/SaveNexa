export type ExtractionErrorCategory =
  | 'INVALID_URL'
  | 'UNSUPPORTED_PLATFORM'
  | 'PRIVATE_OR_RESTRICTED_SOURCE'
  | 'NO_MEDIA_FOUND'
  | 'EXTRACTION_FAILED'
  | 'PROVIDER_BLOCKED'
  | 'MEDIA_VALIDATION_FAILED'
  | 'DOWNLOAD_UNAVAILABLE'
  | 'TEMPORARY_PROVIDER_ERROR';

export interface ExtractionContext {
  signal: AbortSignal;
  clientIp?: string;
  userAgent?: string;
  timeoutMs?: number;
}

export interface ExtractedFormat {
  id: string;
  quality: string;
  mime: string;
  ext: string;
  width?: number | null;
  height?: number | null;
  sizeBytes?: number | null;
  hasAudio?: boolean;
  rawCdnUrl: string;
}

export interface NormalizedMediaResult {
  ok: true;
  platform: string;
  platformName: string;
  type: 'video' | 'audio' | 'image';
  title: string;
  author?: string;
  authorUrl?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  durationSeconds?: number | null;
  sourceUrl: string;
  formats: {
    id: string;
    label: string;
    quality: string;
    mime: string;
    ext: string;
    sizeBytes?: number | null;
    downloadUrl: string;
    downloadId: string;
    isDownloadable: true;
  }[];
}

export interface NormalizedErrorResult {
  ok: false;
  code: ExtractionErrorCategory;
  message: string;
  details?: string;
  strategyLogs?: {
    strategyName: string;
    status: 'SUCCESS' | 'NOT_FOUND' | 'BLOCKED' | 'UNSUPPORTED' | 'INVALID_RESPONSE' | 'TEMPORARY_FAILURE';
    message?: string;
  }[];
}

export type ExtractionEngineResult = NormalizedMediaResult | NormalizedErrorResult;

export interface StrategyResult {
  success: boolean;
  status: 'SUCCESS' | 'NOT_FOUND' | 'BLOCKED' | 'UNSUPPORTED' | 'INVALID_RESPONSE' | 'TEMPORARY_FAILURE';
  message?: string;
  title?: string;
  author?: string;
  authorUrl?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  durationSeconds?: number | null;
  formats?: ExtractedFormat[];
}

export interface ExtractionStrategy {
  name: string;
  execute(url: URL, context: ExtractionContext): Promise<StrategyResult>;
}

export interface ProviderExtractor {
  id: string;
  name: string;
  canHandle(url: URL): boolean;
  extract(url: URL, context: ExtractionContext): Promise<ExtractionEngineResult>;
}
