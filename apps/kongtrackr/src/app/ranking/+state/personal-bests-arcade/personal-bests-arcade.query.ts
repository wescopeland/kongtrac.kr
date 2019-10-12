import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import {
  PersonalBestsArcadeState,
  PersonalBestsArcadeStore
} from './personal-bests-arcade.store';

@Injectable({ providedIn: 'root' })
export class PersonalBestsArcadeQuery extends QueryEntity<
  PersonalBestsArcadeState
> {
  constructor(protected store: PersonalBestsArcadeStore) {
    super(store);
  }
}
