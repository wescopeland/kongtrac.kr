(function() {

	'use strict';

	var personalBestTable = require('./buildPersonalBestTable');
	var averageGame = require('./buildAverageGame');
	var dbStats = require('./buildDbStats');
	var gameRankings = require('./buildGameRankingsTables');

	function runBatch() {

		personalBestTable.build();
		averageGame.build();
		dbStats.build();
		gameRankings.build();
		
	}

	module.exports.runBatch = function() {
		return runBatch();
	};

})();