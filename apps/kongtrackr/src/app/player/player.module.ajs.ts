import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { playerConfiguration } from './player.route';
import { PlayerController } from './player.controller';
import { playerService } from './player.service';
import { PbHistoryChartComponent } from './pb-history-chart/pb-history-chart.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';

export const playerModule = angular
  .module('kongtrac.player', [])
  .config(playerConfiguration)
  .controller('PlayerController', PlayerController)
  .directive(
    'kongtracPbHistoryChart',
    downgradeComponent({ component: PbHistoryChartComponent })
  )
  .directive(
    'kongtracPlayerDetails',
    downgradeComponent({ component: PlayerDetailsComponent })
  )
  .service('playerService', playerService).name;
