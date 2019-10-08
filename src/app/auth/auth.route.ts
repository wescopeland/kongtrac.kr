/* @ngInject */
export function authConfiguration($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: require('./login.htm'),
    controller: 'LoginController as login'
  });
}
