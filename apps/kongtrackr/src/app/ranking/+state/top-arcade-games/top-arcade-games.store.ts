import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Game } from '../../../shared/models/game.model';

export interface TopArcadeGamesState extends EntityState<Game> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'topGamesArcade', idKey: 'gameId' })
export class TopArcadeGamesStore extends EntityStore<TopArcadeGamesState> {
  constructor() {
    super();
  }
}
