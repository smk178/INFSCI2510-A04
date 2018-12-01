const QuizUp = "QuizUp";

angular.module(QuizUp, ['ngCookies', 'ui.router', 'ui.router.state.events', 'formly', 'formlyBootstrap', 'ui.bootstrap']).run(['$rootScope', '$state', '$authenticationService', function ($rootScope, $state, $authenticationService) {
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
            console.log(toState);
            let isAuthenticationRequired = toState.isAuthenticationRequired;
            if (isAuthenticationRequired && !$authenticationService.IsLoggedIn()) {
                event.preventDefault();
                $state.transitionTo('Registration');
            }
        });
}]);

