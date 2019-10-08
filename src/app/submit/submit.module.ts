import * as angular from 'angular';

import { submitConfiguration } from './submit.route';
import { SubmitEventController } from './submit-event.controller';
import { SubmitGameController } from './submit-game.controller';
import { submitGameService } from './submit-game.service';

export const submitModule = angular
  .module('kongtrac.submit', [])
  .config(submitConfiguration)
  .controller('SubmitEventController', SubmitEventController)
  .controller('SubmitGameController', SubmitGameController)
  .service('submitGameService', submitGameService).name;
