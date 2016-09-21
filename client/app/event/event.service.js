(function() {
    'use strict';

    angular
        .module('kongtrac.event')
        .service('eventService', eventService);

    /* @ngInject */
    function eventService($q, $firebaseObject, $firebaseArray) {

        // Private Variables
        var _fbRef = firebase.database().ref();
        var _event = {};

        this.addGameIdToEvent = addGameIdToEvent;
        this.addWinningsToEvent = addWinningsToEvent;
        this.editEvent = editEvent;
        this.getEventData = getEventData;

        ////////////////

        function addGameIdToEvent(inputEventId, inputGameId) {

            return $q(function(resolve, reject) {

                removeGameIdFromEvents(inputGameId).then(function() {

                    var eventData = $firebaseObject(
                        _fbRef
                            .child('events')
                            .child(inputEventId)
                    );

                    eventData.$loaded().then(function() {

                        eventData.games.push(inputGameId);
                        eventData.$save();

                        resolve();

                    });

                });

            });

        }

        function addWinningsToEvent(inputEventId, inputPlayer, inputWinningsAmount) {

            return $q(function(resolve, reject) {

                var eventData = $firebaseObject(
                    _fbRef
                        .child('events')
                        .child(inputEventId)
                );

                eventData.$loaded().then(function() {

                    if (eventData.winnings) {

                        eventData.winnings[inputPlayer] = inputWinningsAmount;

                    } else {

                        eventData.winnings = {};
                        eventData.winnings[inputPlayer] = inputWinningsAmount;

                    }

                    eventData.$save();
                    resolve();

                });

            });

        }

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

        function removeGameIdFromEvents(inputGameId) {

            return $q(function(resolve, reject) {

                var allEvents = $firebaseArray(
                    _fbRef
                        .child('events')
                );

                allEvents.$loaded().then(function() {

                    allEvents.forEach(function(event) {

                        var gameRemovalIndex = event.games.indexOf(inputGameId);

                        if (gameRemovalIndex !== -1) {

                            event.games.splice(gameRemovalIndex, 1);
                            allEvents.$save(event);

                        }

                    });

                    resolve();

                });

            });

        }

    }

})();