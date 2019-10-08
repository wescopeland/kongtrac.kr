import { RankingController } from './ranking.controller';
// import template from './test.html';

export const rankingPlayersComponent = {
  controller: RankingController,
  template: require(`html-loader!./test.html`)
  // template: `
  //   <br />

  //   <div class="row">
  //     <div
  //       class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //     >
  //       <p>
  //         Currently tracking <em>{{ $ctrl.dbStats.gamesCount }}</em> games,
  //         <em>{{ $ctrl.dbStats.playersCount }}</em> players,
  //         <em>{{ $ctrl.dbStats.killscreenCount }}</em> kill screens, and
  //         <em>{{ $ctrl.dbStats.eventsCount }}</em> events.
  //       </p>
  //     </div>
  //   </div>

  //   <!-- Combined Top 10 -->
  //   <div ng-if="!$ctrl.showSeparate">
  //     <div class="row">
  //       <div
  //         class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //       >
  //         <h2>
  //           Current combined top 10
  //           <a
  //             ng-click="$ctrl.showSeparateScores()"
  //             class="pull-right"
  //             style="font-size: 15px; padding-top: 16px; cursor: pointer;"
  //             >Show separate platforms</a
  //           >
  //         </h2>
  //       </div>
  //     </div>

  //     <div class="row">
  //       <div
  //         class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //       >
  //         <div class="table-responsive">
  //           <table class="table table-striped table-hover">
  //             <thead>
  //               <th>#</th>
  //               <th style="width: 50px;"></th>
  //               <th>Name</th>
  //               <th>Score</th>
  //               <th>Date</th>
  //             </thead>

  //             <tbody>
  //               <tr
  //                 ng-repeat="score in $ctrl.HSL | orderBy:'-score' | limitTo:10"
  //               >
  //                 <td>
  //                   {{
  //                     score.score === $ctrl.HSL[$index - 1].score
  //                       ? $index
  //                       : $index + 1
  //                   }}
  //                 </td>
  //                 <td ng-if="score.platform === 'MAME'" title="MAME">
  //                   <i class="fa fa-lg fa-keyboard-o"></i>
  //                 </td>
  //                 <td ng-if="score.platform === 'Arcade'" title="Arcade Cabinet">
  //                   <i class="fa fa-lg fa-map-pin" style="padding-left: 4px;"></i>
  //                 </td>
  //                 <td
  //                   ng-if="score.platform !== 'Arcade' && score.platform !== 'MAME'"
  //                   title="Other"
  //                 >
  //                   <i class="fa fa-lg fa-gg"></i>
  //                 </td>
  //                 <td>
  //                   <a
  //                     ng-href="{{ '#/player/' + $ctrl.camelize(score.player) }}"
  //                     >{{ score.player }}</a
  //                   >
  //                 </td>
  //                 <td>
  //                   <a ng-href="{{ '#/game/' + score.id + '/summary' }}">{{
  //                     score.score | number
  //                   }}</a>
  //                 </td>
  //                 <td>{{ score.date | amDateFormat: 'MM/DD/YYYY' }}</td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  //   <!-- Arcade Top 10 -->
  //   <div ng-if="$ctrl.showSeparate">
  //     <div class="row">
  //       <div
  //         class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //       >
  //         <h2>
  //           Arcade top 10
  //           <a
  //             ng-click="$ctrl.hideSeparateScores()"
  //             class="pull-right"
  //             style="font-size: 15px; padding-top: 16px; cursor: pointer;"
  //             >Show combined platforms</a
  //           >
  //         </h2>
  //       </div>
  //     </div>

  //     <div class="row">
  //       <div
  //         class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //       >
  //         <div class="table-responsive">
  //           <table class="table table-striped table-hover">
  //             <thead>
  //               <th>#</th>
  //               <th style="width: 50px;"></th>
  //               <th>Name</th>
  //               <th>Score</th>
  //               <th>Date</th>
  //             </thead>

  //             <tbody>
  //               <tr
  //                 ng-repeat="score in $ctrl.arcadeHSL | orderBy:'-score' | limitTo: 10"
  //               >
  //                 <td>
  //                   {{
  //                     score.score === $ctrl.arcadeHSL[$index - 1].score
  //                       ? $index
  //                       : $index + 1
  //                   }}
  //                 </td>
  //                 <td title="Arcade Cabinet">
  //                   <i class="fa fa-lg fa-map-pin" style="padding-left: 4px;"></i>
  //                 </td>
  //                 <td>
  //                   <a
  //                     ng-href="{{ '#/player/' + $ctrl.camelize(score.player) }}"
  //                     >{{ score.player }}</a
  //                   >
  //                 </td>
  //                 <td>
  //                   <a ng-href="{{ '#/game/' + score.id + '/summary' }}">{{
  //                     score.score | number
  //                   }}</a>
  //                 </td>
  //                 <td>{{ score.date | amDateFormat: 'MM/DD/YYYY' }}</td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  //   <!-- MAME Top 10 -->
  //   <div ng-if="$ctrl.showSeparate">
  //     <div class="row">
  //       <div
  //         class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //       >
  //         <h2>
  //           Mame top 10
  //           <a
  //             ng-click="$ctrl.hideSeparateScores()"
  //             class="pull-right"
  //             style="font-size: 15px; padding-top: 16px; cursor: pointer;"
  //             >Show combined platforms</a
  //           >
  //         </h2>
  //       </div>
  //     </div>

  //     <div class="row" ng-if="$ctrl.showSeparate">
  //       <div
  //         class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
  //       >
  //         <div class="table-responsive">
  //           <table class="table table-striped table-hover">
  //             <thead>
  //               <th>#</th>
  //               <th style="width: 50px;"></th>
  //               <th>Name</th>
  //               <th>Score</th>
  //               <th>Date</th>
  //             </thead>

  //             <tbody>
  //               <tr
  //                 ng-repeat="score in $ctrl.mameHSL | orderBy:'-score' | limitTo: 10"
  //               >
  //                 <td>
  //                   {{
  //                     score.score === $ctrl.mameHSL[$index - 1].score
  //                       ? $index
  //                       : $index + 1
  //                   }}
  //                 </td>
  //                 <td title="MAME"><i class="fa fa-lg fa-keyboard-o"></i></td>
  //                 <td>
  //                   <a
  //                     ng-href="{{ '#/player/' + $ctrl.camelize(score.player) }}"
  //                     >{{ score.player }}</a
  //                   >
  //                 </td>
  //                 <td>
  //                   <a ng-href="{{ '#/game/' + score.id + '/summary' }}">{{
  //                     score.score | number
  //                   }}</a>
  //                 </td>
  //                 <td>{{ score.date | amDateFormat: 'MM/DD/YYYY' }}</td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // `
};
