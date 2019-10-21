import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import {
  PlayerRankingsState,
  PlayerRankingsStore
} from './player-rankings.store';

@Injectable({ providedIn: 'root' })
export class PlayerRankingsQuery extends QueryEntity<PlayerRankingsState> {
  constructor(protected store: PlayerRankingsStore) {
    super(store);
  }
}
