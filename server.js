var express = require('express');
var compress = require('compression')();
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var every = require('every-moment');
var Firebase = require('firebase');

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
var algoliaIndices = require('./server/algoliaUpdate');

kongtrackr.runBatch();
// algoliaIndices.watchData();

var app = express();
app.use(compress);

app.set('port', process.env.PORT || 1337);
app.use(serveStatic('client', { index: ['index.html', 'index.htm'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/bower_components'));

app.listen(app.get('port'), function() {
    console.log('kongtrac.kr server is now running at port ' + app.get('port'));
});

// Add headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    next();
});

// Batch schedule
var timer = every(30, 'minutes', function() {
    kongtrackr.runBatch();
});
