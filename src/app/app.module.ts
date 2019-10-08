import * as angular from 'angular';

import { authModule } from './auth/auth.module';
import { blocksModule } from './blocks/blocks.module';
import { compareModule } from './compare/compare.module';
import { coreModule } from './core/core.module';
import { eventModule } from './event/event.module';
import { exportModule } from './export/export.module';
import { gameModule } from './game/game.module';
import { playerModule } from './player/player.module';
import { quicksearchModule } from './quicksearch/quicksearch.module';
import { rankingModule } from './ranking/ranking.module';
import { scoresModule } from './scores/scores.module';
import { submitModule } from './submit/submit.module';
import { timelineModule } from './timeline/timeline.module';

export const appModule = angular
  .module('kongtrac.app', [
    coreModule,
    authModule,
    blocksModule,
    rankingModule,
    submitModule,
    scoresModule,
    gameModule,
    playerModule,
    eventModule,
    compareModule,
    timelineModule,
    quicksearchModule,
    exportModule
  ])
  .config(
    /* @ngInject */
    function($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    }
  ).name;
