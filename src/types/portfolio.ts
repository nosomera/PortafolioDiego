export type MediaKind = 'png' | 'jpg' | 'mp4' | 'pdf' | 'empty';

export type DisciplineCategory =
  | 'Animación 3D'
  | 'Animación 2D'
  | 'Storyboards'
  | 'Concept Art'
  | 'Documento PDF';

export interface PortfolioMedia {
  kind: MediaKind;
  url: string;
  fileName?: string;
  fileSize?: number;
  storedId?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: DisciplineCategory;
  description: string;
  year: string;
  accentColor: '#B24D60' | '#D5BA9E' | '#A3A9AE';
  media: PortfolioMedia;
  isDefault?: boolean;
}

export interface CubeFaceItem {
  faceIndex: 0 | 1 | 2 | 3;
  label: string;
  title: string;
  category: DisciplineCategory;
  description: string;
  accentColor: '#B24D60' | '#D5BA9E' | '#A3A9AE';
  media: PortfolioMedia;
}

export interface HeroMediaState {
  title: string;
  caption: string;
  media: PortfolioMedia;
}
