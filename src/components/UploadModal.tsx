  import React, { useRef, useState } from 'react';
  import { FileText, Film, Image as ImageIcon, Upload, X } from 'lucide-react';
  import { DisciplineCategory } from '../types/portfolio';
  import { ACCEPTED_EXTENSIONS, detectMediaKind, formatFileSize } from '../utils/mediaStorage';

  interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateCube: (payload: {
      title: string;
      category: DisciplineCategory;
      description: string;
      accentColor: '#B24D60' | '#D5BA9E' | '#A3A9AE';
      file: File;
    }) => Promise<void>;
  }

  const CATEGORIES: DisciplineCategory[] = [
    'Animación 3D',
    'Animación 2D',
    'Storyboards',
    'Concept Art',
    'Documento PDF',
  ];

  const ACCENTS: Array<{ label: string; value: '#B24D60' | '#D5BA9E' | '#A3A9AE' }> = [
    { label: 'Carmín', value: '#B24D60' },
    { label: 'Arena', value: '#D5BA9E' },
    { label: 'Plata', value: '#A3A9AE' },
  ];

  export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onCreateCube }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<DisciplineCategory>('Animación 3D');
    const [description, setDescription] = useState('');
    const [accentColor, setAccentColor] = useState<'#B24D60' | '#D5BA9E' | '#A3A9AE'>('#D5BA9E');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleFileSelect = (file?: File) => {
      if (!file) return;
      const kind = detectMediaKind(file);
      if (!kind) {
        setErrorMsg('Solo se permiten archivos PNG, JPG, MP4 o PDF.');
        return;
      }
      setErrorMsg(null);
      setSelectedFile(file);
      if (!title.trim()) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' '));
      }
      if (kind === 'pdf') {
        setCategory('Documento PDF');
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedFile) {
        setErrorMsg('Selecciona un archivo PNG, JPG, MP4 o PDF primero.');
        return;
      }
      if (!title.trim()) {
        setErrorMsg('Escribe un título para el proyecto.');
        return;
      }

      setIsSubmitting(true);
      setErrorMsg(null);
      try {
        await onCreateCube({
          title: title.trim(),
          category,
          description:
            description.trim() ||
            'Proyecto agregado al portafolio de Diego Andres Pacheco Gómez.',
          accentColor,
          file: selectedFile,
        });
        setTitle('');
        setDescription('');
        setSelectedFile(null);
        onClose();
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Error al guardar el archivo.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1321]/85 backdrop-blur-sm"
      >
        <div className="relative w-full max-w-xl bg-[#1F2B45] border border-[#A3A9AE]/40 shadow-2xl overflow-hidden">
          {/* Top Accent Strip */}
          <div className="h-1.5 w-full bg-[#D5BA9E]" />

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#D5BA9E] mb-1">
                  Nuevo Cubo Multimedia
                </div>
                <h2 id="upload-modal-title" className="font-display text-lg sm:text-xl text-[#F4F1EC]">
                  Agregar PNG, JPG, MP4 o PDF
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana"
                className="w-10 h-10 inline-flex items-center justify-center border border-[#A3A9AE]/35 text-[#A3A9AE] hover:text-[#F4F1EC] hover:border-[#D5BA9E] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dropzone */}
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                className="hidden"
                onChange={(e) => {
                  handleFileSelect(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileSelect(e.dataTransfer.files?.[0]);
                }}
                className="w-full p-6 bg-[#151E32] border border-dashed border-[#D5BA9E]/55 hover:border-[#D5BA9E] text-center space-y-2 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3 text-[#D5BA9E]">
                  <ImageIcon className="w-5 h-5" aria-hidden="true" />
                  <Film className="w-5 h-5" aria-hidden="true" />
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                {selectedFile ? (
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-[#F4F1EC] truncate">
                      {selectedFile.name}
                    </div>
                    <div className="text-xs text-[#D5BA9E]">
                      {formatFileSize(selectedFile.size)} · Haz clic para cambiar archivo
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-[#F4F1EC] flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4 text-[#B24D60]" aria-hidden="true" />
                      <span>Seleccionar o arrastrar archivo</span>
                    </div>
                    <div className="text-xs text-[#A3A9AE]">
                      Formatos admitidos: PNG, JPG, MP4, PDF
                    </div>
                  </div>
                )}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-[#A3A9AE]">Título del proyecto</span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Walk Cycle 3D"
                    className="w-full px-3.5 py-2.5 bg-[#151E32] border border-[#A3A9AE]/35 text-sm text-[#F4F1EC] focus:outline-none focus:border-[#D5BA9E]"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-[#A3A9AE]">Disciplina</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DisciplineCategory)}
                    className="w-full px-3.5 py-2.5 bg-[#151E32] border border-[#A3A9AE]/35 text-sm text-[#F4F1EC] focus:outline-none focus:border-[#D5BA9E]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-[#A3A9AE]">Descripción breve</span>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe la técnica, software o historia del proyecto..."
                  className="w-full px-3.5 py-2.5 bg-[#151E32] border border-[#A3A9AE]/35 text-sm text-[#F4F1EC] focus:outline-none focus:border-[#D5BA9E] resize-none"
                />
              </label>

              <div className="space-y-1.5">
                <span className="text-xs font-medium text-[#A3A9AE]">Color superior del cubo</span>
                <div className="flex items-center gap-3">
                  {ACCENTS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setAccentColor(item.value)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium border cursor-pointer transition-colors ${
                        accentColor === item.value
                          ? 'border-[#F4F1EC] bg-[#151E32] text-[#F4F1EC]'
                          : 'border-[#A3A9AE]/30 text-[#A3A9AE] hover:text-[#F4F1EC]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 inline-block"
                        style={{ backgroundColor: item.value }}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="text-xs text-[#B24D60] font-semibold">
                  {errorMsg}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-[#A3A9AE]/35 text-xs sm:text-sm font-medium text-[#A3A9AE] hover:text-[#F4F1EC] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#B24D60] hover:bg-[#9D3E50] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'Guardando...' : 'Agregar Cubo al Portafolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
