(function() {
    'use strict';

    submitConfiguration.$inject = ["$stateProvider"];
    angular
        .module('kongtrac.submit')
        .config(submitConfiguration);

    function submitConfiguration($stateProvider) {

    	$stateProvider
    		.state('submitGame', {
    			url: '/submitGame',
    			templateUrl: 'app/submit/submitGame.htm',
    			controller: 'SubmitGameController as submit',
                resolve: {
                    'currentAuth': ['$firebaseAuth', function($firebaseAuth) {
                        return $firebaseAuth().$requireSignIn();
                    }]
                }
    		})
            .state('submitEvent', {
                url: '/submitEvent',
                templateUrl: 'app/submit/submitEvent.htm',
                controller: 'SubmitEventController as submit',
                resolve: {
                    'currentAuth': ['$firebaseAuth', function($firebaseAuth) {
                        return $firebaseAuth().$requireSignIn();
                    }]
                }
            });

    }

})();