(function() {
    'use strict';

    gameConfiguration.$inject = ["$stateProvider"];
    angular
        .module('kongtrac.export')
        .config(gameConfiguration);

    function gameConfiguration($stateProvider) {

    	$stateProvider
    		.state('exportDatabase', {
    			url: '/exportDatabase',
    			templateUrl: 'app/export/export.htm',
    			controller: 'ExportController as export'
    		});

    }

})();