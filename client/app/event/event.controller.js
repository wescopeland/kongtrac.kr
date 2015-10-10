(function() {
    'use strict';

    angular
        .module('kongtrac.event')
        .controller('EventController', EventController);

    /* @ngInject */
    function EventController(eventService) {

        var vm = this;

        activate();

        ////////////////

        function activate() {
        }

    }
})();