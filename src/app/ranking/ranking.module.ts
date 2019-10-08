import * as angular from 'angular';

import { dbstatsService } from './dbstats.service';
import { rankingConfiguration } from './ranking.route';
import { RankingController } from './ranking.controller';
import { rankingCompleteComponent } from './ranking-complete.component';
import { rankingGamesComponent } from './ranking-games.component';
import { rankingPlayersComponent } from './ranking-players.component';

export const rankingModule =
  // .component('rankingComplete', rankingCompleteComponent)
  // .component('rankingGames', rankingGamesComponent)
  // .component('rankingPlayers', rankingPlayersComponent)
  angular
    .module('kongtrac.ranking', [])
    .config(rankingConfiguration)
    .service('dbstatsService', dbstatsService)
    .controller('RankingController', RankingController).name;
