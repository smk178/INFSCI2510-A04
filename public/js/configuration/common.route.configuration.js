(function () {

    angular.module(QuizUp).config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

        const homeState = {
            name: 'Home',
            url: '/',
            isAuthenticationRequired : false,
            controller: 'HomeController as homeController'
        };

        const accountLoginState = {
            name: 'Login',
            url: 'account/login',
            templateUrl: 'pages/account/login.html',
            isAuthenticationRequired : false,
            controller: 'LoginController as vm'
        };

        const accountRegistrationState = {
            name: 'Registration',
            url: 'account/register',
            templateUrl: 'pages/account/register.html',
            isAuthenticationRequired : false,
            controller: 'RegistrationController as vm'
        };

        const accountProfile = {
            name: 'Profile',
            url: 'account/profile',
            templateUrl: 'pages/account/profile.html',
            isAuthenticationRequired: true,
            controller: 'ProfileController as vm'
        };

        $stateProvider.state(homeState);

        $stateProvider.state(accountRegistrationState);

        $stateProvider.state(accountLoginState);

        $stateProvider.state(accountProfile);

    }]);

})();