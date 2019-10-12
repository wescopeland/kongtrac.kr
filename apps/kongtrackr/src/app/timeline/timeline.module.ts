import * as angular from 'angular';

import { timelineConfiguration } from './timeline.route';
import { TimelineController } from './timeline.controller';
import { timelineService } from './timeline.service';

export const timelineModule = angular
  .module('kongtrac.timeline', [])
  .config(timelineConfiguration)
  .controller('TimelineController', TimelineController)
  .service('timelineService', timelineService).name;
