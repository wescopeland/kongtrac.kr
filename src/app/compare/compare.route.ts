/* @ngInject */
export function compareConfiguration($stateProvider) {
  $stateProvider
    .state('compareSelection', {
      abstract: true,
      url: '/compare/selection',
      template: require('./selection.htm'),
      controller: 'CompareSelectionController as compare'
    })
    .state('compareSelection.games', {
      url: '/games',
      template: require('./selection.games.htm')
    })
    .state('compareSelection.players', {
      url: '/players',
      template: require('./selection.players.htm')
    })
    .state('compareSelection.events', {
      url: '/events',
      template: require('./selection.events.htm')
    })
    .state('comparePlayers', {
      url: '/compare/players/:playerIds',
      template: require('./compare-players.htm'),
      controller: 'ComparePlayersController as compare'
    })
    .state('compareEvents', {
      url: '/compare/events/:eventIds',
      template: require('./compare-events.htm'),
      controller: 'CompareEventsController as compare'
    })
    .state('compareGames', {
      abstract: true,
      url: '/compare/games/:gameIds',
      template: require('./compare-games.htm'),
      controller: 'CompareGamesController as compare'
    })
    .state('compareGames.summary', {
      url: '/summary',
      template: require('./compare-games-summary.htm')
    });
}
