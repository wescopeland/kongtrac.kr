(function() {
    'use strict';

    angular
        .module('kongtrac.app', [
            'kongtrac.core',
            'kongtrac.home',
            'kongtrac.submit',
            'kongtrac.scores',
            'kongtrac.game',
            'kongtrac.player',
            'kongtrac.event',
            'kongtrac.search'
        ]);
})();