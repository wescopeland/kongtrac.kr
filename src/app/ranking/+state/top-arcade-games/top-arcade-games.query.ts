import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import {
  TopArcadeGamesState,
  TopArcadeGamesStore
} from './top-arcade-games.store';

@Injectable({ providedIn: 'root' })
export class TopArcadeGamesQuery extends QueryEntity<TopArcadeGamesState> {
  constructor(protected store: TopArcadeGamesStore) {
    super(store);
  }
}
