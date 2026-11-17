import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Film,
  Image as ImageIcon,
  Maximize2,
  Rotate3d,
} from 'lucide-react';
import { CubeFaceItem, MediaKind } from '../types/portfolio';
import { IsometricCube } from './IsometricCubeArtwork';

// Pega aquí los enlaces de Firebase Storage para cada una de las 4 caras del cubo
// En 'kind' indica el formato exacto: 'png' | 'jpg' | 'mp4' | 'pdf'
const CUBE_FACES_MEDIA: Record<
  0 | 1 | 2 | 3,
  {
    url: string;
    kind: MediaKind;
    fileName?: string;
  }
> = {
  0: {
    url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Una%20muerte%20en%20el%20espacio%20Final.pdf?alt=media&token=f41e3754-70cd-4978-804c-30dc59c722ea',
    kind: 'pdf',
    fileName: 'Cara_1.pdf',
  },
  1: {
    url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Sequence%2001.mp4?alt=media&token=1e6341b1-0ae3-4827-ad4a-92d1bda873e9',
    kind: 'mp4',
    fileName: 'Cara_2.mp4',
  },
  2: {
    url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Diego%20Andres%20Pacheco.mp4?alt=media&token=3d879021-7b3b-43fa-b2ff-a2bc8fce2c7c',
    kind: 'mp4',
    fileName: 'Cara_3.mp4',
  },
  3: {
    url: 'PEGA_AQUI_TU_LINK_DE_FIREBASE_CARA_4',
    kind: 'jpg',
    fileName: 'Cara_4.jpg',
  },
};

interface PerspectiveCubeScrollProps {
  faces: CubeFaceItem[];
  onUploadToFace?: (faceIndex: 0 | 1 | 2 | 3, file: File) => Promise<void>;
  onInspectFace: (face: CubeFaceItem) => void;
}

export const PerspectiveCubeScroll: React.FC<PerspectiveCubeScrollProps> = ({
  faces,
  onInspectFace,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cubeBoxRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [boxSize, setBoxSize] = useState({ width: 880, height: 480 });
  const [axis, setAxis] = useState<'X' | 'Y'>('Y');

  // Combina los textos de cada cara con los enlaces configurados en CUBE_FACES_MEDIA
  const resolvedFaces: CubeFaceItem[] = faces.map((face) => {
    const custom = CUBE_FACES_MEDIA[face.faceIndex];
    if (custom && custom.url && !custom.url.startsWith('PEGA_AQUI_')) {
      return {
        ...face,
        media: {
          kind: custom.kind,
          url: custom.url,
          fileName: custom.fileName || face.title,
        },
      };
    }
    return face;
  });

  // Measure cube viewport box for mathematically exact 3D cube seams
  useEffect(() => {
    const el = cubeBoxRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setBoxSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll listener driving the 0 -> 270deg 4-face rotation
  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const stickyHeight = window.innerHeight - 64;
        const scrollable = track.offsetHeight - stickyHeight;
        if (scrollable <= 0) {
          setScrollProgress(0);
          return;
        }
        const passed = -(rect.top - 64);
        const clamped = Math.max(0, Math.min(1, passed / scrollable));
        setScrollProgress(clamped);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const activeFaceIndex = Math.min(3, Math.round(scrollProgress * 3)) as 0 | 1 | 2 | 3;
  const rotationDeg = scrollProgress * 270;
  const halfDepth = axis === 'Y' ? boxSize.width / 2 : boxSize.height / 2;

  const scrollToFace = (faceIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const stickyHeight = window.innerHeight - 64;
    const scrollable = track.offsetHeight - stickyHeight;
    const trackTop = window.scrollY + track.getBoundingClientRect().top - 64;
    const targetY = trackTop + (faceIndex / 3) * scrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const getFaceTransform = (index: number) => {
    if (axis === 'Y') {
      return `rotateY(${index * 90}deg) translateZ(${halfDepth}px)`;
    }
    return `rotateX(${-index * 90}deg) translateZ(${halfDepth}px)`;
  };

  const cubeBodyTransform =
    axis === 'Y'
      ? `translateZ(${-halfDepth}px) rotateY(${-rotationDeg}deg)`
      : `translateZ(${-halfDepth}px) rotateX(${rotationDeg}deg)`;

  return (
    <section
      id="cubo-4-caras"
      ref={trackRef}
      className="relative min-h-[320vh] bg-[#151E32] border-b border-[#A3A9AE]/20"
    >
      {/* Sticky 3D Viewport */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 overflow-hidden">
        {/* Ambient Decorative Perspective Cubes responding subtly to rotation */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 top-24 opacity-20 hidden xl:block transition-transform duration-150"
          style={{ transform: `translateY(${(scrollProgress - 0.5) * -60}px)` }}
        >
          <IsometricCube size={130} topColor="#D5BA9E" leftColor="#B24D60" rightColor="#1F2B45" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 bottom-20 opacity-20 hidden xl:block transition-transform duration-150"
          style={{ transform: `translateY(${(scrollProgress - 0.5) * 60}px)` }}
        >
          <IsometricCube size={140} topColor="#A3A9AE" leftColor="#1F2B45" rightColor="#D5BA9E" />
        </div>

        {/* Section Header Bar */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-wrap items-center justify-between gap-4 z-10">
          <div>
            <div className="text-xs font-medium text-[#D5BA9E] tracking-wide mb-1">
              Galería en Perspectiva · Desplázate para girar el cubo
            </div>
            <h2 className="font-display text-lg sm:text-2xl text-[#F4F1EC] tracking-tight">
              Cubo Interactivo de 4 Caras
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Axis Switch */}
            <div className="inline-flex items-center bg-[#1F2B45] border border-[#A3A9AE]/30 p-1">
              <button
                type="button"
                onClick={() => setAxis('Y')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  axis === 'Y'
                    ? 'bg-[#B24D60] text-white'
                    : 'text-[#A3A9AE] hover:text-[#F4F1EC]'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Giro Horizontal</span>
              </button>
              <button
                type="button"
                onClick={() => setAxis('X')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  axis === 'X'
                    ? 'bg-[#B24D60] text-white'
                    : 'text-[#A3A9AE] hover:text-[#F4F1EC]'
                }`}
              >
                <span>Giro Vertical</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center 3D Cube Container */}
        <div className="max-w-[1160px] w-full mx-auto flex-1 flex items-center justify-center my-3 sm:my-4 min-h-0 z-10">
          <div
            ref={cubeBoxRef}
            className="cube-scene relative w-full h-full max-h-[540px] min-h-[300px]"
          >
            <div
              className="cube-body relative w-full h-full"
              style={{ transform: cubeBodyTransform }}
            >
              {resolvedFaces.map((face) => {
                const hasMedia = face.media.kind !== 'empty' && Boolean(face.media.url);

                return (
                  <div
                    key={face.faceIndex}
                    style={{ transform: getFaceTransform(face.faceIndex) }}
                    className="cube-face bg-[#1F2B45] border border-[#A3A9AE]/40 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl"
                  >
                    {/* Media Side (7 cols on desktop) */}
                    <div className="lg:col-span-7 relative bg-[#0F1626] border-b lg:border-b-0 lg:border-r border-[#A3A9AE]/25 min-h-[190px] sm:min-h-[260px] flex items-center justify-center overflow-hidden">
                      {hasMedia ? (
                        <>
                          {face.media.kind === 'mp4' ? (
                            <video
                              src={face.media.url}
                              controls
                              playsInline
                              className="w-full h-full object-cover bg-black"
                            />
                          ) : face.media.kind === 'pdf' ? (
                            <iframe
                              src={`${face.media.url}#view=FitH`}
                              title={face.title}
                              className="w-full h-full bg-[#151E32]"
                            />
                          ) : (
                            <img
                              src={face.media.url}
                              alt={face.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          )}

                          <button
                            type="button"
                            onClick={() => onInspectFace(face)}
                            aria-label={`Ampliar ${face.title}`}
                            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2B45]/90 hover:bg-[#B24D60] text-[#F4F1EC] border border-[#A3A9AE]/40 text-xs font-medium transition-colors cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Ver completo</span>
                          </button>
                        </>
                      ) : (
                        <div className="p-6 text-center space-y-3 max-w-sm">
                          <div className="flex items-center justify-center gap-3 text-[#D5BA9E]">
                            <ImageIcon className="w-6 h-6" aria-hidden="true" />
                            <Film className="w-6 h-6" aria-hidden="true" />
                            <FileText className="w-6 h-6" aria-hidden="true" />
                          </div>
                          <div className="font-display text-xs sm:text-sm text-[#F4F1EC]">
                            {face.label}
                          </div>
                          <p className="text-xs text-[#A3A9AE] leading-relaxed">
                            Configura el enlace de Firebase Storage para esta cara en CUBE_FACES_MEDIA.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Editorial Content Side (5 cols on desktop) */}
                    <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between bg-[#1F2B45]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span
                            className="font-semibold tracking-wide"
                            style={{ color: face.accentColor }}
                          >
                            {face.label}
                          </span>
                          <span className="text-[#A3A9AE]">{face.category}</span>
                        </div>

                        <h3
                          className="font-display text-lg sm:text-2xl text-[#F4F1EC] leading-snug"
                          style={{ textWrap: 'balance' }}
                        >
                          {face.title}
                        </h3>

                        <p className="font-sans-body text-xs sm:text-sm text-[#A3A9AE] leading-relaxed">
                          {face.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#A3A9AE]/20 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-[#A3A9AE] tabular-nums">
                          Ángulo: {Math.round(rotationDeg)}° · Cara {face.faceIndex + 1} / 4
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Cube Navigation Controls */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-wrap items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {resolvedFaces.map((face) => {
              const active = activeFaceIndex === face.faceIndex;
              return (
                <button
                  key={face.faceIndex}
                  type="button"
                  onClick={() => scrollToFace(face.faceIndex)}
                  className={`px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                    active
                      ? 'bg-[#D5BA9E] text-[#1F2B45] border-[#D5BA9E]'
                      : 'bg-[#1F2B45] text-[#A3A9AE] border-[#A3A9AE]/30 hover:text-[#F4F1EC] hover:border-[#D5BA9E]/50'
                  }`}
                >
                  {face.label} · {face.category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollToFace(Math.max(0, activeFaceIndex - 1))}
              disabled={activeFaceIndex === 0}
              aria-label="Cara anterior del cubo"
              className="w-10 h-10 inline-flex items-center justify-center bg-[#1F2B45] border border-[#A3A9AE]/35 text-[#F4F1EC] hover:border-[#D5BA9E] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToFace(Math.min(3, activeFaceIndex + 1))}
              disabled={activeFaceIndex === 3}
              aria-label="Siguiente cara del cubo"
              className="w-10 h-10 inline-flex items-center justify-center bg-[#1F2B45] border border-[#A3A9AE]/35 text-[#F4F1EC] hover:border-[#D5BA9E] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};