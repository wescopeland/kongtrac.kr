import * as $ from 'jquery';
(window as any).jQuery = $;
(window as any).$ = $;

var Highcharts = require('highcharts/highstock');
(window as any).Highcharts = Highcharts;
require('highcharts/modules/exporting')(Highcharts);

import * as firebase from 'firebase/app';
(window as any).firebase = firebase;

import 'bootstrap';

import * as angular from 'angular';
(window as any).angular = angular;

import 'angular-strap';
import 'angularjs-datepicker';
import 'angularfire';
import 'highcharts-ng';
import 'angular-smart-table';
import 'angular-moment';
import 'bootstrap-slider';
import 'angular-bootstrap-slider/slider';
import 'angular-ladda';

require('./algoliasearch.angular');

var config = {
  apiKey: 'AIzaSyDAAMsWb780h8LGZqx5W4AcUv0cnVsj4GA',
  authDomain: 'kongtrackr.firebaseapp.com',
  databaseURL: 'https://kongtrackr.firebaseio.com',
  storageBucket: 'kongtrackr.appspot.com',
  messagingSenderId: '262693445312'
};
firebase.initializeApp(config);
