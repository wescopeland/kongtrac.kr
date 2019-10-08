/* @ngInject */
export function exportConfiguration($stateProvider) {
  $stateProvider.state('exportDatabase', {
    url: '/exportDatabase',
    template: require('html-loader!./export.html'),
    controller: 'ExportController as export'
  });
}
