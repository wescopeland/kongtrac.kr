(function() {
    'use strict';

    angular
        .module('kongtrac.auth')
        .service('authService', authService);

    /* @ngInject */
    function authService($q, $firebaseAuth) {

        // Private Variables
        var _authData = {};

        // Public Functions
        this.connectToTwitch = connectToTwitch;
        this.getAuthData = getAuthData;
        this.loginToFirebase = loginToFirebase;
        this.loginToTwitch = loginToTwitch;
        this.setAuthData = setAuthData;

        ////////////////

        function connectToTwitch() {

            Twitch.init({ clientId: 'df62f3vzm4cd2fnr51svvpud4o6pesd' }, function(error, status) {
                _twitchAuthObject = status;
                console.debug('_twitchAuthObject', _twitchAuthObject);
            });

        }

        function getAuthData() {
            return _authData;
        }

        function loginToFirebase(inputEmail, inputPassword) {

            return $q(function(resolve, reject) {

                $firebaseAuth().$signInWithEmailAndPassword(inputEmail, inputPassword).then(function(user) {

                    _authData = user;
                    resolve(_authData);

                });

            });

        }

        function loginToTwitch() {

            Twitch.login({
                redirect_uri: 'http://localhost:1337/#/login',
                scope: ['user_read']
            });

        }

        function setAuthData(inputAuthDataObject) {
            _authData = inputAuthDataObject;
        }

    }
})();