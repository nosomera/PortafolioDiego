import React, { useEffect } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { PortfolioMedia } from '../types/portfolio';

export interface LightboxPayload {
  title: string;
  subtitle: string;
  description?: string;
  media: PortfolioMedia;
}

interface MediaLightboxProps {
  payload: LightboxPayload | null;
  onClose: () => void;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({ payload, onClose }) => {
  useEffect(() => {
    if (!payload) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [payload, onClose]);

  if (!payload) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={payload.title}
      className="fixed inset-0 z-50 bg-[#0D1321]/95 backdrop-blur-md flex flex-col"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4 border-b border-[#A3A9AE]/25 bg-[#1F2B45]">
        <div className="min-w-0">
          <div className="text-xs text-[#D5BA9E] font-medium truncate">
            {payload.subtitle}
          </div>
          <h2 className="font-display text-sm sm:text-lg text-[#F4F1EC] truncate">
            {payload.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={payload.media.url}
            download={payload.media.fileName || 'archivo'}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#A3A9AE]/35 text-xs font-medium text-[#F4F1EC] hover:border-[#D5BA9E] transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Descargar</span>
          </a>

          {payload.media.kind === 'pdf' && (
            <a
              href={payload.media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-[#D5BA9E]/45 text-xs font-medium text-[#D5BA9E] hover:bg-[#D5BA9E] hover:text-[#1F2B45] transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Nueva pestaña</span>
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar visor"
            className="inline-flex items-center justify-center w-10 h-10 bg-[#B24D60] hover:bg-[#9D3E50] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 min-h-0 p-4 sm:p-8 flex items-center justify-center overflow-auto">
        {payload.media.kind === 'mp4' ? (
          <video
            src={payload.media.url}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-full bg-black border border-[#A3A9AE]/30"
          />
        ) : payload.media.kind === 'pdf' ? (
          <iframe
            src={payload.media.url}
            title={payload.title}
            className="w-full h-full max-w-6xl bg-[#151E32] border border-[#A3A9AE]/35"
          />
        ) : (
          <img
            src={payload.media.url}
            alt={payload.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain border border-[#A3A9AE]/30"
          />
        )}
      </div>

      {payload.description && (
        <div className="px-4 sm:px-8 py-3 border-t border-[#A3A9AE]/20 bg-[#151E32] text-xs sm:text-sm text-[#A3A9AE] text-center">
          {payload.description}
        </div>
      )}
    </div>
  );
};
