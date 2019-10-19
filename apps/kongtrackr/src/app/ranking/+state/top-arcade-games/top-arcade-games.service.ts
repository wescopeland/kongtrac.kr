import { Injectable } from '@angular/core';

import { TopArcadeGamesDataService } from './top-arcade-games-data.service';
import { TopArcadeGamesStore } from './top-arcade-games.store';

@Injectable({ providedIn: 'root' })
export class TopArcadeGamesService {
  constructor(
    private _dataService: TopArcadeGamesDataService,
    private _store: TopArcadeGamesStore
  ) {}

  async getTopArcadeGames() {
    const response = await this._dataService.getTopArcadeGames().toPromise();

    const games = Object.values(response);

    this._store.add(games);
    return;
  }
}
