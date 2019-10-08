import * as angular from 'angular';

import { coreConfiguration } from './core.route';

export const coreModule = angular
  .module('kongtrac.core', [
    'ui.router',
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
