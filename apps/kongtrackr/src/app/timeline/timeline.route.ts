/* @ngInject */
export function timelineConfiguration($stateProvider) {
  $stateProvider
    .state('timeline', {
      abstract: true,
      url: '/timeline',
      template: require('html-loader!./timeline.html'),
      controller: 'TimelineController as timeline'
    })
    .state('timeline.worldRecord', {
      url: '/worldrecord',
      template: require('html-loader!./timeline.wr.html')
    })
    .state('timeline.killscreen', {
      url: '/killscreen',
      template: require('html-loader!./timeline.killscreen.html')
    })
    .state('timeline.million', {
      url: '/million',
      template: require('html-loader!./timeline.million.html')
    })
    .state('timeline.millionhundred', {
      url: '/millionhundred',
      template: require('html-loader!./timeline.millionHundred.html')
    })
    .state('timeline.milliontwohundred', {
      url: '/milliontwohundred',
      template: require('html-loader!./timeline.millionTwoHundred.html')
    })
    .state('timeline.daysSince', {
      url: '/daysSince',
      template: require('html-loader!./timeline.daysSince.html')
    });
}
