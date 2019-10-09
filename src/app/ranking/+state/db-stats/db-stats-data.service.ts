import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DbStatsResponse } from '../models/db-stats-response.model';

@Injectable({ providedIn: 'root' })
export class DbStatsDataService {
  constructor(private _http: HttpClient) {}

  getDbStats(): Observable<DbStatsResponse> {
    return this._http.get<DbStatsResponse>(
      'https://kongtrackr.firebaseio.com/dbStats.json'
    );
  }
}
