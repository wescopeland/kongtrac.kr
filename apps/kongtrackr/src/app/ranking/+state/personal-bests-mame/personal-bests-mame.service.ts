import { Injectable } from '@angular/core';

import { PersonalBestsMameDataService } from './personal-bests-mame-data.service';
import { PersonalBestsMameStore } from './personal-bests-mame.store';

@Injectable({ providedIn: 'root' })
export class PersonalBestsMameService {
  constructor(
    private _dataService: PersonalBestsMameDataService,
    private _store: PersonalBestsMameStore
  ) {}

  async getPersonalBestsMame() {
    const response = await this._dataService.getPersonalBestsMame().toPromise();

    const personalBests = Object.values(response);
    let filteredPersonalBests = personalBests.filter(element => !!element.id);

    this._store.add(filteredPersonalBests);
    return;
  }
}
