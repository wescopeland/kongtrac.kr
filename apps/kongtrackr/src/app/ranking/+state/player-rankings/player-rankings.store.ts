import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { PlayerRanking } from './models/player-ranking.model';

export interface PlayerRankingsState extends EntityState<PlayerRanking> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'playerRankings' })
export class PlayerRankingsStore extends EntityStore<PlayerRankingsState> {
  constructor() {
    super();
  }
}
