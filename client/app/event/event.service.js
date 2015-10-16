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

        this.editEvent = editEvent;
        this.getEventData = getEventData;

        ////////////////

        function editEvent(inputEventId, inputEditObject) {

            return $q(function(resolve, reject) {

                var eventData = $firebaseObject(
                    _fbRef
                        .child('events')
                        .child(inputEventId)
                );

                eventData.$loaded().then(function() {

                    eventData.name = inputEditObject.name;
                    eventData.startDate = inputEditObject.startDate;
                    eventData.endDate = inputEditObject.endDate;
                    eventData.onlineOffline = inputEditObject.onlineOffline;
                    eventData.format = Number(inputEditObject.format);

                    eventData.$save();
                    resolve();

                });

            });

        }

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