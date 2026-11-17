import { CubeFaceItem, HeroMediaState, PortfolioItem } from '../types/portfolio';

export const ATTACHED_PORTFOLIO_PDF_URL = '/assets/aistudio/Portafolio_4.0_05803477.pdf';

export const INITIAL_HERO_MEDIA: HeroMediaState = {
  title: 'Showreel & Obra Principal',
  caption: 'Espacio principal de 1920 × 1080 px listo para tu imagen PNG, JPG o video MP4',
  media: {
    kind: 'empty',
    url: '',
  },
};

export const INITIAL_CUBE_FACES: CubeFaceItem[] = [
  {
    faceIndex: 0,
    label: 'Cara 01',
    title: 'Una muerte en el espacio',
    category: 'Storyboards',
    description:
      'Un hombre en una nave espacial es golpeado por un asteroide; sobrevive al impacto, pero no por mucho tiempo.',
    accentColor: '#B24D60',
    media: {
      kind: 'pdf',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Una%20muerte%20en%20el%20espacio%20Final.pdf?alt=media&token=f41e3754-70cd-4978-804c-30dc59c722ea',
    },
  },
  {
    faceIndex: 1,
    label: 'Cara 02',
    title: 'Modelo Dragon',
    category: 'Animación 3D',
    description:
      'Exploración visual de utilería, criaturas de un mundo fantastico',
    accentColor: '#D5BA9E',
    media: {
      kind: 'mp4',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Sequence%2001.mp4?alt=media&token=1e6341b1-0ae3-4827-ad4a-92d1bda873e9',
    },
  },
  {
    faceIndex: 2,
    label: 'Cara 03',
    title: 'Stop Motion & Animación 3D',
    category: 'Animación 3D',
    description:
      'Secuencia cuadro a cuadro y movimiento tridimensional: la historia de un zombie que decide comerse a sí mismo.',
    accentColor: '#A3A9AE',
    media: {
      kind: 'mp4',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Diego%20Andres%20Pacheco.mp4?alt=media&token=3d879021-7b3b-43fa-b2ff-a2bc8fce2c7c',
    },
  },
  {
    faceIndex: 3,
    label: 'Cara 04',
    title: 'Portafolio Completo 4.0',
    category: 'Documento PDF',
    description:
      'Documento PDF original con la recopilación de storyboards, diseño de personajes, stop motion y concept art.',
    accentColor: '#D5BA9E',
    media: {
      kind: 'pdf',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Portafolio%204.0.pdf?alt=media&token=23e48fb5-0ac3-4791-8883-728bbce8cad3',
      fileName: 'Portafolio_4.0_05803477.pdf',
    },
  },
];

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'item-pdf-portafolio',
    title: 'Portafolio 4.0 (Documento PDF)',
    category: 'Documento PDF',
    description:
      'Archivo PDF completo de Diego Andres Pacheco Gómez con proyectos en perspectiva cúbica, storyboard y personajes.',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'pdf',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Portafolio%204.0.pdf?alt=media&token=23e48fb5-0ac3-4791-8883-728bbce8cad3',
      fileName: 'Portafolio_4.0_05803477.pdf',
    },
    isDefault: true,
  },
  {
    id: 'item-storyboard-espacio',
    title: 'Una muerte en el espacio',
    category: 'Storyboards',
    description:
      'Espacio asignado para las láminas PNG/JPG o animatic MP4 del storyboard en la nave espacial.',
    year: '2026',
    accentColor: '#B24D60',
    media: {
      kind: 'empty',
      url: '',
    },
    isDefault: true,
  },
  {
    id: 'item-concept-western',
    title: 'Western Espacial — Props & Concept',
    category: 'Concept Art',
    description:
      'Espacio para subir ilustraciones PNG o JPG de props, armas futuristas y criaturas.',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'empty',
      url: '',
    },
    isDefault: true,
  },
  {
    id: 'item-stop-motion',
    title: 'Corto Stop Motion & 3D',
    category: 'Animación 3D',
    description:
      'Espacio preparado para reproducir tu archivo MP4 de animación 3D o stop motion.',
    year: '2026',
    accentColor: '#A3A9AE',
    media: {
      kind: 'empty',
      url: '',
    },
    isDefault: true,
  },
  {
    id: 'item-animacion-2d',
    title: 'Diseño de Personajes & 2D',
    category: 'Animación 2D',
    description:
      'Espacio para tus hojas de personaje, turnarounds en PNG/JPG o pruebas de línea en MP4.',
    year: '2026',
    accentColor: '#B24D60',
    media: {
      kind: 'empty',
      url: '',
    },
    isDefault: true,
  },
  {
    id: 'item-dossier-pdf',
    title: 'Anexo Técnico o Dossier PDF',
    category: 'Documento PDF',
    description:
      'Espacio adicional para agregar otro guion gráfico, biblia de animación o dossier en formato PDF.',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'empty',
      url: '',
    },
    isDefault: true,
  },
];
