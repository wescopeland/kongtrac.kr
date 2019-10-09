import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { PersonalBest } from '../models/personal-best.model';

export interface PersonalBestsMameState extends EntityState<PersonalBest> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'personalBestsMame' })
export class PersonalBestsMameStore extends EntityStore<
  PersonalBestsMameState
> {
  constructor() {
    super();
  }
}
