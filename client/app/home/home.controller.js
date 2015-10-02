(function() {
    'use strict';

    angular
        .module('kongtrac.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController(scoresService) {

        var vm = this;

        // Public Variables
        vm.arcadeTopTenScores = [];
        vm.combinedTopTenScores = [];
        vm.mameTopTenScores = [];
        vm.showSeparate = false;

        // Public Functions
        vm.camelize = camelize;
        vm.hideSeparateScores = hideSeparateScores;
        vm.showSeparateScores = showSeparateScores;

        activate();

        ////////////////

        function activate() {

        	scoresService.generateCombinedTopTen().then(function then(response) {

        		vm.combinedTopTenScores = response;

        		vm.arcadeTopTenScores = scoresService.getArcadeTopTen();
        		vm.mameTopTenScores = scoresService.getMameTopTen();

        	});

        }

        function camelize(inputString) {

        	return inputString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
			}).replace(/\s+/g, '');

        }

        function hideSeparateScores() {
        	vm.showSeparate = false;
        }

        function showSeparateScores() {
        	vm.showSeparate = true;
        }

    }
})();