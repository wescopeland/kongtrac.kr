import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { playerConfiguration } from './player.route';
import { PlayerController } from './player.controller';
import { playerService } from './player.service';
import { GamesTableComponent } from './games-table/games-table.component';
import { PbHistoryChartComponent } from './pb-history-chart/pb-history-chart.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

export const playerModule = angular
  .module('kongtrac.player', [])
  .config(playerConfiguration)
  .controller('PlayerController', PlayerController)
  .directive(
    'kongtracPlayerGamesTable',
    downgradeComponent({ component: GamesTableComponent })
  )
  .directive(
    'kongtracPbHistoryChart',
    downgradeComponent({ component: PbHistoryChartComponent })
  )
  .directive(
    'kongtracPlayerDetails',
    downgradeComponent({ component: PlayerDetailsComponent })
  )
  .service('playerService', playerService).name;
