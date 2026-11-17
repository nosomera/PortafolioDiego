import React, { useState } from 'react';
import { Menu, Plus, X } from 'lucide-react';

interface NavbarProps {
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenUpload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#cubo-4-caras', label: 'Cubo 4 Caras' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#acerca', label: 'Acerca de mí' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1F2B45]/95 backdrop-blur-md border-b border-[#A3A9AE]/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <a
          href="#inicio"
          className="font-display text-sm sm:text-base tracking-wider text-[#F4F1EC] hover:text-[#D5BA9E] transition-colors whitespace-nowrap shrink-0"
        >
          Diego Pacheco
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A3A9AE]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#D5BA9E] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D5BA9E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F4F1EC] border border-[#A3A9AE]/30 hover:border-[#D5BA9E] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#172035] border-b border-[#A3A9AE]/25 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-[#F4F1EC] hover:text-[#D5BA9E] hover:bg-[#1F2B45] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenUpload();
            }}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#B24D60] hover:bg-[#9D3E50] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Agregar Archivo (PNG, JPG, MP4, PDF)</span>
          </button>
        </div>
      )}
    </header>
  );
};
