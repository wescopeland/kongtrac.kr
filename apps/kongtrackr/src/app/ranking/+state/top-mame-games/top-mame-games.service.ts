import { Injectable } from '@angular/core';

import { TopMameGamesDataService } from './top-mame-games-data.service';
import { TopMameGamesStore } from './top-mame-games.store';

@Injectable({ providedIn: 'root' })
export class TopMameGamesService {
  constructor(
    private _dataService: TopMameGamesDataService,
    private _store: TopMameGamesStore
  ) {}

  async getTopMameGames() {
    const response = await this._dataService.getTopMameGames().toPromise();

    const games = Object.values(response);

    this._store.add(games);
    return;
  }
}
