import { Injectable } from '@angular/core';

import { PersonalBestsArcadeDataService } from './personal-bests-arcade-data.service';
import { PersonalBestsArcadeStore } from './personal-bests-arcade.store';

@Injectable({ providedIn: 'root' })
export class PersonalBestsArcadeService {
  constructor(
    private _dataService: PersonalBestsArcadeDataService,
    private _store: PersonalBestsArcadeStore
  ) {}

  async getPersonalBestsArcade() {
    const response = await this._dataService
      .getPersonalBestsArcade()
      .toPromise();

    const personalBests = Object.values(response);
    let filteredPersonalBests = personalBests.filter(element => !!element.id);

    this._store.add(filteredPersonalBests);
    return;
  }
}
