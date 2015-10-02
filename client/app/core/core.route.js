(function() {
    'use strict';

    angular
        .module('kongtrac.core')
        .config(coreConfiguration);

    function coreConfiguration($urlRouterProvider) {

    	// Redirect any unmatched URL to /.
    	$urlRouterProvider.otherwise('/home');

    }

})();