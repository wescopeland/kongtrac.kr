import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TopArcadeGamesDataService {
  constructor(private _http: HttpClient) {}

  getTopArcadeGames() {
    return this._http.get(
      'https://kongtrackr.firebaseio.com/topGamesArcade.json'
    );
  }
}
