import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TopCombinedGamesDataService {
  constructor(private _http: HttpClient) {}

  getTopCombinedGames() {
    return this._http.get(
      'https://kongtrackr.firebaseio.com/topGamesCombined.json'
    );
  }
}
