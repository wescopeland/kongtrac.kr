import * as angular from 'angular';

import { exportConfiguration } from './export.route';
import { ExportController } from './export.controller';

export const exportModule = angular
  .module('kongtrac.export', [])
  .config(exportConfiguration)
  .controller('ExportController', ExportController).name;
