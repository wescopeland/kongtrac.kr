/* @ngInject */
export function submitConfiguration($stateProvider) {
  $stateProvider
    .state('submitGame', {
      url: '/submitGame',
      template: require('./submitGame.htm'),
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
      template: require('./submitEvent.htm'),
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
