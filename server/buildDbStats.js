(function() {
    'use strict';

    var Firebase = require('firebase');

    var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
    var _gamesRef = _fbRef.child('games');
    var _playersRef = _fbRef.child('players');
    var _eventsRef = _fbRef.child('events');

    var buildDbStats = function() {
        var dbStats = {};
        dbStats.gamesCount = 0;
        dbStats.playersCount = 0;
        dbStats.eventsCount = 0;
        dbStats.killscreenCount = 0;

        _gamesRef.once('value', function(gamesSnapshot) {
            gamesSnapshot.forEach(function(game) {
                dbStats.gamesCount += 1;

                if (game.val().isKillscreen) {
                    dbStats.killscreenCount += 1;
                }
            });

            _playersRef.once('value', function(playersSnapshot) {
                playersSnapshot.forEach(function(player) {
                    dbStats.playersCount += 1;
                });

                _eventsRef.once('value', function(eventsSnapshot) {
                    eventsSnapshot.forEach(function(event) {
                        dbStats.eventsCount += 1;
                    });

                    _fbRef.child('dbStats').set({
                        gamesCount: dbStats.gamesCount,
                        playersCount: dbStats.playersCount,
                        eventsCount: dbStats.eventsCount,
                        killscreenCount: dbStats.killscreenCount
                    });
                });
            });
        });

        console.log('Built DB stats.');
    };

    module.exports.build = function() {
        return buildDbStats();
    };
})();
