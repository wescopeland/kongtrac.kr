import * as angular from 'angular';

import { eventConfiguration } from './event.route';
import { EventController } from './event.controller';
import { eventService } from './event.service';

export const eventModule = angular
  .module('kongtrac.event', [])
  .config(eventConfiguration)
  .controller('EventController', EventController)
  .service('eventService', eventService).name;
