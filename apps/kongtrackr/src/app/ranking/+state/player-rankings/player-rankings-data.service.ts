import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PlayerRankingsDataService {
  constructor(private _http: HttpClient) {}

  getPlayers() {
    return this._http.get('https://kongtrackr.firebaseio.com/players.json');
  }
}
