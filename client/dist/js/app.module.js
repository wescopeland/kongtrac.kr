(function() {
    'use strict';

    angular
        .module('kongtrac.app', [
            'kongtrac.core',
            'kongtrac.ranking',
            'kongtrac.submit',
            'kongtrac.scores',
            'kongtrac.game',
            'kongtrac.player',
            'kongtrac.event',
            'kongtrac.compare',
            'kongtrac.timeline',
            'kongtrac.search',
            'kongtrac.export'
        ]);
})();