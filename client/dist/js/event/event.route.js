(function() {
    'use strict';

    gameConfiguration.$inject = ["$stateProvider"];
    angular
        .module('kongtrac.game')
        .config(gameConfiguration);

    function gameConfiguration($stateProvider) {

    	$stateProvider
    		.state('event', {
    			url: '/event/:eventId',
    			templateUrl: 'app/event/event.htm',
    			controller: 'EventController as event'
    		});

    }

})();