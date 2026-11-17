import React, { useEffect, useState } from 'react';
import { AboutAndSocialCubes } from './components/AboutAndSocialCubes';
import { HeroSection } from './components/HeroSection';
import { LightboxPayload, MediaLightbox } from './components/MediaLightbox';
import { Navbar } from './components/Navbar';
import { PerspectiveCubeScroll } from './components/PerspectiveCubeScroll';
import { ProjectArchive } from './components/ProjectArchive';
import { UploadModal } from './components/UploadModal';
import {
  ATTACHED_PORTFOLIO_PDF_URL,
  INITIAL_CUBE_FACES,
  INITIAL_HERO_MEDIA,
  INITIAL_PORTFOLIO_ITEMS,
} from './data/initialPortfolio';
import {
  CubeFaceItem,
  DisciplineCategory,
  HeroMediaState,
  PortfolioItem,
} from './types/portfolio';
import {
  deleteMediaFromFirebase,
  loadPortfolioFromFirebase,
  savePortfolioToFirebase,
  uploadMediaToFirebase,
} from './utils/firebase';

export default function App() {
  const [heroMedia, setHeroMedia] = useState<HeroMediaState>(INITIAL_HERO_MEDIA);
  const [cubeFaces, setCubeFaces] = useState<CubeFaceItem[]>(INITIAL_CUBE_FACES);
  const [items, setItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO_ITEMS);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [lightboxPayload, setLightboxPayload] = useState<LightboxPayload | null>(null);

  // Cargar portafolio desde Firebase Firestore al abrir la página
  useEffect(() => {
    let active = true;

    const fetchCloudPortfolio = async () => {
      try {
        const cloudData = await loadPortfolioFromFirebase();
        if (!active) return;

        if (cloudData) {
          if (cloudData.heroMedia) setHeroMedia(cloudData.heroMedia);
          if (cloudData.cubeFaces) setCubeFaces(cloudData.cubeFaces);
          if (cloudData.items) setItems(cloudData.items);
        } else {
          // Primera vez: inicializa el documento en Firestore con los datos base
          await savePortfolioToFirebase({
            heroMedia: INITIAL_HERO_MEDIA,
            cubeFaces: INITIAL_CUBE_FACES,
            items: INITIAL_PORTFOLIO_ITEMS,
          });
        }
      } catch (error) {
        console.error('Error al cargar el portafolio desde Firebase:', error);
      }
    };

    fetchCloudPortfolio();
    return () => {
      active = false;
    };
  }, []);

  // Subir archivo principal del Hero (1920x1080)
  const handleUploadHeroFile = async (file: File) => {
    const prevStoredId = heroMedia.media.storedId;
    const saved = await uploadMediaToFirebase(file);
    await deleteMediaFromFirebase(prevStoredId);

    const nextHero: HeroMediaState = { ...heroMedia, media: saved };
    setHeroMedia(nextHero);
    await savePortfolioToFirebase({ heroMedia: nextHero, cubeFaces, items });
  };

  // Limpiar archivo del Hero
  const handleClearHeroFile = async () => {
    await deleteMediaFromFirebase(heroMedia.media.storedId);

    setHeroMedia(INITIAL_HERO_MEDIA);
    await savePortfolioToFirebase({
      heroMedia: INITIAL_HERO_MEDIA,
      cubeFaces,
      items,
    });
  };

  // Subir imagen, video o PDF a una de las 4 caras del cubo giratorio
  const handleUploadToFace = async (faceIndex: 0 | 1 | 2 | 3, file: File) => {
    const existing = cubeFaces.find((f) => f.faceIndex === faceIndex);
    const saved = await uploadMediaToFirebase(file);
    await deleteMediaFromFirebase(existing?.media.storedId);

    const nextFaces = cubeFaces.map((face) =>
      face.faceIndex === faceIndex ? { ...face, media: saved } : face
    );
    setCubeFaces(nextFaces);
    await savePortfolioToFirebase({ heroMedia, cubeFaces: nextFaces, items });
  };

  // Reemplazar archivo de un cubo existente en Proyectos
  const handleReplaceItemFile = async (itemId: string, file: File) => {
    const existing = items.find((i) => i.id === itemId);
    const saved = await uploadMediaToFirebase(file);
    await deleteMediaFromFirebase(existing?.media.storedId);

    const nextItems = items.map((item) =>
      item.id === itemId ? { ...item, media: saved } : item
    );
    setItems(nextItems);
    await savePortfolioToFirebase({ heroMedia, cubeFaces, items: nextItems });
  };

  // Crear un nuevo cubo con imagen (PNG/JPG), video (MP4) o PDF
  const handleCreateCube = async (payload: {
    title: string;
    category: DisciplineCategory;
    description: string;
    accentColor: '#B24D60' | '#D5BA9E' | '#A3A9AE';
    file: File;
  }) => {
    const saved = await uploadMediaToFirebase(payload.file);
    const newItem: PortfolioItem = {
      id: `item_${Date.now()}`,
      title: payload.title,
      category: payload.category,
      description: payload.description,
      year: String(new Date().getFullYear()),
      accentColor: payload.accentColor,
      media: saved,
      isDefault: false,
    };

    const nextItems = [newItem, ...items];
    setItems(nextItems);
    await savePortfolioToFirebase({ heroMedia, cubeFaces, items: nextItems });
  };

  // Eliminar un cubo y borrar su archivo de Firebase Storage
  const handleDeleteItem = async (itemId: string) => {
    const target = items.find((i) => i.id === itemId);
    await deleteMediaFromFirebase(target?.media.storedId);

    const nextItems = items.filter((item) => item.id !== itemId);
    setItems(nextItems);
    await savePortfolioToFirebase({ heroMedia, cubeFaces, items: nextItems });
  };

  return (
    <div className="min-h-screen bg-[#1F2B45] text-[#F4F1EC] flex flex-col">
      <Navbar onOpenUpload={() => setUploadModalOpen(true)} />

      <main className="flex-1">
        {/* 1. Inicio: Nombre + Espacio 1920x1080 */}
        <HeroSection
  onInspectHero={() =>
    setLightboxPayload({
      title: 'Obra Principal — 1920 × 1080 px',
      subtitle: 'Diego Andres Pacheco Gómez · Formato 16:9',
      description: 'Portada tarde.png',
      media: {
        kind: 'png',
        url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Portada%20tarde.png?alt=media&token=f273a303-535d-4051-a6d2-f7ca409fcebe',
        fileName: 'Portada tarde.png',
      },
    })
  }
/>

        {/* 2. Cubo de 4 Caras al Scrollear */}
        <PerspectiveCubeScroll
          faces={cubeFaces}
          onUploadToFace={handleUploadToFace}
          onInspectFace={(face) =>
            setLightboxPayload({
              title: face.title,
              subtitle: `${face.label} · ${face.category}`,
              description: face.description,
              media: face.media,
            })
          }
        />

        {/* 3. Archivo de Proyectos Organizado en Cubos */}
        <ProjectArchive
          items={items}
          onReplaceFile={handleReplaceItemFile}
          onDeleteItem={handleDeleteItem}
          onInspectItem={(item) =>
            setLightboxPayload({
              title: item.title,
              subtitle: `${item.category} · ${item.year}`,
              description: item.description,
              media: item.media,
            })
          }
          onOpenUploadModal={() => setUploadModalOpen(true)}
        />

        {/* 4. Acerca de mí y Redes */}
        <AboutAndSocialCubes
          onOpenAttachedPdf={() =>
            setLightboxPayload({
              title: 'Portafolio 4.0 — Diego Andres Pacheco Gómez',
              subtitle: 'Documento PDF · Animación 3D, 2D & Storyboards',
              description: 'Portafolio original adjunto en formato PDF.',
              media: {
                kind: 'pdf',
                url: ATTACHED_PORTFOLIO_PDF_URL,
                fileName: 'Portafolio_4.0_05803477.pdf',
              },
            })
          }
        />
      </main>

      <footer className="bg-[#12192B] border-t border-[#A3A9AE]/20 py-8 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A9AE]">
          <div>
            © {new Date().getFullYear()} Diego Andres Pacheco Gómez · Animación 3D, 2D y Storyboards
          </div>
          <div className="flex items-center gap-6">
            <a href="#inicio" className="hover:text-[#D5BA9E] transition-colors">
              Inicio
            </a>
            <a href="#cubo-4-caras" className="hover:text-[#D5BA9E] transition-colors">
              Cubo 4 Caras
            </a>
            <a href="#proyectos" className="hover:text-[#D5BA9E] transition-colors">
              Proyectos
            </a>
            <a href="#acerca" className="hover:text-[#D5BA9E] transition-colors">
              Acerca de mí
            </a>
          </div>
        </div>
      </footer>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onCreateCube={handleCreateCube}
      />

      <MediaLightbox
        payload={lightboxPayload}
        onClose={() => setLightboxPayload(null)}
      />
    </div>
  );
}