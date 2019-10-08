/* @ngInject */
export function authExec($state, $rootScope, $firebaseAuth, authService) {
  $rootScope.$on('$stateChangeError', function(
    event,
    toState,
    toParams,
    fromState,
    fromParams,
    error
  ) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    // If user is logged in, download their profile data to an object in $rootScope.
    if ($firebaseAuth().$getAuth()) {
      authService.setAuthData($firebaseAuth().$getAuth());
    }
  });
}
