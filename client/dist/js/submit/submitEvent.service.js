(function() {
    'use strict';

    submitEventService.$inject = ["$q", "$firebaseArray", "$firebaseObject", "$rootScope", "$state"];
    angular
        .module('kongtrac.submit')
        .service('submitEventService', submitEventService);

    /* @ngInject */
    function submitEventService($q, $firebaseArray, $firebaseObject, $rootScope, $state) {

        var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');

        this.submitEvent = submitEvent;

        ////////////////

        function camelize(inputString) {

            return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');

        }

        function handleEventGames(inputEventGames, inputEventReference) {

            var dbEvent = $firebaseObject(inputEventReference);

            var dbGames = $firebaseArray(
                _fbRef
                    .child('games')
            );

            dbEvent.$loaded().then(function() {

                dbEvent.games = [];

                dbGames.$loaded().then(function() {

                    inputEventGames.forEach(function(game) {

                        // Does this game already exist in the database?
                        // If so, update that game's event property and add its ID to this event's games array.
                        var alreadyExists = false;
                        dbGames.forEach(function(dbGame) {

                            if (dbGame.player === game.player && dbGame.score === Number(game.score)) {

                                alreadyExists = true;

                                dbGame.event = dbEvent.$id;
                                dbGames.$save(dbGame);

                                dbEvent.games.push(dbGame.$id);

                            }

                        });

                        // If this game doesn't already exist, we need to add it to the database.
                        if (!alreadyExists) {

                            var newGameProperties = {};
                            newGameProperties.player = game.player;
                            newGameProperties.score = game.score;
                            newGameProperties.platform = game.platform;
                            newGameProperties.event = dbEvent.$id;
                            newGameProperties.date = dbEvent.endDate;
                            newGameProperties.concealedDay = true;

                            dbGames.$add(newGameProperties).then(function(newGameReference) {

                                console.log(newGameReference);
                                dbEvent.games.push(newGameReference.key());
                                dbEvent.$save();

                                // Add this game to the player's array of games.
                                var playerGamesArray = $firebaseArray(
                                    _fbRef
                                        .child('players')
                                        .child(camelize(newGameProperties.player))
                                        .child('games')
                                );


                                playerGamesArray.$loaded().then(function() {
                                    playerGamesArray.$add(newGameReference.key());
                                });

                            });

                        }

                    });

                    dbEvent.$save();

                });

            });

        }

        function submitEvent(inputEventProperties, inputEventGames) {

            var eventList = $firebaseArray(
                _fbRef
                    .child('events')
            );

            eventList.$loaded().then(function() {

                var newEvent = inputEventProperties;
                newEvent.winnings = {};

                // Add the event winnings records.
                inputEventGames.forEach(function(game) {

                    if (game.winnings && game.winnings > 0) {
                        newEvent.winnings[camelize(game.player)] = game.winnings;
                    }

                });

                console.log(newEvent);

                eventList.$add(newEvent).then(function(newEventReference) {

                    $rootScope.$broadcast('eventAdded', { eventId: newEventReference.key() });

                    // We need to add each game to the games table and this event record.
                    handleEventGames(inputEventGames, newEventReference);

                });

            });

        }
        
    }

})();