import * as angular from 'angular';

import { noSpecialCharacters } from './no-special-characters.directive';

export const blocksModule = angular
  .module('kongtrac.blocks', [])
  .directive('noSpecialCharacters', noSpecialCharacters).name;
