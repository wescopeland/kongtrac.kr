(function() {
    'use strict';

    authConfiguration.$inject = ["$stateProvider"];
    angular.module('kongtrac.auth').config(authConfiguration);

    /* @ngInject */
    function authConfiguration($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/auth/login.htm',
            controller: 'LoginController as login'
        });
    }
})();
