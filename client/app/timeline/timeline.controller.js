(function() {
    'use strict';

    angular
        .module('kongtrac.timeline')
        .controller('TimelineController', TimelineController);

    /* @ngInject */
    function TimelineController(timelineService) {

        var vm = this;

        activate();

        ////////////////

        function activate() {
        }

    }
})();