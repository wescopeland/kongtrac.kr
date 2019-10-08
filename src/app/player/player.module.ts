import * as angular from 'angular';

import { playerConfiguration } from './player.route';
import { PlayerController } from './player.controller';
import { playerService } from './player.service';

export const playerModule = angular
  .module('kongtrac.player', [])
  .config(playerConfiguration)
  .controller('PlayerController', PlayerController)
  .service('playerService', playerService).name;
