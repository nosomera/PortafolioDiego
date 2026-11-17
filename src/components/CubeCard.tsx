import React from 'react';
import { FileText, Film, Image as ImageIcon, Maximize2, Trash2 } from 'lucide-react';
import { PortfolioItem } from '../types/portfolio';
import { formatFileSize } from '../utils/mediaStorage';

interface CubeCardProps {
  item: PortfolioItem;
  onReplaceFile?: (itemId: string, file: File) => Promise<void>;
  onDeleteItem: (itemId: string) => void;
  onInspectItem: (item: PortfolioItem) => void;
}

export const CubeCard: React.FC<CubeCardProps> = ({
  item,
  onDeleteItem,
  onInspectItem,
}) => {
  const hasMedia = item.media.kind !== 'empty' && Boolean(item.media.url);

  return (
    <article className="perspective-block-wrap">
      <div className="perspective-block relative pt-3 pr-3 h-full flex flex-col">
        {/* 3D Perspective Top Extrusion */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-3 right-0 h-3 origin-bottom -skew-x-[45deg]"
          style={{ backgroundColor: item.accentColor }}
        />
        {/* 3D Perspective Right Extrusion */}
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 right-0 w-3 bg-[#12192B] border-r border-t border-b border-[#A3A9AE]/25 origin-left -skew-y-[45deg]"
        />

        {/* Cube Front Face */}
        <div className="relative flex-1 flex flex-col bg-[#1A243B] border border-[#A3A9AE]/30">
          {/* Media Viewport (16:10) */}
          <div className="relative aspect-[16/10] w-full bg-[#111829] border-b border-[#A3A9AE]/20 overflow-hidden flex items-center justify-center">
            {hasMedia ? (
              <>
                {item.media.kind === 'mp4' ? (
                  <video
                    src={item.media.url}
                    controls
                    playsInline
                    className="w-full h-full object-cover bg-black"
                  />
                ) : item.media.kind === 'pdf' ? (
                  <div className="w-full h-full relative bg-[#151E32] flex flex-col items-center justify-center p-5 text-center">
                    <iframe
                      src={`${item.media.url}#toolbar=0&navpanes=0&scrollbar=0`}
                      title={item.title}
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
                    />
                    <div className="relative z-10 bg-[#1F2B45]/95 border border-[#D5BA9E]/45 px-4 py-3 max-w-[85%]">
                      <div className="flex items-center justify-center gap-2 text-[#D5BA9E] mb-1">
                        <FileText className="w-5 h-5" aria-hidden="true" />
                        <span className="font-display text-xs">Documento PDF</span>
                      </div>
                      <p className="text-xs text-[#F4F1EC] truncate">
                        {item.media.fileName || 'Documento adjunto'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.media.url}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}

                <button
                  type="button"
                  onClick={() => onInspectItem(item)}
                  aria-label={`Abrir ${item.title} en visor`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2B45]/90 hover:bg-[#B24D60] text-[#F4F1EC] border border-[#A3A9AE]/40 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Abrir</span>
                </button>
              </>
            ) : (
              <div className="w-full h-full p-5 flex flex-col items-center justify-center text-center gap-2.5 select-none">
                <div className="flex items-center gap-2.5 text-[#A3A9AE]/60">
                  <ImageIcon className="w-5 h-5" aria-hidden="true" />
                  <Film className="w-5 h-5" aria-hidden="true" />
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#A3A9AE]">
                  Próximamente
                </span>
              </div>
            )}
          </div>

          {/* Cube Card Copy */}
          <div className="p-5 flex-1 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#A3A9AE]">
                <span className="font-semibold" style={{ color: item.accentColor }}>
                  {item.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{item.year}</span>
                {item.media.kind !== 'empty' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase">{item.media.kind}</span>
                  </>
                )}
              </div>

              <h3 className="font-display text-sm sm:text-base text-[#F4F1EC] leading-snug">
                {item.title}
              </h3>

              <p className="font-sans-body text-xs sm:text-sm text-[#A3A9AE] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Footer Controls */}
            <div className="pt-3 border-t border-[#A3A9AE]/20 flex items-center justify-between gap-2">
              <div className="text-[11px] text-[#A3A9AE] truncate max-w-[160px]">
                {item.media.fileName
                  ? `${item.media.fileName}${item.media.fileSize ? ` · ${formatFileSize(item.media.fileSize)}` : ''}`
                  : item.category}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {hasMedia && (
                  <button
                    type="button"
                    onClick={() => onInspectItem(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2B45] hover:bg-[#B24D60] text-[#F4F1EC] border border-[#A3A9AE]/40 hover:border-[#B24D60] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Abrir</span>
                  </button>
                )}

                {!item.isDefault && (
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    aria-label={`Eliminar ${item.title}`}
                    className="inline-flex items-center justify-center w-8 h-8 border border-[#B24D60]/40 text-[#B24D60] hover:bg-[#B24D60] hover:text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};