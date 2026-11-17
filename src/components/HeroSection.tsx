import React from 'react';
import { ArrowDown, Maximize2 } from 'lucide-react';
import { HeroMediaState } from '../types/portfolio';
import { IsometricCube } from './IsometricCubeArtwork';

const HERO_IMAGE_URL =
  'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Portada%20tarde.png?alt=media&token=f273a303-535d-4051-a6d2-f7ca409fcebe';

interface HeroSectionProps {
  heroMedia?: HeroMediaState;
  onUploadHeroFile?: (file: File) => Promise<void>;
  onClearHeroFile?: () => void;
  onInspectHero: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onInspectHero }) => {
  return (
    <section
      id="inicio"
      className="relative pt-10 pb-20 sm:pt-14 sm:pb-24 px-4 sm:px-8 border-b border-[#A3A9AE]/20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top Segment: Name & Sculptural Perspective Cubes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-9 space-y-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-[#D5BA9E] tracking-wide">
              <span>Portafolio Profesional</span>
              <span aria-hidden="true" className="text-[#A3A9AE]">·</span>
              <span className="text-[#A3A9AE]">Animación 3D</span>
              <span aria-hidden="true" className="text-[#A3A9AE]">·</span>
              <span className="text-[#A3A9AE]">Animación 2D</span>
              <span aria-hidden="true" className="text-[#A3A9AE]">·</span>
              <span className="text-[#A3A9AE]">Storyboards</span>
            </div>

            <h1
              className="font-display text-[clamp(2rem,4.5vw,3.9rem)] leading-[1.06] tracking-tight text-[#F4F1EC]"
              style={{ textWrap: 'balance' }}
            >
              Diego Andres{' '}
              <span className="text-[#D5BA9E] block sm:inline">Pacheco Gómez</span>
            </h1>

            <p className="font-sans-body text-base sm:text-lg text-[#A3A9AE] max-w-2xl leading-relaxed">
              Animador y artista visual enfocado en narrativa cinematográfica, modelado y animación 3D,
              animación 2D cuadro a cuadro y desarrollo de storyboards.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#cubo-4-caras"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#B24D60] hover:bg-[#9D3E50] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explorar Cubo 4 Caras</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Architectural Cube Accent */}
          <div className="hidden lg:flex lg:col-span-3 justify-end items-end gap-3 pb-1">
            <IsometricCube
              size={84}
              topColor="#D5BA9E"
              leftColor="#B24D60"
              rightColor="#151E32"
              strokeColor="#A3A9AE"
            />
            <IsometricCube
              size={112}
              topColor="#A3A9AE"
              leftColor="#1F2B45"
              rightColor="#B24D60"
              strokeColor="#D5BA9E"
              className="-ml-8 mb-6"
            />
          </div>
        </div>

        {/* Dedicated 1920 x 1080 px (16:9) Visual Frame with 3D Cube Perspective Bevel */}
        <div className="relative pt-3 pr-3 sm:pt-4 sm:pr-4">
          {/* 3D Perspective Top Extruded Face */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-3 right-0 h-3 sm:h-4 bg-[#D5BA9E] origin-bottom -skew-x-[45deg]"
          />
          {/* 3D Perspective Right Extruded Face */}
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 right-0 w-3 sm:w-4 bg-[#B24D60] origin-left -skew-y-[45deg]"
          />

          <div className="relative w-full aspect-video bg-[#151E32] border border-[#A3A9AE]/35 overflow-hidden">
            <img
              src={HERO_IMAGE_URL}
              alt="Obra principal 1920 × 1080 de Diego Andres Pacheco Gómez"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Controls Overlay on Media */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={onInspectHero}
                aria-label="Ver en pantalla completa"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1F2B45]/90 hover:bg-[#1F2B45] text-[#F4F1EC] border border-[#A3A9AE]/40 text-xs font-medium cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clean Unboxed Metadata Strip Below 1920x1080 Frame */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A3A9AE]">
          <div className="flex flex-wrap items-center gap-2 tabular-nums">
            <span className="text-[#D5BA9E] font-semibold">1920 × 1080 px</span>
            <span aria-hidden="true">·</span>
            <span>Proporción 16:9</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F4F1EC]">Portada tarde.png</span>
          </div>
        </div>
      </div>
    </section>
  );
};