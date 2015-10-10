(function() {
    'use strict';

    angular
        .module('kongtrac.event')
        .service('eventService', eventService);

    /* @ngInject */
    function eventService() {

        this.func = func;

        ////////////////

        function func() {
        }

    }

})();