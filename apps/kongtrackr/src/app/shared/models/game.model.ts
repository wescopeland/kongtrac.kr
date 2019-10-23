export interface Game {
  boardScores: number[];
  date: string;
  deaths: Array<{ board: number; points: number }>;
  gameId: string;
  hasCompleteData: boolean;
  isKillscreen: boolean;
  platform: 'Arcade' | 'MAME' | 'JAMMA';
  player: string;
  score: number;
  $id?: string;
  concealedDay?: boolean;
  concealedMonth?: boolean;
  mameVersion?: string;
  event?: string;
}
