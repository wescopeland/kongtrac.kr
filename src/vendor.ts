import * as $ from 'jquery';
(window as any).jQuery = $;
(window as any).$ = $;

var Highcharts = require('highcharts/highstock');
(window as any).Highcharts = Highcharts;
require('highcharts/modules/exporting')(Highcharts);

require('bootstrap/dist/css/bootstrap.min.css');
require('angularjs-datepicker/dist/angular-datepicker.min.css');
require('font-awesome/css/font-awesome.css');
require('ladda/dist/ladda-themeless.min.css');
require('./style/aligulac-theme.css');
require('bootstrap-slider/dist/css/bootstrap-slider.min.css');

import * as firebase from 'firebase';
(window as any).firebase = firebase;

import 'bootstrap';

import * as angular from 'angular';
(window as any).angular = angular;

import 'angular-ui-router';
import 'angular-strap';
import 'angularjs-datepicker';
import 'angularfire';
import 'highcharts-ng';
import 'angular-smart-table';
import 'angular-moment';
import 'bootstrap-slider';
import 'angular-bootstrap-slider/slider';
// import 'angular-bootstrap-slider/dist/bootstrap-slider.min';
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
