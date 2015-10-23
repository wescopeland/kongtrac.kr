(function() {
    'use strict';

    angular
        .module('kongtrac.export')
        .controller('ExportController', ExportController);

    /* @ngInject */
    function ExportController($q, $firebaseArray, $firebaseObject) {

    	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');

        var vm = this;

        vm.exportDatabase = exportDatabase;
        vm.getDBData = getDBData;

        ////////////////

        function exportDatabase() {

        	getDBData().then(function then(response) {

        		var dataObject = response;
        		var cache = [];
        		var dataDownload = JSON.stringify(dataObject, function(key, value) {

        			if (typeof value === 'object' && value !== null) {
        				if (cache.indexOf(value) !== -1) {
        					return;
        				}
        				cache.push(value);
        			}
        			return value;

        		});

        		var filename = 'database.json';
        		var blob = new Blob([dataDownload], {type: 'text/json'}),
			    e = document.createEvent('MouseEvents'),
			    a = document.createElement('a');

			  	a.download = filename;
			  	a.href = window.URL.createObjectURL(blob);
			  	a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
			  	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  				a.dispatchEvent(e);

        	});

        }

        function getDBData() {

        	return $q(function(resolve, reject) {

        		var gamesData = $firebaseArray(
        			_fbRef
        				.child('games')
        		);

        		var playersData = $firebaseObject(
        			_fbRef
        				.child('players')
        		);

        		var eventsData = $firebaseArray(
        			_fbRef
        				.child('events')
        		);

        		gamesData.$loaded().then(function() {
        			playersData.$loaded().then(function() {
        				eventsData.$loaded().then(function() {

        					var completeDataObject = {
        						games: gamesData,
        						players: playersData,
        						events: eventsData
        					};

        					resolve(completeDataObject);

        				});
        			});
        		});

        	});

        }

    }
    ExportController.$inject = ["$q", "$firebaseArray", "$firebaseObject"];

})();