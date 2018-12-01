(function () {
    angular.module(QuizUp).controller('HomeController', ['$scope', '$rootScope', '$authenticationService', function ($scope, $rootScope, $authenticationService) {

        let homeController = this;

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if(toState.name === "Home"){
                    init();
                }
            });

        function init() {
            if ($authenticationService.IsLoggedIn()) {
                homeController.user = $rootScope.currentUser.user;
                console.log(homeController.user);
            }
        }
    }]);
})();