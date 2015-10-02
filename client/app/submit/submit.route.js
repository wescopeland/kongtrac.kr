(function() {
    'use strict';

    angular
        .module('kongtrac.submit')
        .config(submitConfiguration);

    function submitConfiguration($stateProvider) {

    	$stateProvider
    		.state('submitGame', {
    			url: '/submitGame',
    			templateUrl: 'app/submit/submitGame.htm',
    			controller: 'SubmitGameController as submit'
    		});

    }

})();