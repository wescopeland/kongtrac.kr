import { RankingController } from './ranking.controller';

export const rankingGamesComponent = {
  controller: RankingController,
  template: /* HTML */ `
    <br />

    <div class="row">
      <div
        class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
      >
        <p>
          Currently tracking <em>{{ ranking.dbStats.gamesCount }}</em> games,
          <em>{{ ranking.dbStats.playersCount }}</em> players,
          <em>{{ ranking.dbStats.killscreenCount }}</em> kill screens, and
          <em>{{ ranking.dbStats.eventsCount }}</em> events.
        </p>
      </div>
    </div>

    <!-- Combined Top 10 -->
    <div ng-if="!ranking.showSeparate">
      <div class="row">
        <div
          class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
        >
          <h2>
            Current combined top {{ ranking.topGamesLimit }} games
            <a
              ng-click="ranking.showSeparateScores()"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; cursor: pointer;"
              >Show separate platforms</a
            >
            <a
              ng-click="ranking.setTopGamesLimit(50)"
              ng-if="ranking.topGamesLimit === 10"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; margin-right: 15px; cursor: pointer;"
            >
              Show top 50
            </a>
            <a
              ng-click="ranking.setTopGamesLimit(10)"
              ng-if="ranking.topGamesLimit === 50"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; margin-right: 15px; cursor: pointer;"
            >
              Show top 10
            </a>
          </h2>
        </div>
      </div>

      <div class="row">
        <div
          class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
        >
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <th>#</th>
                <th style="width: 50px;"></th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </thead>

              <tbody>
                <tr
                  ng-repeat="score in ranking.combinedGamesHSL | orderBy:'-score' | limitTo: ranking.topGamesLimit"
                >
                  <td>{{ $index + 1 }}</td>
                  <td ng-if="score.platform === 'MAME'" title="MAME">
                    <i class="fa fa-lg fa-keyboard-o"></i>
                  </td>
                  <td ng-if="score.platform === 'Arcade'" title="Arcade Cabinet">
                    <i class="fa fa-lg fa-map-pin" style="padding-left: 4px;"></i>
                  </td>
                  <td
                    ng-if="score.platform !== 'Arcade' && score.platform !== 'MAME'"
                    title="Other"
                  >
                    <i class="fa fa-lg fa-gg"></i>
                  </td>
                  <td>
                    <a
                      ng-href="{{ '#/player/' + ranking.camelize(score.player) }}"
                      >{{ score.player }}</a
                    >
                  </td>
                  <td>
                    <a ng-href="{{ '#/game/' + score.gameId + '/summary' }}">{{
                      score.score | number
                    }}</a>
                  </td>

                  <td ng-if="!score.concealedDay && !score.concealedMonth">
                    {{ score.date | amDateFormat: 'MM/DD/YYYY' }}
                  </td>
                  <td ng-if="score.concealedDay && !score.concealedMonth">
                    {{ score.date | amDateFormat: 'MMMM YYYY' }}
                  </td>
                  <td ng-if="score.concealedDay && score.concealedMonth">
                    {{ score.date | amDateFormat: 'YYYY' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Arcade Top 10 -->
    <div ng-if="ranking.showSeparate">
      <div class="row">
        <div
          class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
        >
          <h2>
            Arcade top {{ ranking.topGamesLimit }} games
            <a
              ng-click="ranking.hideSeparateScores()"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; cursor: pointer;"
              >Show combined platforms</a
            >
            <a
              ng-click="ranking.setTopGamesLimit(50)"
              ng-if="ranking.topGamesLimit === 10"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; margin-right: 15px; cursor: pointer;"
            >
              Show top 50
            </a>
            <a
              ng-click="ranking.setTopGamesLimit(10)"
              ng-if="ranking.topGamesLimit === 50"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; margin-right: 15px; cursor: pointer;"
            >
              Show top 10
            </a>
          </h2>
        </div>
      </div>

      <div class="row">
        <div
          class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
        >
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <th>#</th>
                <th style="width: 50px;"></th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </thead>

              <tbody>
                <tr
                  ng-repeat="score in ranking.arcadeGamesHSL | orderBy:'-score' | limitTo: ranking.topGamesLimit"
                >
                  <td>{{ $index + 1 }}</td>
                  <td title="Arcade Cabinet">
                    <i class="fa fa-lg fa-map-pin" style="padding-left: 4px;"></i>
                  </td>
                  <td>
                    <a
                      ng-href="{{ '#/player/' + ranking.camelize(score.player) }}"
                      >{{ score.player }}</a
                    >
                  </td>
                  <td>
                    <a ng-href="{{ '#/game/' + score.id + '/summary' }}">{{
                      score.score | number
                    }}</a>
                  </td>

                  <td ng-if="!score.concealedDay && !score.concealedMonth">
                    {{ score.date | amDateFormat: 'MM/DD/YYYY' }}
                  </td>
                  <td ng-if="score.concealedDay && !score.concealedMonth">
                    {{ score.date | amDateFormat: 'MMMM YYYY' }}
                  </td>
                  <td ng-if="score.concealedDay && score.concealedMonth">
                    {{ score.date | amDateFormat: 'YYYY' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- MAME Top 10 -->
    <div ng-if="ranking.showSeparate">
      <div class="row">
        <div
          class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
        >
          <h2>
            Mame top {{ ranking.topGamesLimit }} games
            <a
              ng-click="ranking.hideSeparateScores()"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; cursor: pointer;"
              >Show combined platforms</a
            >
            <a
              ng-click="ranking.setTopGamesLimit(50)"
              ng-if="ranking.topGamesLimit === 10"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; margin-right: 15px; cursor: pointer;"
            >
              Show top 50
            </a>
            <a
              ng-click="ranking.setTopGamesLimit(10)"
              ng-if="ranking.topGamesLimit === 50"
              class="pull-right"
              style="font-size: 15px; padding-top: 16px; margin-right: 15px; cursor: pointer;"
            >
              Show top 10
            </a>
          </h2>
        </div>
      </div>

      <div class="row" ng-if="ranking.showSeparate">
        <div
          class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12 col-xs-12"
        >
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead>
                <th>#</th>
                <th style="width: 50px;"></th>
                <th>Name</th>
                <th>Score</th>
                <th>Date</th>
              </thead>

              <tbody>
                <tr
                  ng-repeat="score in ranking.mameGamesHSL | orderBy:'-score' | limitTo: ranking.topGamesLimit"
                >
                  <td>{{ $index + 1 }}</td>
                  <td title="MAME"><i class="fa fa-lg fa-keyboard-o"></i></td>
                  <td>
                    <a
                      ng-href="{{ '#/player/' + ranking.camelize(score.player) }}"
                      >{{ score.player }}</a
                    >
                  </td>
                  <td>
                    <a ng-href="{{ '#/game/' + score.gameId + '/summary' }}">{{
                      score.score | number
                    }}</a>
                  </td>

                  <td ng-if="!score.concealedDay && !score.concealedMonth">
                    {{ score.date | amDateFormat: 'MM/DD/YYYY' }}
                  </td>
                  <td ng-if="score.concealedDay && !score.concealedMonth">
                    {{ score.date | amDateFormat: 'MMMM YYYY' }}
                  </td>
                  <td ng-if="score.concealedDay && score.concealedMonth">
                    {{ score.date | amDateFormat: 'YYYY' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
};
