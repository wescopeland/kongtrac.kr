import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { DbStatsState } from '../models/db-stats-state.model';

export function createInitialState(): DbStatsState {
  return {
    games: null,
    players: null,
    killScreens: null,
    events: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dbStats' })
export class DbStatsStore extends Store<DbStatsState> {
  constructor() {
    super(createInitialState());
  }
}
