(function() {
    'use strict';

    coreExec.$inject = ["authService"];
    angular
        .module('kongtrac.core')
        .config(coreExec);

    function coreExec(authService) {

        // Initiate the Twitch API.
        Twitch.init({ clientId: 'df62f3vzm4cd2fnr51svvpud4o6pesd' }, function(error, status) {
            //authService.twitchAuthObject = status;
            //console.debug('authService.twitchAuthObject', authService.twitchAuthObject);
        });

    }

})();