/* @ngInject */
export function rankingConfiguration($stateProvider) {
  $stateProvider
    .state('playerRanking', {
      url: '/ranking/players',
      controller: 'RankingController',
      controllerAs: 'ranking',
      template: require('html-loader!./ranking.players.html')
    })
    .state('gameRanking', {
      url: '/ranking/games',
      controller: 'RankingController',
      controllerAs: 'ranking',
      template: require('html-loader!./ranking.games.html')
    })
    .state('completeRanking', {
      url: '/ranking/complete',
      controller: 'RankingController',
      controllerAs: 'ranking',
      template: require('html-loader!./ranking.complete.html')
    });
}
