(function() {
    'use strict';

    authExec.$inject = ["$state", "$rootScope", "$firebaseAuth", "authService"];
    angular.module('kongtrac.auth').run(authExec);

    /* @ngInject */
    function authExec($state, $rootScope, $firebaseAuth, authService) {
        // authService.connectToTwitch();

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
                console.debug('authData', authService.getAuthData());

                // var ref = new Firebase(FIREBASEDATA.FBURL);

                // var profileData = $firebaseObject(ref.child('users').child(authData.uid));
                // profileData.$bindTo($rootScope, 'profile').then(function(unbind) {
                //     $rootScope.unbindFunction = unbind;
                // });
            }
        });
    }
})();
