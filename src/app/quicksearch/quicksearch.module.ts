import * as angular from 'angular';

import { globalSearch } from './global-search.directive';
import { searchService } from './search.service';

export const quicksearchModule = angular
  .module('kongtrac.search', [])
  .directive('globalSearch', globalSearch)
  .service('searchService', searchService).name;
