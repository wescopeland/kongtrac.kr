/* @ngInject */
export function gameConfiguration($stateProvider) {
  $stateProvider
    .state('game', {
      abstract: true,
      url: '/game/:gameId',
      template: require('./game.htm'),
      controller: 'GameController as game'
    })
    .state('game.summary', {
      url: '/summary',
      template: require('./gameSummary.htm')
    })
    .state('game.boards', {
      url: '/boards',
      template: require('./gameBoards.htm')
    })
    .state('game.edit', {
      url: '/edit',
      template: require('./gameEdit.htm'),
      resolve: {
        currentAuth: [
          '$firebaseAuth',
          function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }
        ]
      }
    });
}
