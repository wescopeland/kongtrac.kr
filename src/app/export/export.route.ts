/* @ngInject */
export function exportConfiguration($stateProvider) {
  $stateProvider.state('exportDatabase', {
    url: '/exportDatabase',
    template: require('./export.htm'),
    controller: 'ExportController as export'
  });
}
