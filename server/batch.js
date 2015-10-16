(function() {

	'use strict';

	var personalBestTable = require('./buildPersonalBestTable');
	var averageGame = require('./buildAverageGame');
	var dbStats = require('./buildDbStats');
	var gameRankings = require('./buildGameRankingsTables');
	var ksTimeline = require('./buildKillscreenerTimeline');
	var millionTimeline = require('./buildMillionPointTimeline');
	var millionHundredTimeline = require('./buildMillionHundredPointTimeline');
	var millionTwoHundredTimeline = require('./buildMillionTwoPointTimeline');
	var arcadeWRTimeline = require('./buildArcadeWRTimeline');
	var mameWRTimeline = require('./buildMAMEWRTimeline');
	var combinedWRTimeline = require('./buildCombinedWRTimeline');

	function runBatch() {

		personalBestTable.build();

		averageGame.build();

		dbStats.build();
		
		gameRankings.build();

		ksTimeline.build();
		millionTimeline.build();
		millionHundredTimeline.build();
		millionTwoHundredTimeline.build();

		arcadeWRTimeline.build();
		mameWRTimeline.build();
		combinedWRTimeline.build();
		
	}

	module.exports.runBatch = function() {
		return runBatch();
	};

})();