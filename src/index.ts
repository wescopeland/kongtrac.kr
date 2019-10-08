import './polyfills';
import './vendor';

import * as angular from 'angular';

import { appModule } from './app/app.module';

angular.module('kongtrac.bootstrap', [appModule]);
