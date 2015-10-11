(function() {
    'use strict';

    angular
        .module('kongtrac.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($scope, scoresService) {

        var vm = this;

        // Public Variables
        vm.arcadeHSL = [];
        vm.HSL = [];
        vm.mameHSL = [];
        vm.showSeparate = false;
        
        // Public Functions
        vm.camelize = camelize;
        vm.hideSeparateScores = hideSeparateScores;
        vm.showSeparateScores = showSeparateScores;

        activate();

        ////////////////

        function activate() {

        	scoresService.generateCombinedHSL().then(function then(response) {

                console.log(response);

                vm.arcadeHSL = response.arcade;
                vm.mameHSL = response.mame;
                vm.HSL = response.combined;

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