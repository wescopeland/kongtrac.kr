/* @ngInject */
export function eventConfiguration($stateProvider) {
  $stateProvider.state('event', {
    url: '/event/:eventId',
    template: require('html-loader!./event.html'),
    controller: 'EventController as event'
  });
}
