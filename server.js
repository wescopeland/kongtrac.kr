const express = require('express');
const path = require('path');
const Firebase = require('firebase');
const every = require('every-moment');

const firebaseApiKey = process.env.firebaseApiKey;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'kongtrackr.firebaseapp.com',
  databaseURL: 'https://kongtrackr.firebaseio.com',
  projectId: 'kongtrackr',
  storageBucket: 'kongtrackr.appspot.com',
  messagingSenderId: '262693445312',
  appId: '1:262693445312:web:b731292d66cdecfa'
};

const fbApp = Firebase.initializeApp(firebaseConfig);

var kongtrackr = require('./server/batch');
// var algoliaIndices = require('./server/algoliaUpdate');

const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/apps/kongtrackr'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/apps/kongtrackr/index.html'));
});

app.listen(process.env.PORT || 8080);
console.log(`Kongtrackr server started on ${process.env.PORT || 8080}.`);

kongtrackr.runBatch();
// algoliaIndices.watchData();

// Batch schedule
var timer = every(30, 'minutes', function() {
  kongtrackr.runBatch();
});
