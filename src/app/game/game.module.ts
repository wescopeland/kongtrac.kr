import * as angular from 'angular';

import { boardMapper } from './board-mapper.service';
import { gameConfiguration } from './game.route';
import { GameController } from './game.controller';
import { gameService } from './game.service';

export const gameModule = angular
  .module('kongtrac.game', [])
  .config(gameConfiguration)
  .controller('GameController', GameController)
  .service('boardMapper', boardMapper)
  .service('gameService', gameService).name;
