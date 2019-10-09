import * as angular from 'angular';

import { globalSearch } from './global-search.directive';
import { quicksearchRun } from './quicksearch.run';
import { searchService } from './search.service';

export const quicksearchModule = angular
  .module('kongtrac.search', [])
  .run(quicksearchRun)
  .directive('globalSearch', globalSearch)
  .service('searchService', searchService).name;
