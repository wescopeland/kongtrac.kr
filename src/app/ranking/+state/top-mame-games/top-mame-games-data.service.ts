import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TopMameGamesDataService {
  constructor(private _http: HttpClient) {}

  getTopMameGames() {
    return this._http.get(
      'https://kongtrackr.firebaseio.com/topGamesMame.json'
    );
  }
}
