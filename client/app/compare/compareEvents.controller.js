(function() {
    'use strict';

    angular
        .module('kongtrac.compare')
        .controller('CompareEventsController', CompareEventsController);

    /* @ngInject */
    function CompareEventsController(compareService) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
        }
    }
})();