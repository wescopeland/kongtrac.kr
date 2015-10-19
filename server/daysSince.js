(function() {

	'use strict';

	var Firebase = require('firebase');
	var moment = require('moment');
	var preciseRange = require('moment-precise-range');
	moment().format();

	var _fbRef = new Firebase('https://kongtrackr.firebaseio.com');
	var _gamesRef = _fbRef.child('games');
	var _eventsRef = _fbRef.child('events');
	var _playersRef = _fbRef.child('players');
	var _timelinesRef = _fbRef.child('timelines');
	var _daysSinceRef = _fbRef.child('daysSince');

	function camelize(inputString) {

        if (inputString) {
            return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        }

    }

	var buildDaysSince = function() {

		var now = moment();

		// Most recent KS.
		_timelinesRef.child('ksTimeline').once('value', function(ksTimelineSnapshot) {

			var ksTimelineArray = ksTimelineSnapshot.val();
			var mostRecentKs = ksTimelineArray[ksTimelineArray.length - 1];

			var mostRecentKsDate = moment(mostRecentKs.date, 'MM-DD-YYYY');
			var duration = preciseRange.preciseDiff(mostRecentKsDate, now);
			
			var sanitizedDuration = duration.split('days')[0];
			if (sanitizedDuration.charAt(sanitizedDuration.length) === '1') {
				sanitizedDuration += 'day';
			} else {
				sanitizedDuration += 'days';
			}

			_daysSinceRef.child('lastKs').set(sanitizedDuration);

		});

		// Most recent 1m.
		_timelinesRef.child('millionTimeline').once('value', function(millionTimelineSnapshot) {

			var millionTimelineArray = millionTimelineSnapshot.val();
			var mostRecentMillion = millionTimelineArray[millionTimelineArray.length - 1];

			var mostRecentMillionDate = moment(mostRecentMillion.date, 'MM-DD-YYYY');
			var duration = preciseRange.preciseDiff(mostRecentMillionDate, now);

			var sanitizedDuration = duration.split('days')[0];
			if (sanitizedDuration.charAt(sanitizedDuration.length) === '1') {
				sanitizedDuration += 'day';
			} else {
				sanitizedDuration += 'days';
			}

			_daysSinceRef.child('lastMillion').set(sanitizedDuration);

		});

		// Most recent 1.1m.
		_timelinesRef.child('millionHundredTimeline').once('value', function(millionHundredTimelineSnapshot) {

			var millionHundredTimelineArray = millionHundredTimelineSnapshot.val();
			var mostRecentMillionHundred = millionHundredTimelineArray[millionHundredTimelineArray.length - 1];

			var mostRecentMillionHundredDate = moment(mostRecentMillionHundred.date, 'MM-DD-YYYY');
			var duration = preciseRange.preciseDiff(mostRecentMillionHundredDate, now);

			var sanitizedDuration = duration.split('days')[0];
			if (sanitizedDuration.charAt(sanitizedDuration.length) === '1') {
				sanitizedDuration += 'day';
			} else {
				sanitizedDuration += 'days';
			}

			_daysSinceRef.child('lastMillionHundred').set(sanitizedDuration);

		});

		// Most recent 1.2m.
		_timelinesRef.child('millionTwoTimeline').once('value', function(millionTwoTimelineSnapshot) {

			var millionTwoTimelineArray = millionTwoTimelineSnapshot.val();
			var mostRecentMillionTwo = millionTwoTimelineArray[millionTwoTimelineArray.length - 1];

			var mostRecentMillionTwoDate = moment(mostRecentMillionTwo.date, 'MM-DD-YYYY');
			var duration = preciseRange.preciseDiff(mostRecentMillionTwoDate, now);

			var sanitizedDuration = duration.split('days')[0];
			if (sanitizedDuration.charAt(sanitizedDuration.length) === '1') {
				sanitizedDuration += 'day';
			} else {
				sanitizedDuration += 'days';
			}

			_daysSinceRef.child('lastMillionTwo').set(sanitizedDuration);

		});

		// New arcade WR.
		_timelinesRef.child('arcadeWRTimeline').once('value', function(arcadeWRTimelineSnapshot) {

			var arcadeWRTimelineArray = arcadeWRTimelineSnapshot.val();
			var mostRecentArcadeWR = arcadeWRTimelineArray[arcadeWRTimelineArray.length - 1];

			var mostRecentArcadeWRDate = moment(mostRecentArcadeWR.date, 'MM-DD-YYYY');
			var duration = preciseRange.preciseDiff(mostRecentArcadeWRDate, now);
			console.log(duration);

			var sanitizedDuration = duration.split('days')[0];
			if (sanitizedDuration.charAt(sanitizedDuration.length) === '1') {
				sanitizedDuration += 'day';
			} else {
				sanitizedDuration += 'days';
			}

			_daysSinceRef.child('lastArcadeWR').set(sanitizedDuration);

		});

		// New MAME WR.
		_timelinesRef.child('mameWRTimeline').once('value', function(mameWRTimelineSnapshot) {

			var mameWRTimelineArray = mameWRTimelineSnapshot.val();
			var mostRecentMameWR = mameWRTimelineArray[mameWRTimelineArray.length - 1];

			var mostRecentMameWRDate = moment(mostRecentMameWR.date, 'MM-DD-YYYY');
			var duration = preciseRange.preciseDiff(mostRecentMameWRDate, now);

			var sanitizedDuration = duration.split('days')[0];
			if (sanitizedDuration.charAt(sanitizedDuration.length) === '1') {
				sanitizedDuration += 'day';
			} else {
				sanitizedDuration += 'days';
			}

			_daysSinceRef.child('lastMameWR').set(sanitizedDuration);

		});

		console.log('Built days since objects.');

	};

	buildDaysSince();

	module.exports.build = function() {
		return buildDaysSince();
	};

})();