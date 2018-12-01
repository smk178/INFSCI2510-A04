(function () {
    'use strict';

    angular
        .module(QuizUp)
        .factory('$userService', UserService);

    UserService.$inject = ['$http','$api','$authenticationService'];

    function UserService($http, $api,$authenticationService) {

        const service = {
            Register: Register,
            Login: Login,
            Profile: Profile
        };

        function Register(user) {
            return $http.post($api.base + $api.account.register, user).then(handleSuccess, handleError('Could not register new user'));
        }

        function Login(user) {
            return $authenticationService.Login(user).then(handleSuccess, handleError('Could not login'));
        }

        function Profile(profile) {
            return $http.post($api.base + $api.account.profile, profile).then(handleSuccess, handleError('Could not retrieve user profile'));
        }

        function handleSuccess(result) {
            return result.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }

        return service;

    }

})();