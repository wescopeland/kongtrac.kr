var Firebase = require('firebase');
var algoliasearch = require('algoliasearch');
var client = algoliasearch('NW1XKBQ46B', '3a7149f9ee919a452a7ca647d20f4de8');
var index = client.initIndex('games');

// Connect to our Firebase contacts data
var fb = new Firebase('kongtrackr.firebaseio.com/games');

// Get all data from Firebase
fb.on('value', initIndex);

function initIndex(dataSnapshot) {
  // Array of data to index
  var objectsToIndex = [];

  // Get all objects
  var values = dataSnapshot.val();

  // Process each Firebase ojbect
  for (var key in values) {
    if (values.hasOwnProperty(key)) {
      // Get current Firebase object
      var firebaseObject = values[key];

      // Specify Algolia's objectID using the Firebase object key
      firebaseObject.objectID = key;

      // Add object for indexing
      objectsToIndex.push(firebaseObject);
    }
  }

  // Add or update new objects
  index.saveObjects(objectsToIndex, function(err, content) {
    if (err) {
      throw err;
    }

    console.log('Firebase<>Algolia import done');
  });
}