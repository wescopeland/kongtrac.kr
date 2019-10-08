/* @ngInject */
export function LoginController($state, authService) {
  var vm = this;

  // Public Functions
  vm.clickFirebaseLogin = clickFirebaseLogin;
  vm.clickTwitchConnect = clickTwitchConnect;

  ////////////////

  function clickFirebaseLogin() {
    authService
      .loginToFirebase(vm.inputEmail, vm.inputPassword)
      .then(function(user) {
        $state.go('playerRanking');
      });
  }

  function clickTwitchConnect() {
    authService.loginToTwitch();
  }
}
