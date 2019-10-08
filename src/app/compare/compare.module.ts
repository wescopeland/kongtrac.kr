import * as angular from 'angular';

import { compareConfiguration } from './compare.route';
import { CompareEventsController } from './compare-events.controller';
import { CompareGamesController } from './compare-games.controller';
import { ComparePlayersController } from './compare-players.controller';
import { CompareSelectionController } from './compare-selection.controller';

export const compareModule = angular
  .module('kongtrac.compare', [])
  .config(compareConfiguration)
  .controller('CompareEventsController', CompareEventsController)
  .controller('CompareGamesController', CompareGamesController)
  .controller('ComparePlayersController', ComparePlayersController)
  .controller('CompareSelectionController', CompareSelectionController).name;
