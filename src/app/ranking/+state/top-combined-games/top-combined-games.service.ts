import { Injectable } from '@angular/core';

import { TopCombinedGamesDataService } from './top-combined-games-data.service';
import { TopCombinedGamesStore } from './top-combined-games.store';

@Injectable({ providedIn: 'root' })
export class TopCombinedGamesService {
  constructor(
    private _dataService: TopCombinedGamesDataService,
    private _store: TopCombinedGamesStore
  ) {}

  async getTopCombinedGames() {
    const response = await this._dataService.getTopCombinedGames().toPromise();

    const games = Object.values(response);

    this._store.add(games);
    return;
  }
}
