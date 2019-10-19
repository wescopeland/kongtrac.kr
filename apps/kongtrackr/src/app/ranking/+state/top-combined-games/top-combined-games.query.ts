import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import {
  TopCombinedGamesState,
  TopCombinedGamesStore
} from './top-combined-games.store';

@Injectable({ providedIn: 'root' })
export class TopCombinedGamesQuery extends QueryEntity<TopCombinedGamesState> {
  constructor(protected store: TopCombinedGamesStore) {
    super(store);
  }
}
