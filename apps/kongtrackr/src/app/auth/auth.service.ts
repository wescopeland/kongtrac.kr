/* @ngInject */
export function authService($q, $firebaseAuth) {
  // Private Variables
  var _authData = {};
  let _isSignedIn = false;

  // Public Functions
  this.getAuthData = getAuthData;
  this.loginToFirebase = loginToFirebase;
  this.setAuthData = setAuthData;

  ////////////////

  function getAuthData() {
    return _authData;
  }

  function loginToFirebase(inputEmail, inputPassword) {
    return $q(function(resolve, reject) {
      $firebaseAuth()
        .$signInWithEmailAndPassword(inputEmail, inputPassword)
        .then(function(user) {
          _authData = user;
          resolve(_authData);
        });
    });
  }

  function setAuthData(inputAuthDataObject) {
    _authData = inputAuthDataObject;
  }
}
