/* @ngInject */
export function coreConfiguration($locationProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('');

  // Redirect any unmatched URL to /.
  $urlRouterProvider.otherwise('/ranking/players');
}
