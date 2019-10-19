/* @ngInject */
export function gameConfiguration($stateProvider) {
  $stateProvider
    .state('game', {
      abstract: true,
      url: '/game/:gameId',
      template: require('html-loader!./game.html'),
      controller: 'GameController as game'
    })
    .state('game.summary', {
      url: '/summary',
      template: require('html-loader!./gameSummary.html')
    })
    .state('game.boards', {
      url: '/boards',
      template: require('html-loader!./gameBoards.html')
    })
    .state('game.edit', {
      url: '/edit',
      template: require('html-loader!./gameEdit.html'),
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
