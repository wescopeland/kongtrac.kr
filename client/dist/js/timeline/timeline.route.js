(function() {
    'use strict';

    angular
        .module('kongtrac.timeline')
        .config(timelineConfiguration);

    function timelineConfiguration($stateProvider) {

    	$stateProvider
    		.state('timeline', {
    			abstract: true,
    			url: '/timeline',
    			templateUrl: 'app/timeline/timeline.htm',
    			controller: 'TimelineController as timeline'
    		})
    		.state('timeline.worldRecord', {
    			url: '/worldrecord',
    			templateUrl: '/app/timeline/timeline.wr.htm'
    		})
            .state('timeline.killscreen', {
                url: '/killscreen',
                templateUrl: '/app/timeline/timeline.killscreen.htm'
            })
            .state('timeline.million', {
                url: '/million',
                templateUrl: '/app/timeline/timeline.million.htm'
            })
            .state('timeline.millionhundred', {
            	url: '/millionhundred',
            	templateUrl: '/app/timeline/timeline.millionHundred.htm'
            })
            .state('timeline.milliontwohundred', {
            	url: '/milliontwohundred',
            	templateUrl: '/app/timeline/timeline.millionTwoHundred.htm'
            })
            .state('timeline.daysSince', {
                url: '/daysSince',
                templateUrl: '/app/timeline/timeline.daysSince.htm'
            });

    }
    timelineConfiguration.$inject = ["$stateProvider"];

})();