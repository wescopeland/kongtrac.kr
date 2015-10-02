(function() {
    'use strict';

    angular
        .module('kongtrac.home')
        .config(homeConfiguration);

    function homeConfiguration($stateProvider) {

    	$stateProvider
    		.state('home', {
    			url: '/home',
    			templateUrl: 'app/home/home.htm',
                controller: 'HomeController as home'
    		});

    }
    homeConfiguration.$inject = ["$stateProvider"];

})();