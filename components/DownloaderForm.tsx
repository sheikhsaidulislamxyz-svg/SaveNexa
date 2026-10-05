'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Download,
  Clipboard,
  X,
  AlertCircle,
  Check,
  ExternalLink,
  Loader2,
  FileVideo,
  Music,
  Share2,
  Film,
  RotateCcw,
} from 'lucide-react';
import { detectPlatformFromUrl } from '@/lib/providers/registry';
import { AnalyzeApiResponse, MediaResult, MediaFormat } from '@/lib/types';

interface DownloaderFormProps {
  initialPlatform?: string;
  placeholderText?: string;
  defaultSampleUrl?: string;
}

export default function DownloaderForm({
  placeholderText = 'Paste a TikTok, Instagram, Facebook, X, Reddit, Pinterest, or direct media URL...',
  defaultSampleUrl,
}: DownloaderFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MediaResult | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [pasteError, setPasteError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive detected platform as user types
  const detectedPlatform = useMemo(() => {
    if (!url.trim()) return null;
    return detectPlatformFromUrl(url);
  }, [url]);

  const handlePaste = async () => {
    setPasteError(null);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setError(null);
          if (/^https?:\/\//i.test(text.trim()) || text.includes('.')) {
            triggerAnalyze(text.trim());
          }
        }
      } else {
        setPasteError('Clipboard access is not permitted in this browser mode. Please paste manually into the input box.');
      }
    } catch {
      setPasteError('Could not read clipboard. Please tap and paste directly into the box.');
      inputRef.current?.focus();
    }
  };

  const triggerAnalyze = async (urlToAnalyze: string) => {
    const trimmed = urlToAnalyze.trim();
    if (!trimmed) {
      setError('Please paste or enter a public media URL first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setPasteError(null);
    setDownloadStatus(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmed }),
      });

      const data: AnalyzeApiResponse = await res.json();

      if (!data.ok) {
        setError(
          data.message ||
          'Could not analyze this link. Please make sure it is a public, accessible URL containing a video or audio stream.'
        );
      } else {
        setResult(data);
        if (data.formats && data.formats.length > 0) {
          const defaultFormat = data.formats.find((f) => f.isDownloadable) || data.formats[0];
          setSelectedFormatId(defaultFormat.id);
        }
      }
    } catch {
      setError('A network connection error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAnalyze(url);
  };

  const handleClear = () => {
    setUrl('');
    setError(null);
    setResult(null);
    setPasteError(null);
    setDownloadStatus(null);
    inputRef.current?.focus();
  };

  const handleCopySource = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.sourceUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const activeFormat = useMemo(() => {
    if (!result || !result.formats) return null;
    return result.formats.find((f) => f.id === selectedFormatId) || result.formats[0] || null;
  }, [result, selectedFormatId]);

  const handleExecuteDownload = async (format: MediaFormat) => {
    if (!format || !format.isDownloadable || !format.downloadUrl) {
      setDownloadStatus('Direct download is currently unavailable for this media stream.');
      return;
    }

    setIsDownloading(true);
    setDownloadStatus('Preparing download...');

    try {
      const downloadEndpoint = format.downloadUrl;

      // Trigger browser download via internal /api/download?id=SIGNED_TOKEN endpoint
      const a = document.createElement('a');
      a.href = downloadEndpoint;
      a.style.display = 'none';

      if (format.ext) {
        a.download = `savenexa-media.${format.ext}`;
      }

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadStatus('Download started! Check your browser downloads folder.');
    } catch {
      setDownloadStatus('Download failed to initialize. Please try again.');
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes || bytes <= 0) return null;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Downloader Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 sm:p-4 transition-all focus-within:border-slate-400 focus-within:shadow-md">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={placeholderText}
              disabled={isLoading}
              className="w-full pl-3 pr-24 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none disabled:opacity-60"
              aria-label="Public media URL to analyze"
              required
            />

            {/* In-box Actions */}
            <div className="absolute right-2 flex items-center gap-1.5">
              {url && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                  aria-label="Clear input text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                disabled={isLoading}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors active:scale-95 disabled:opacity-50"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Paste</span>
              </button>
            </div>
          </div>

          {/* Detected platform indicator */}
          {detectedPlatform && (
            <div className="flex items-center justify-between text-xs px-1 text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Detected platform: <strong className="text-slate-800 font-medium">{detectedPlatform.name}</strong>
              </span>
              <span className="text-[11px] text-slate-400">Ready to analyze</span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full sm:flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                  <span>Extracting media stream...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Analyze & Save Media</span>
                </>
              )}
            </button>
          </div>
        </form>

        {pasteError && (
          <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
            {pasteError}
          </div>
        )}
      </div>

      {/* Quick sample link helper */}
      {defaultSampleUrl && !result && (
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>Need a quick test?</span>
          <button
            type="button"
            onClick={() => {
              setUrl(defaultSampleUrl);
              triggerAnalyze(defaultSampleUrl);
            }}
            className="text-slate-900 font-medium underline hover:text-slate-700 cursor-pointer"
          >
            Try sample URL
          </button>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div
          role="alert"
          className="bg-red-50/80 border border-red-200 rounded-2xl p-4 text-sm text-red-900 space-y-2 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-red-950">We couldn&apos;t analyze this link</h3>
              <p className="text-xs sm:text-sm text-red-800 leading-relaxed">{error}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-red-100 flex flex-wrap items-center gap-3 text-xs text-red-700 pl-8">
            <span>• Make sure the post is public and contains a video/audio.</span>
            <span>• Check that the full URL was copied.</span>
            <button
              onClick={() => triggerAnalyze(url)}
              className="font-medium underline hover:text-red-950 inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Retry
            </button>
          </div>
        </div>
      )}

      {/* Success Result Card */}
      {result && !isLoading && (
        <div
          aria-live="polite"
          className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-md space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {/* VIDEO / MEDIA PREVIEW CONTAINER */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Video Preview
            </div>
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-slate-800">
              {result.previewVideoUrl ? (
                <video
                  src={result.previewVideoUrl}
                  poster={result.thumbnailUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  Your browser does not support video playback preview.
                </video>
              ) : result.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.thumbnailUrl}
                  alt={result.title || 'Media thumbnail'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <FileVideo className="w-10 h-10 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-300">Media information found</span>
                </div>
              )}
            </div>
          </div>

          {/* Media Information Header */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">{result.platformName}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{result.type}</span>
              {result.durationSeconds ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {Math.floor(result.durationSeconds / 60)}:
                    {String(Math.floor(result.durationSeconds % 60)).padStart(2, '0')}
                  </span>
                </>
              ) : null}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
              {result.title}
            </h2>

            {result.author && (
              <p className="text-xs text-slate-600">
                Posted by <span className="font-medium text-slate-900">{result.author}</span>
              </p>
            )}
          </div>

          {/* QUALITY / FORMAT SELECTION & DOWNLOAD BUTTON */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Available Quality
              </span>
              <span className="text-[11px] text-slate-400">
                {result.formats.length} stream option{result.formats.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {result.formats.map((format) => {
                const isSelected = format.id === selectedFormatId;
                return (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() => {
                      setSelectedFormatId(format.id);
                      setDownloadStatus(null);
                    }}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{format.quality || format.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Format Details Card */}
            {activeFormat && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    {activeFormat.mime.startsWith('audio') ? (
                      <Music className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Film className="w-4 h-4 text-slate-800 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-900">{activeFormat.label}</span>
                  </div>
                  {activeFormat.sizeBytes ? (
                    <span className="font-mono tabular-nums text-slate-500">
                      {formatFileSize(activeFormat.sizeBytes)}
                    </span>
                  ) : null}
                </div>

                {/* PRIMARY DOWNLOAD BUTTON (TRIPPED TO DIRECT BACKEND DOWNLOAD ROUTE) */}
                {activeFormat.isDownloadable ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleExecuteDownload(activeFormat)}
                      className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                          <span>Preparing Download...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 text-slate-950" />
                          <span>DOWNLOAD VIDEO ({activeFormat.quality || 'HD'})</span>
                        </>
                      )}
                    </button>

                    {downloadStatus && (
                      <div className="text-xs text-center font-medium text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 animate-in fade-in">
                        {downloadStatus}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs space-y-1">
                    <div className="font-semibold flex items-center gap-1.5 text-amber-950">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Direct download unavailable for this media</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Optional Secondary Source Link */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCopySource}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium py-1 px-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied source URL</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy original URL</span>
                </>
              )}
            </button>

            <a
              href={result.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
            >
              <span>Open original post</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
