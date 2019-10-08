/* @ngInject */
export function playerConfiguration($stateProvider) {
  $stateProvider.state('player', {
    url: '/player/:playerName',
    template: require('./player.htm'),
    controller: 'PlayerController as player'
  });
}
