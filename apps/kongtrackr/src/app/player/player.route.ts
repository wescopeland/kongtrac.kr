/* @ngInject */
export function playerConfiguration($stateProvider) {
  $stateProvider.state('player', {
    url: '/player/:playerName',
    template: require('html-loader!./player.html'),
    controller: 'PlayerController as player'
  });
}
