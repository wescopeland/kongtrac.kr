(function() {
    'use strict';

    coreConfiguration.$inject = ["$urlRouterProvider"];
    angular.module('kongtrac.core').config(coreConfiguration);

    function coreConfiguration($urlRouterProvider) {
        // Redirect any unmatched URL to /.
        $urlRouterProvider.otherwise('/ranking/players');
    }
})();
