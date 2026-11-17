import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DisciplineCategory, PortfolioItem } from '../types/portfolio';
import { CubeCard } from './CubeCard';

interface ProjectArchiveProps {
  items: PortfolioItem[];
  onReplaceFile: (itemId: string, file: File) => Promise<void>;
  onDeleteItem: (itemId: string) => void;
  onInspectItem: (item: PortfolioItem) => void;
  onOpenUploadModal: () => void;
}

const CATEGORIES: Array<'Todos' | DisciplineCategory> = [
  'Todos',
  'Animación 3D',
  'Animación 2D',
  'Storyboards',
  'Concept Art',
  'Documento PDF',
];

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({
  items,
  onReplaceFile,
  onDeleteItem,
  onInspectItem,
  onOpenUploadModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'Todos' | DisciplineCategory>('Todos');

  const filteredItems =
    activeCategory === 'Todos'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="proyectos" className="py-20 sm:py-24 px-4 sm:px-8 border-b border-[#A3A9AE]/20">
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-[#D5BA9E] tracking-wide">
              Archivo Organizado en Cubos
            </div>
            <h2
              className="font-display text-2xl sm:text-4xl text-[#F4F1EC] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Proyectos y Espacios Multimedia
            </h2>
            <p className="font-sans-body text-sm sm:text-base text-[#A3A9AE] leading-relaxed">
              Cada cubo admite imágenes PNG y JPG, videos de animación en MP4 y documentos PDF. Haz clic en cualquier cubo para cargar, reemplazar o inspeccionar el material.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenUploadModal}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#B24D60] hover:bg-[#9D3E50] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start lg:self-auto"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Crear Nuevo Cubo</span>
          </button>
        </div>

        {/* Interactive Filter Bar */}
        <div
          role="tablist"
          aria-label="Filtrar proyectos por disciplina"
          className="flex flex-wrap items-center gap-2 border-b border-[#A3A9AE]/20 pb-4"
        >
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#D5BA9E] text-[#1F2B45] font-semibold'
                    : 'bg-[#151E32] text-[#A3A9AE] hover:text-[#F4F1EC] border border-[#A3A9AE]/25'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Cube Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <CubeCard
                key={item.id}
                item={item}
                onReplaceFile={onReplaceFile}
                onDeleteItem={onDeleteItem}
                onInspectItem={onInspectItem}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 bg-[#151E32] border border-[#A3A9AE]/30 text-center space-y-3">
            <p className="font-display text-base text-[#D5BA9E]">
              Sin archivos en esta categoría
            </p>
            <p className="text-sm text-[#A3A9AE]">
              Agrega un nuevo cubo con tus archivos PNG, JPG, MP4 o PDF en esta disciplina.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
