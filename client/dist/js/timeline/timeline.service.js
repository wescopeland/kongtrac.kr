(function() {
    'use strict';

    angular
        .module('kongtrac.timeline')
        .service('timelineService', timelineService);

    /* @ngInject */
    function timelineService($q, $firebaseObject, $firebaseArray) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');

    	// Public Functions
        this.getTimelineData = getTimelineData;

        ////////////////

        function getTimelineData(inputTimeline) {

        	return $q(function(resolve, reject) {

        		var timelineData = $firebaseArray(
	        		_fbRef
	        			.child('timelines')
	        			.child(inputTimeline)
	        	);

	        	timelineData.$loaded().then(function() {
	        		resolve(timelineData);
	        	});

        	});

        }

    }
    timelineService.$inject = ["$q", "$firebaseObject", "$firebaseArray"];
})();