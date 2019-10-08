/* @ngInject */
export function submitConfiguration($stateProvider) {
  $stateProvider
    .state('submitGame', {
      url: '/submitGame',
      template: require('html-loader!./submitGame.html'),
      controller: 'SubmitGameController as submit',
      resolve: {
        currentAuth: [
          '$firebaseAuth',
          function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }
        ]
      }
    })
    .state('submitEvent', {
      url: '/submitEvent',
      template: require('html-loader!./submitEvent.html'),
      controller: 'SubmitEventController as submit',
      resolve: {
        currentAuth: [
          '$firebaseAuth',
          function($firebaseAuth) {
            return $firebaseAuth().$requireSignIn();
          }
        ]
      }
    });
}
