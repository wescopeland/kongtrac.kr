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
			
			var duration = moment.duration(now.diff(mostRecentKsDate));

			var durationString = '';
			if (duration._data.years > 0) {
				durationString += (duration._data.years + ' years ');
			}

			if (duration._data.months > 0) {
				durationString += (duration._data.months + ' months ');
			}

			if (duration._data.days > 0) {
				durationString += (duration._data.days + ' days ');
			}

			_daysSinceRef.child('lastKs').set({
				stringValue: durationString,
				objectValue: mostRecentKs,
				title: 'A new player reached the kill screen'
			});

		});

		// Most recent 1m.
		_timelinesRef.child('millionTimeline').once('value', function(millionTimelineSnapshot) {

			var millionTimelineArray = millionTimelineSnapshot.val();
			var mostRecentMillion = millionTimelineArray[millionTimelineArray.length - 1];

			var mostRecentMillionDate = moment(mostRecentMillion.date, 'MM-DD-YYYY');
			
			var duration = moment.duration(now.diff(mostRecentMillionDate));

			var durationString = '';
			if (duration._data.years > 0) {
				durationString += (duration._data.years + ' years ');
			}

			if (duration._data.months > 0) {
				durationString += (duration._data.months + ' months ');
			}

			if (duration._data.days > 0) {
				durationString += (duration._data.days + ' days ');
			}

			_daysSinceRef.child('lastMillion').set({
				stringValue: durationString,
				objectValue: mostRecentMillion,
				title: 'A new player scored 1,000,000 points'
			});

		});

		// Most recent 1.1m.
		_timelinesRef.child('millionHundredTimeline').once('value', function(millionHundredTimelineSnapshot) {

			var millionHundredTimelineArray = millionHundredTimelineSnapshot.val();
			var mostRecentMillionHundred = millionHundredTimelineArray[millionHundredTimelineArray.length - 1];

			var mostRecentMillionHundredDate = moment(mostRecentMillionHundred.date, 'MM-DD-YYYY');
			
			var duration = moment.duration(now.diff(mostRecentMillionHundredDate));

			var durationString = '';
			if (duration._data.years > 0) {
				durationString += (duration._data.years + ' years ');
			}

			if (duration._data.months > 0) {
				durationString += (duration._data.months + ' months ');
			}

			if (duration._data.days > 0) {
				durationString += (duration._data.days + ' days ');
			}

			_daysSinceRef.child('lastMillionHundred').set({
				stringValue: durationString,
				objectValue: mostRecentMillionHundred,
				title: 'A new player scored 1,100,000 points'
			});

		});

		// Most recent 1.2m.
		_timelinesRef.child('millionTwoTimeline').once('value', function(millionTwoTimelineSnapshot) {

			var millionTwoTimelineArray = millionTwoTimelineSnapshot.val();
			var mostRecentMillionTwo = millionTwoTimelineArray[millionTwoTimelineArray.length - 1];

			var mostRecentMillionTwoDate = moment(mostRecentMillionTwo.date, 'MM-DD-YYYY');
			
			var duration = moment.duration(now.diff(mostRecentMillionTwoDate));

			var durationString = '';
			if (duration._data.years > 0) {
				durationString += (duration._data.years + ' years ');
			}

			if (duration._data.months > 0) {
				durationString += (duration._data.months + ' months ');
			}

			if (duration._data.days > 0) {
				durationString += (duration._data.days + ' days ');
			}

			_daysSinceRef.child('lastMillionTwo').set({
				stringValue: durationString,
				objectValue: mostRecentMillionTwo,
				title: 'A new player scored 1,200,000 points'
			});

		});

		// New arcade WR.
		_timelinesRef.child('arcadeWRTimeline').once('value', function(arcadeWRTimelineSnapshot) {

			var arcadeWRTimelineArray = arcadeWRTimelineSnapshot.val();
			var mostRecentArcadeWR = arcadeWRTimelineArray[arcadeWRTimelineArray.length - 1];

			var mostRecentArcadeWRDate = moment(mostRecentArcadeWR.date, 'MM-DD-YYYY');
			
			var duration = moment.duration(now.diff(mostRecentArcadeWRDate));

			var durationString = '';
			if (duration._data.years > 0) {
				durationString += (duration._data.years + ' years ');
			}

			if (duration._data.months > 0) {
				durationString += (duration._data.months + ' months ');
			}

			if (duration._data.days > 0) {
				durationString += (duration._data.days + ' days ');
			}

			_daysSinceRef.child('lastArcadeWR').set({
				stringValue: durationString,
				objectValue: mostRecentArcadeWR,
				title: 'The arcade world record was broken'
			});

		});

		// New MAME WR.
		_timelinesRef.child('mameWRTimeline').once('value', function(mameWRTimelineSnapshot) {

			var mameWRTimelineArray = mameWRTimelineSnapshot.val();
			var mostRecentMameWR = mameWRTimelineArray[mameWRTimelineArray.length - 1];

			var mostRecentMameWRDate = moment(mostRecentMameWR.date, 'MM-DD-YYYY');

			var duration = moment.duration(now.diff(mostRecentMameWRDate));

			var durationString = '';
			if (duration._data.years > 0) {
				durationString += (duration._data.years + ' years ');
			}

			if (duration._data.months > 0) {
				durationString += (duration._data.months + ' months ');
			}

			if (duration._data.days > 0) {
				durationString += (duration._data.days + ' days ');
			}

			_daysSinceRef.child('lastMameWR').set({
				stringValue: durationString,
				objectValue: mostRecentMameWR,
				title: 'The MAME world record was broken'
			});

		});

		console.log('Built days since objects.');

	};

	module.exports.build = function() {
		return buildDaysSince();
	};

})();