import * as angular from 'angular';

import { authConfiguration } from './auth.route';
import { authExec } from './auth.run';
import { authService } from './auth.service';
import { LoginController } from './login.controller';

export const authModule = angular
  .module('kongtrac.auth', ['firebase'])
  .config(authConfiguration)
  .run(authExec)

  .service('authService', authService)
  .controller('LoginController', LoginController).name;
