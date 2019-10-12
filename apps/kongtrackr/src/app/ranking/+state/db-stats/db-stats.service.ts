import { Injectable } from '@angular/core';

import { DbStatsDataService } from './db-stats-data.service';
import { DbStatsStore } from './db-stats.store';

@Injectable({ providedIn: 'root' })
export class DbStatsService {
  constructor(
    private _dataService: DbStatsDataService,
    private _store: DbStatsStore
  ) {}

  async getDbStats() {
    const response = await this._dataService.getDbStats().toPromise();

    this._store.update({
      games: response.gamesCount,
      players: response.playersCount,
      killScreens: response.killscreenCount,
      events: response.eventsCount
    });
  }
}
