/* @ngInject */
export function eventConfiguration($stateProvider) {
  $stateProvider.state('event', {
    url: '/event/:eventId',
    template: require('./event.htm'),
    controller: 'EventController as event'
  });
}
