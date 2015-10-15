(function() {

	'use strict';

	var personalBestTable = require('./buildPersonalBestTable');
	var averageGame = require('./buildAverageGame');

	function runBatch() {

		personalBestTable.build();
		averageGame.build();
		
	}

	module.exports.runBatch = function() {
		return runBatch();
	};

})();