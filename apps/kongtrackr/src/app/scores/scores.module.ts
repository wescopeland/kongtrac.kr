import * as angular from 'angular';

import { scoresService } from './scores.service';

export const scoresModule = angular
  .module('kongtrac.scores', ['firebase'])
  .service('scoresService', scoresService).name;
