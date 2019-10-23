import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Game } from '../../../shared/models/game.model';

export interface TopCombinedGamesState extends EntityState<Game> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'topGamesCombined', idKey: 'gameId' })
export class TopCombinedGamesStore extends EntityStore<TopCombinedGamesState> {
  constructor() {
    super();
  }
}
