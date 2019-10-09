import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import {
  PersonalBestsMameState,
  PersonalBestsMameStore
} from './personal-bests-mame.store';

@Injectable({ providedIn: 'root' })
export class PersonalBestsMameQuery extends QueryEntity<
  PersonalBestsMameState
> {
  constructor(protected store: PersonalBestsMameStore) {
    super(store);
  }
}
