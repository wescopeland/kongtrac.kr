(function() {
    'use strict';

    angular
        .module('kongtrac.event')
        .service('eventService', eventService);

    /* @ngInject */
    function eventService($q, $firebaseObject, $firebaseArray) {

        // Private Variables
        var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
        var _event = {};

        this.getEventData = getEventData;

        ////////////////

        function getEventData(inputEvent) {

            var eventData = $firebaseObject(
                _fbRef
                    .child('events')
                    .child(inputEvent)
            );

            return $q(function(resolve, reject) {

                eventData.$loaded().then(function() {

                    _event = eventData;
                    resolve(_event);

                });

            });

        }

    }

})();