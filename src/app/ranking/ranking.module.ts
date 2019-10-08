import * as angular from 'angular';

import { dbstatsService } from './dbstats.service';
import { rankingConfiguration } from './ranking.route';
import { RankingController } from './ranking.controller';

export const rankingModule = angular
  .module('kongtrac.ranking', [])
  .config(rankingConfiguration)
  .service('dbstatsService', dbstatsService)
  .controller('RankingController', RankingController).name;
