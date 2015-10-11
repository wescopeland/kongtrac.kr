(function() {

	'use strict';

	var personalBestTable = require('./buildPersonalBestTable');

	function runBatch() {
		personalBestTable.build();
	}

	module.exports.runBatch = function() {
		return runBatch();
	};

})();