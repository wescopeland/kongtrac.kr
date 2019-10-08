/* @ngInject */
export function compareConfiguration($stateProvider) {
  $stateProvider
    .state('compareSelection', {
      abstract: true,
      url: '/compare/selection',
      template: require('html-loader!./selection.html'),
      controller: 'CompareSelectionController as compare'
    })
    .state('compareSelection.games', {
      url: '/games',
      template: require('html-loader!./selection.games.html')
    })
    .state('compareSelection.players', {
      url: '/players',
      template: require('html-loader!./selection.players.html')
    })
    .state('compareSelection.events', {
      url: '/events',
      template: require('html-loader!./selection.events.html')
    })
    .state('comparePlayers', {
      url: '/compare/players/:playerIds',
      template: require('html-loader!./compare-players.html'),
      controller: 'ComparePlayersController as compare'
    })
    .state('compareEvents', {
      url: '/compare/events/:eventIds',
      template: require('html-loader!./compare-events.html'),
      controller: 'CompareEventsController as compare'
    })
    .state('compareGames', {
      abstract: true,
      url: '/compare/games/:gameIds',
      template: require('html-loader!./compare-games.html'),
      controller: 'CompareGamesController as compare'
    })
    .state('compareGames.summary', {
      url: '/summary',
      template: require('html-loader!./compare-games-summary.html')
    });
}
