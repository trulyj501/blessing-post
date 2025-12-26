
export interface BlessingCard {
  id: string;
  recipient: string;
  theme: string;
  message: string;
  imageUrl: string;
  createdAt: number;
}

export interface FigureData {
  id: string;
  cardId: string;
  figureImageUrl: string;
  description: string;
}

export type ViewType = 'home' | 'card-gen' | 'figure-gen' | 'mail-service';
