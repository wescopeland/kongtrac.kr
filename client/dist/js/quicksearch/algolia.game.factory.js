(function() {
    'use strict';

    angular
        .module('kongtrac.search')
        .factory('gameSearch', gameSearch);

    /* @ngInject */
    function gameSearch() {
        return algoliasearch('latency', '6de01060732bc03eb72a54c7e19c600d').initIndex('games');
    }

})();