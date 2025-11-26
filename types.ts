export type FontStyle = 'sans' | 'serif' | 'mono';

export interface PosterData {
  title: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontStyle: FontStyle;
  backgroundImageUrl?: string;
}

export enum GeneratorStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
