import React from 'react';
import Link from 'next/link';
import { ArrowRight, Video, Camera, Film, Tv, Share2, MessageSquare, Image as ImageIcon, Globe } from 'lucide-react';
import { PlatformConfig } from '@/lib/constants';

interface PlatformCardProps {
  platform: PlatformConfig;
}

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video className="w-5 h-5 text-slate-800" />,
  Camera: <Camera className="w-5 h-5 text-slate-800" />,
  Film: <Film className="w-5 h-5 text-slate-800" />,
  Tv: <Tv className="w-5 h-5 text-slate-800" />,
  Share2: <Share2 className="w-5 h-5 text-slate-800" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-slate-800" />,
  Image: <ImageIcon className="w-5 h-5 text-slate-800" />,
  Globe: <Globe className="w-5 h-5 text-slate-800" />,
};

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link
      href={platform.slug}
      className="group block p-5 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
          {iconMap[platform.iconName] || <Video className="w-5 h-5" />}
        </div>
        <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
          {platform.name} Downloader
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {platform.description}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
        <span>Supported:</span>
        <span className="font-medium text-slate-700 truncate">{platform.supportedTypes[0]}</span>
      </div>
    </Link>
  );
}
