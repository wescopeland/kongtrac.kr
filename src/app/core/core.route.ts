/* @ngInject */
export function coreConfiguration($urlRouterProvider) {
  // Redirect any unmatched URL to /.
  $urlRouterProvider.otherwise('/ranking/players');
}
