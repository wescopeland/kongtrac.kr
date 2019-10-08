/* @ngInject */
export function rankingConfiguration($stateProvider) {
  $stateProvider
    .state('playerRanking', {
      url: '/ranking/players',
      template: require('./ranking.players.htm'),
      controller: 'RankingController as ranking'
    })
    .state('gameRanking', {
      url: '/ranking/games',
      template: require('./ranking.games.htm'),
      controller: 'RankingController as ranking'
    })
    .state('completeRanking', {
      url: '/ranking/complete',
      template: require('./ranking.complete.htm'),
      controller: 'RankingController as ranking'
    });
}
