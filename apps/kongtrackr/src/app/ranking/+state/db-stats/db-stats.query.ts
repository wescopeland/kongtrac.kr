import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { DbStatsState } from '../models/db-stats-state.model';
import { DbStatsStore } from './db-stats.store';

@Injectable({ providedIn: 'root' })
export class DbStatsQuery extends Query<DbStatsState> {
  constructor(protected store: DbStatsStore) {
    super(store);
  }
}
