var Firebase = require('firebase');
var algoliasearch = require('algoliasearch');
var client = algoliasearch('NW1XKBQ46B', '3a7149f9ee919a452a7ca647d20f4de8');

var gamesIndex = client.initIndex('games');
var playersIndex = client.initIndex('players');
var eventsIndex = client.initIndex('events');

// Connect to our Firebase data.
var gamesRef = new Firebase('kongtrackr.firebaseio.com/games');
var playersRef = new Firebase('kongtrackr.firebaseio.com/players');
var eventsRef = new Firebase('kongtrackr.firebaseio.com/events');

function watchData() {
    // Manage when data is updated on Firebase.
    gamesRef.on('child_added', addOrUpdateGames);
    gamesRef.on('child_changed', addOrUpdateGames);

    playersRef.on('child_added', addOrUpdatePlayers);
    playersRef.on('child_changed', addOrUpdatePlayers);

    eventsRef.on('child_added', addOrUpdateEvents);
    eventsRef.on('child_changed', addOrUpdateEvents);

    function addOrUpdateGames(dataSnapshot) {
        // Get Firebase object
        var firebaseObject = dataSnapshot.val();

        // Specify Algolia's objectID using the Firebase object key
        firebaseObject.objectID = dataSnapshot.key();

        // Add or update object
        gamesIndex.saveObject(firebaseObject, function(err, content) {
            if (err) {
                throw err;
            }
        });
    }

    function addOrUpdatePlayers(dataSnapshot) {
        // Get Firebase object
        var firebaseObject = dataSnapshot.val();

        // Specify Algolia's objectID using the Firebase object key
        firebaseObject.objectID = dataSnapshot.key();

        // Add or update object
        playersIndex.saveObject(firebaseObject, function(err, content) {
            if (err) {
                throw err;
            }
        });
    }

    function addOrUpdateEvents(dataSnapshot) {
        // Get Firebase object
        var firebaseObject = dataSnapshot.val();

        // Specify Algolia's objectID using the Firebase object key
        firebaseObject.objectID = dataSnapshot.key();

        // Add or update object
        eventsIndex.saveObject(firebaseObject, function(err, content) {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports.watchData = function() {
    return watchData();
};
