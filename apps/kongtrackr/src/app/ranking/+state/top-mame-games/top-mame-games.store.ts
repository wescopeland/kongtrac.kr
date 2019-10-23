import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Game } from '../../../shared/models/game.model';

export interface TopMameGamesState extends EntityState<Game> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'topGamesMame', idKey: 'gameId' })
export class TopMameGamesStore extends EntityStore<TopMameGamesState> {
  constructor() {
    super();
  }
}
