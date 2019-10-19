/* @ngInject */
export function authConfiguration($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: require('html-loader!./login.html'),
    controller: 'LoginController as login'
  });
}
