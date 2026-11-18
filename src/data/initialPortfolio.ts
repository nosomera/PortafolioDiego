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
      'Documento de diseño de muerte en el espacio',
    year: '2026',
    accentColor: '#B24D60',
    media: {
      kind: 'pdf',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Una%20muerte%20en%20el%20espacio%20Final.pdf?alt=media&token=f41e3754-70cd-4978-804c-30dc59c722ea',
    },
    isDefault: true,
  },
  {
    id: 'item-concept-western',
    title: 'Western Espacial — Props & Concept',
    category: 'Concept Art',
    description:
      'Concept del personaje principal del wostern',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'png',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Personaje%20Pose%201.png?alt=media&token=27bfa503-a864-41b6-9f57-9486ed10b90f',
    },
    isDefault: true,
  },
  {
    id: 'item-stop-motion',
    title: 'Modelado 3D',
    category: 'Animación 3D',
    description:
      'Muestra de dargon esculpido en zbrush',
    year: '2026',
    accentColor: '#A3A9AE',
    media: {
      kind: 'mp4',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Sequence%2001.mp4?alt=media&token=1e6341b1-0ae3-4827-ad4a-92d1bda873e9',
    },
    isDefault: true,
  },
  {
    id: 'item-animacion-2d',
    title: 'Diseño de Personajes & 2D',
    category: 'Animación 2D',
    description:
      'Diseño de personaje a color',
    year: '2026',
    accentColor: '#B24D60',
    media: {
      kind: 'png',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Personaje%20turn%20around%20with%20color.png?alt=media&token=dff29385-4efd-41b7-be75-9b8ccaffe812',
    },
    isDefault: true,
  },
  {
    id: 'item-dossier-pdf',
    title: 'Ilustracion basada en Cult of Lamp',
    category: 'Documento PDF',
    description:
      'Ilustracion basada en el estilo visual de Cult of Lamp',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'png',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Ejercicio%203D%203.2%20Final.png?alt=media&token=9095dea4-2580-4ac9-959d-c29ef286cdc6',
    },
    isDefault: true,
  },

    {
    id: 'item-dossier-pdf',
    title: 'Sketch de una animacion',
    category: 'Animación 2D',
    description:
      'Animacion de estudio y prueba basado en una idea sobre el choque de un sudmarino',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'mp4',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Primera%20fase_1.mp4?alt=media&token=dda52ed6-a822-45a2-951a-42ae17062b2f',
    },
    isDefault: true,
  },

      {
    id: 'item-dossier-pdf',
    title: 'Stop Motion',
    category: 'Animación 3D',
    description:
      'Una muestra de una animacion Stop Motion',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'mp4',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/Diego%20Andres%20Pacheco.mp4?alt=media&token=3d879021-7b3b-43fa-b2ff-a2bc8fce2c7c',
    },
    isDefault: true,
  },

  
      {
    id: 'item-dossier-pdf',
    title: 'Corporacion Universitaria Taller 5',
    category: 'Concept Art',
    description:
      'Institucion de aprendizaje Taller 5',
    year: '2026',
    accentColor: '#D5BA9E',
    media: {
      kind: 'png',
      url: 'https://firebasestorage.googleapis.com/v0/b/messapp-bdcdd.firebasestorage.app/o/LOGO_T5_500X500_NEGATIVO.png?alt=media&token=de30cb5b-e9ba-47e2-b2aa-7313b7d1ec62',
    },
    isDefault: true,
  },


];
