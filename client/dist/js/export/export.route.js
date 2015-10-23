(function() {
    'use strict';

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
    gameConfiguration.$inject = ["$stateProvider"];

})();