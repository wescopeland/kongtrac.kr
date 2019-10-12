import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PersonalBest } from '../models/personal-best.model';

@Injectable({ providedIn: 'root' })
export class PersonalBestsArcadeDataService {
  constructor(private _http: HttpClient) {}

  getPersonalBestsArcade(): Observable<PersonalBest[]> {
    return this._http.get<PersonalBest[]>(
      'https://kongtrackr.firebaseio.com/arcadePersonalBests.json'
    );
  }
}
