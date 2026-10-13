'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  Clock,
} from 'lucide-react';
import { detectPlatformFromUrl } from '@/lib/providers/registry';
import { AnalyzeApiResponse, MediaResult, MediaFormat } from '@/lib/types';

interface DownloaderFormProps {
  initialPlatform?: string;
  placeholderText?: string;
  defaultSampleUrl?: string;
}

// Request-scoped job state
interface AnalyzeJobState {
  jobId: string | null;
  status: 'idle' | 'analyzing' | 'success' | 'error' | 'timed_out';
  errorMsg: string | null;
  result: MediaResult | null;
}

interface DownloadJobState {
  downloadId: string | null;
  status: 'idle' | 'preparing' | 'started' | 'error';
  statusMsg: string | null;
}

const CLIENT_ANALYZE_TIMEOUT_MS = 25000; // 25s client-side hard timeout

export default function DownloaderForm({
  placeholderText = 'Paste a TikTok, Instagram, Facebook, X, Reddit, Pinterest, or direct media URL...',
  defaultSampleUrl,
}: DownloaderFormProps) {
  const [url, setUrl] = useState('');
  
  // Independent Analyze State (Job-scoped)
  const [analyzeJob, setAnalyzeJob] = useState<AnalyzeJobState>({
    jobId: null,
    status: 'idle',
    errorMsg: null,
    result: null,
  });

  // Independent Download State (Job-scoped, separate from Analyze)
  const [downloadJob, setDownloadJob] = useState<DownloadJobState>({
    downloadId: null,
    status: 'idle',
    statusMsg: null,
  });

  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [pasteError, setPasteError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const activeAbortControllerRef = useRef<AbortController | null>(null);
  const activeTimeoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unmount cleanup for timers and pending requests
  useEffect(() => {
    return () => {
      if (activeAbortControllerRef.current) {
        activeAbortControllerRef.current.abort('Component unmounted');
      }
      if (activeTimeoutTimerRef.current) {
        clearTimeout(activeTimeoutTimerRef.current);
      }
    };
  }, []);

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
          setPasteError(null);
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
      setAnalyzeJob({
        jobId: null,
        status: 'error',
        errorMsg: 'Please paste or enter a public media URL first.',
        result: null,
      });
      return;
    }

    // 1. Cancel previous pending analyze job & clear its timeout
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort('New analysis job initiated');
    }
    if (activeTimeoutTimerRef.current) {
      clearTimeout(activeTimeoutTimerRef.current);
    }

    const newJobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const controller = new AbortController();
    activeAbortControllerRef.current = controller;

    // Set analyzing state immediately
    setAnalyzeJob({
      jobId: newJobId,
      status: 'analyzing',
      errorMsg: null,
      result: null,
    });
    setPasteError(null);
    setDownloadJob({ downloadId: null, status: 'idle', statusMsg: null });

    // 2. Setup Client-Side Hard Timeout (Guarantees spinner NEVER spins endlessly)
    activeTimeoutTimerRef.current = setTimeout(() => {
      if (activeAbortControllerRef.current === controller) {
        controller.abort('CLIENT_HARD_TIMEOUT');
        setAnalyzeJob({
          jobId: newJobId,
          status: 'timed_out',
          errorMsg: 'Analysis request timed out after 25 seconds. The source platform took too long to respond. Please try again.',
          result: null,
        });
      }
    }, CLIENT_ANALYZE_TIMEOUT_MS);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmed }),
        signal: controller.signal,
      });

      if (activeTimeoutTimerRef.current) {
        clearTimeout(activeTimeoutTimerRef.current);
      }

      const data: AnalyzeApiResponse & { jobId?: string } = await res.json();

      if (!data.ok) {
        setAnalyzeJob({
          jobId: data.jobId || newJobId,
          status: 'error',
          errorMsg:
            data.message ||
            'Could not analyze this link. Please make sure it is a public, accessible URL containing a video or audio stream.',
          result: null,
        });
      } else {
        setAnalyzeJob({
          jobId: data.jobId || newJobId,
          status: 'success',
          errorMsg: null,
          result: data,
        });

        if (data.formats && data.formats.length > 0) {
          const defaultFormat = data.formats.find((f) => f.isDownloadable) || data.formats[0];
          setSelectedFormatId(defaultFormat.id);
        }
      }
    } catch (err: unknown) {
      if (activeTimeoutTimerRef.current) {
        clearTimeout(activeTimeoutTimerRef.current);
      }

      if (err instanceof Error && err.name === 'AbortError') {
        // Interrupted cleanly by a newer job or client timeout, ignore duplicate error
        return;
      }

      setAnalyzeJob({
        jobId: newJobId,
        status: 'error',
        errorMsg: 'A network connection error occurred. Please check your connection and try again.',
        result: null,
      });
    } finally {
      if (activeAbortControllerRef.current === controller) {
        activeAbortControllerRef.current = null;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAnalyze(url);
  };

  const handleClear = () => {
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort('User cleared input');
    }
    if (activeTimeoutTimerRef.current) {
      clearTimeout(activeTimeoutTimerRef.current);
    }
    setUrl('');
    setAnalyzeJob({ jobId: null, status: 'idle', errorMsg: null, result: null });
    setDownloadJob({ downloadId: null, status: 'idle', statusMsg: null });
    setPasteError(null);
    inputRef.current?.focus();
  };

  const handleCopySource = async () => {
    if (!analyzeJob.result) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(analyzeJob.result.sourceUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch {
      // Ignore clipboard write failures in sandboxed iframes
    }
  };

  const activeFormat = useMemo(() => {
    if (!analyzeJob.result || !analyzeJob.result.formats) return null;
    return analyzeJob.result.formats.find((f) => f.id === selectedFormatId) || analyzeJob.result.formats[0] || null;
  }, [analyzeJob.result, selectedFormatId]);

  const handleExecuteDownload = async (format: MediaFormat) => {
    if (!format || !format.isDownloadable || !format.downloadUrl) {
      setDownloadJob({
        downloadId: format.downloadId || 'err',
        status: 'error',
        statusMsg: 'Direct download is currently unavailable for this media stream.',
      });
      return;
    }

    setDownloadJob({
      downloadId: format.downloadId || 'dl_start',
      status: 'preparing',
      statusMsg: 'Preparing download stream...',
    });

    try {
      const downloadEndpoint = format.downloadUrl;

      // Trigger direct same-origin attachment download without new tabs or redirects
      const a = document.createElement('a');
      a.href = downloadEndpoint;
      a.setAttribute('download', '');
      a.style.display = 'none';

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 500);

      setDownloadJob({
        downloadId: format.downloadId || 'dl_started',
        status: 'started',
        statusMsg: 'Download started! Check your browser downloads folder.',
      });
    } catch {
      setDownloadJob({
        downloadId: format.downloadId || 'dl_err',
        status: 'error',
        statusMsg: 'Download failed to initialize. Please try again.',
      });
    }
  };

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes || bytes <= 0) return null;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isAnalyzing = analyzeJob.status === 'analyzing';

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
              className="w-full pl-3 pr-24 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
              aria-label="Public media URL to analyze"
              required
            />

            {/* In-box Actions */}
            <div className="absolute right-2 flex items-center gap-1.5">
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Clear input text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors active:scale-95 cursor-pointer"
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
              disabled={!url.trim()}
              className="w-full sm:flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isAnalyzing ? (
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
      {defaultSampleUrl && analyzeJob.status === 'idle' && (
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

      {/* Error & Timeout State */}
      {(analyzeJob.status === 'error' || analyzeJob.status === 'timed_out') && (
        <div
          role="alert"
          className="bg-red-50/80 border border-red-200 rounded-2xl p-4 text-sm text-red-900 space-y-2 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3">
            {analyzeJob.status === 'timed_out' ? (
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h3 className="font-semibold text-red-950">
                {analyzeJob.status === 'timed_out'
                  ? 'Request timed out'
                  : "We couldn't analyze this link"}
              </h3>
              <p className="text-xs sm:text-sm text-red-800 leading-relaxed">
                {analyzeJob.errorMsg}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-red-100 flex flex-wrap items-center gap-3 text-xs text-red-700 pl-8">
            <span>• Make sure the post is public and contains a video/audio.</span>
            <span>• Check that the full URL was copied.</span>
            <button
              onClick={() => triggerAnalyze(url)}
              className="font-medium underline hover:text-red-950 inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Retry Analysis
            </button>
          </div>
        </div>
      )}

      {/* Success Result Card */}
      {analyzeJob.status === 'success' && analyzeJob.result && (
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
              {analyzeJob.result.previewVideoUrl ? (
                <video
                  key={analyzeJob.result.previewVideoUrl}
                  src={analyzeJob.result.previewVideoUrl}
                  poster={analyzeJob.result.thumbnailUrl}
                  controls
                  playsInline
                  preload="none"
                  className="w-full h-full object-contain"
                >
                  Your browser does not support video playback preview.
                </video>
              ) : analyzeJob.result.thumbnailUrl ? (
                <picture>
                  <source media="(max-width: 640px)" srcSet={analyzeJob.result.thumbnailUrl} />
                  <img
                    src={analyzeJob.result.thumbnailUrl}
                    srcSet={`${analyzeJob.result.thumbnailUrl} 640w, ${analyzeJob.result.thumbnailUrl} 1080w`}
                    sizes="(max-width: 640px) 100vw, 640px"
                    alt={analyzeJob.result.title || 'Video preview thumbnail'}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </picture>
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
              <span className="font-semibold text-slate-800">{analyzeJob.result.platformName}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{analyzeJob.result.type}</span>
              {analyzeJob.result.durationSeconds ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {Math.floor(analyzeJob.result.durationSeconds / 60)}:
                    {String(Math.floor(analyzeJob.result.durationSeconds % 60)).padStart(2, '0')}
                  </span>
                </>
              ) : null}
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
              {analyzeJob.result.title}
            </h2>

            {analyzeJob.result.author && (
              <p className="text-xs text-slate-600">
                Posted by <span className="font-medium text-slate-900">{analyzeJob.result.author}</span>
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
                {analyzeJob.result.formats.length} stream option{analyzeJob.result.formats.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {analyzeJob.result.formats.map((format) => {
                const isSelected = format.id === selectedFormatId;
                return (
                  <button
                    key={format.id}
                    type="button"
                    onClick={() => {
                      setSelectedFormatId(format.id);
                      setDownloadJob({ downloadId: null, status: 'idle', statusMsg: null });
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

                {/* PRIMARY DOWNLOAD BUTTON */}
                {activeFormat.isDownloadable ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleExecuteDownload(activeFormat)}
                      className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer"
                    >
                      {downloadJob.status === 'preparing' ? (
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

                    {downloadJob.statusMsg && (
                      <div className={`text-xs text-center font-medium p-2 rounded-lg border animate-in fade-in ${
                        downloadJob.status === 'error'
                          ? 'text-red-800 bg-red-50 border-red-200'
                          : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      }`}>
                        {downloadJob.statusMsg}
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
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-medium py-1 px-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
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
              href={analyzeJob.result.sourceUrl}
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
