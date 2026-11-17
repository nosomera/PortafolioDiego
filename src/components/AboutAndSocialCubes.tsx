import React from 'react';
import { ExternalLink, FileText, Mail } from 'lucide-react';
import { ATTACHED_PORTFOLIO_PDF_URL } from '../data/initialPortfolio';
import { IsometricCube } from './IsometricCubeArtwork';

interface AboutAndSocialCubesProps {
  onOpenAttachedPdf: () => void;
}

export const AboutAndSocialCubes: React.FC<AboutAndSocialCubesProps> = ({
  onOpenAttachedPdf,
}) => {
  return (
    <section id="acerca" className="py-20 sm:py-24 px-4 sm:px-8 bg-[#151E32]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#D5BA9E] tracking-wide">
              Perfil Profesional
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-[#F4F1EC] tracking-tight">
              Acerca de mí y Contacto
            </h2>
          </div>

          <IsometricCube
            size={72}
            topColor="#D5BA9E"
            leftColor="#B24D60"
            rightColor="#1F2B45"
            className="hidden sm:block shrink-0"
          />
        </div>

        {/* Interlocking 2-Column Perspective Cubes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Cube 1: Acerca de mí */}
          <div className="lg:col-span-7 perspective-block-wrap">
            <div className="perspective-block relative pt-3.5 pr-3.5 h-full">
              <div
                aria-hidden="true"
                className="absolute top-0 left-3.5 right-0 h-3.5 bg-[#D5BA9E] origin-bottom -skew-x-[45deg]"
              />
              <div
                aria-hidden="true"
                className="absolute top-3.5 bottom-3.5 right-0 w-3.5 bg-[#12192B] border-r border-t border-b border-[#A3A9AE]/25 origin-left -skew-y-[45deg]"
              />

              <div className="relative h-full bg-[#1F2B45] border border-[#A3A9AE]/35 p-6 sm:p-10 flex flex-col justify-between gap-8">
                <div className="space-y-5">
                  <div className="text-xs font-semibold text-[#D5BA9E]">
                    Biografía · Taller 5
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-[#F4F1EC] leading-snug">
                    Diego Andres Pacheco Gómez
                  </h3>

                  <p className="font-sans-body text-sm sm:text-base text-[#F4F1EC]/90 leading-relaxed max-w-2xl">
                    Animador de 24 años, actualmente estudiando en Taller 5. Mi trabajo combina la
                    construcción espacial en perspectiva con narrativa cinematográfica a través de
                    animación 3D, animación 2D, stop motion, diseño de personajes y storyboards.
                  </p>
                </div>

                {/* Disciplines Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#A3A9AE]/25">
                  <div>
                    <div className="font-display text-sm text-[#D5BA9E]">3D</div>
                    <div className="text-xs text-[#A3A9AE] mt-1">Modelado y movimiento</div>
                  </div>
                  <div>
                    <div className="font-display text-sm text-[#B24D60]">2D</div>
                    <div className="text-xs text-[#A3A9AE] mt-1">Personajes y concept</div>
                  </div>
                  <div>
                    <div className="font-display text-sm text-[#F4F1EC]">Story</div>
                    <div className="text-xs text-[#A3A9AE] mt-1">Guion gráfico</div>
                  </div>
                  <div>
                    <div className="font-display text-sm text-[#A3A9AE]">Stop</div>
                    <div className="text-xs text-[#A3A9AE] mt-1">Cuadro a cuadro</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cube 2: Redes Sociales & PDF */}
          <div className="lg:col-span-5 perspective-block-wrap">
            <div className="perspective-block relative pt-3.5 pr-3.5 h-full">
              <div
                aria-hidden="true"
                className="absolute top-0 left-3.5 right-0 h-3.5 bg-[#B24D60] origin-bottom -skew-x-[45deg]"
              />
              <div
                aria-hidden="true"
                className="absolute top-3.5 bottom-3.5 right-0 w-3.5 bg-[#12192B] border-r border-t border-b border-[#A3A9AE]/25 origin-left -skew-y-[45deg]"
              />

              <div className="relative h-full bg-[#1F2B45] border border-[#A3A9AE]/35 p-6 sm:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-5">
                  <div className="text-xs font-semibold text-[#B24D60]">
                    Redes Sociales y Dossier
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-[#F4F1EC]">
                    Conecta conmigo
                  </h3>

                  <div className="space-y-3 text-sm">
                    <a
                      href="https://www.instagram.com/underworlddwarf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-[#151E32] border border-[#A3A9AE]/25 hover:border-[#D5BA9E] transition-colors group"
                    >
                      <div>
                        <div className="text-xs text-[#A3A9AE]">Instagram</div>
                        <div className="font-semibold text-[#F4F1EC] group-hover:text-[#D5BA9E] transition-colors">
                          @underworlddwarf
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#A3A9AE] group-hover:text-[#D5BA9E]" aria-hidden="true" />
                    </a>

                    <a
                      href="https://www.artstation.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-[#151E32] border border-[#A3A9AE]/25 hover:border-[#D5BA9E] transition-colors group"
                    >
                      <div>
                        <div className="text-xs text-[#A3A9AE]">ArtStation</div>
                        <div className="font-semibold text-[#F4F1EC] group-hover:text-[#D5BA9E] transition-colors">
                          Diego Andres Pacheco Gómez
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#A3A9AE] group-hover:text-[#D5BA9E]" aria-hidden="true" />
                    </a>

                    <a
                      href="mailto:diego.pacheco@taller5.edu.co"
                      className="flex items-center justify-between p-3.5 bg-[#151E32] border border-[#A3A9AE]/25 hover:border-[#D5BA9E] transition-colors group"
                    >
                      <div className="min-w-0">
                        <div className="text-xs text-[#A3A9AE]">Correo Electrónico</div>
                        <div className="font-semibold text-[#F4F1EC] truncate group-hover:text-[#D5BA9E] transition-colors">
                          diego.pacheco@taller5.edu.co
                        </div>
                      </div>
                      <Mail className="w-4 h-4 text-[#A3A9AE] group-hover:text-[#D5BA9E] shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Attached PDF Direct Action */}
                <div className="pt-4 border-t border-[#A3A9AE]/25 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenAttachedPdf}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#D5BA9E] hover:bg-[#E2CBB2] text-[#1F2B45] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    <span>Ver Portafolio PDF</span>
                  </button>
                  <a
                    href={ATTACHED_PORTFOLIO_PDF_URL}
                    download="Portafolio_Diego_Pacheco.pdf"
                    className="px-4 py-3 border border-[#A3A9AE]/40 hover:border-[#D5BA9E] text-xs sm:text-sm font-semibold text-[#F4F1EC] transition-colors"
                  >
                    Descargar PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
