(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .controller('ComparePlayersController', ComparePlayersController);

    /* @ngInject */
    function ComparePlayersController(compareService) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        }
    }
    ComparePlayersController.$inject = ["compareService"];
})();