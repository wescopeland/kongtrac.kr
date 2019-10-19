import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { PersonalBest } from '../models/personal-best.model';

export interface PersonalBestsArcadeState extends EntityState<PersonalBest> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'personalBestsArcade' })
export class PersonalBestsArcadeStore extends EntityStore<
  PersonalBestsArcadeState
> {
  constructor() {
    super();
  }
}
