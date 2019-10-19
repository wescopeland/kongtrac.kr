import * as angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { upgradeModule } from '@uirouter/angular-hybrid';

import { coreConfiguration } from './core.route';

export const coreModule = angular
  .module('kongtrac.core', [
    uiRouter,
    upgradeModule.name,
    'mgcrea.ngStrap',
    '720kb.datepicker',
    'firebase',
    'highcharts-ng',
    'algoliasearch',
    'smart-table',
    'angularMoment',
    'ui.bootstrap-slider',
    'angular-ladda'
  ])

  .config(coreConfiguration).name;
