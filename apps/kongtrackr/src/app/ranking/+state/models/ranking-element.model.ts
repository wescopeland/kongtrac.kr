export interface RankingElement {
  rank?: number;
  platform: 'arcade' | 'emulator' | 'other';
  name: string;
  score: number;
  date: string;
  playerId?: string;
  id?: string;
}
