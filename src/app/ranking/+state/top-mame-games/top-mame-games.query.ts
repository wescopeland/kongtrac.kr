import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { TopMameGamesState, TopMameGamesStore } from './top-mame-games.store';

@Injectable({ providedIn: 'root' })
export class TopMameGamesQuery extends QueryEntity<TopMameGamesState> {
  constructor(protected store: TopMameGamesStore) {
    super(store);
  }
}
