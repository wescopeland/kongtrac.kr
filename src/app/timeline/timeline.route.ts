/* @ngInject */
export function timelineConfiguration($stateProvider) {
  $stateProvider
    .state('timeline', {
      abstract: true,
      url: '/timeline',
      template: require('./timeline.htm'),
      controller: 'TimelineController as timeline'
    })
    .state('timeline.worldRecord', {
      url: '/worldrecord',
      template: require('./timeline.wr.htm')
    })
    .state('timeline.killscreen', {
      url: '/killscreen',
      template: require('./timeline.killscreen.htm')
    })
    .state('timeline.million', {
      url: '/million',
      template: require('./timeline.million.htm')
    })
    .state('timeline.millionhundred', {
      url: '/millionhundred',
      template: require('./timeline.millionHundred.htm')
    })
    .state('timeline.milliontwohundred', {
      url: '/milliontwohundred',
      template: require('./timeline.millionTwoHundred.htm')
    })
    .state('timeline.daysSince', {
      url: '/daysSince',
      template: require('./timeline.daysSince.htm')
    });
}
