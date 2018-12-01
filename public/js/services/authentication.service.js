(function () {

    'use strict';

    angular
        .module(QuizUp)
        .factory('$authenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$api', '$q'];

    function AuthenticationService($http, $cookies, $rootScope, $api, $q) {

        return {
            Login: login,
            SetCredentials: setCredentials,
            ClearCredentials: clearCredentials,
            IsLoggedIn: isLoggedIn,
            GetToken: getToken
        };

        function getToken() {

            let user = $rootScope.currentUser;

            if (user !== null) {
                return user.token;
            } else {
                return '';
            }
        }

        function isLoggedIn() {
            let currentUser = $cookies.get('_authentication');
            if (currentUser) {
                $rootScope.currentUser = JSON.parse(currentUser);
                return true;
            } else {
                return false;
            }
        }

        function getProfile() {

            return $http.get($api.base + $api.account.profile)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    return null;
                });
        }

        function login(user) {

            return $http.post($api.base + $api.account.login, user)
                .then(function (response) {
                    setCredentials(response.data);
                    return response.data;
                }, function (error) {
                    return error;
                });
        }

        function setCredentials(authenticationData) {

            $rootScope.currentUser = {
                token: authenticationData.token,
                user: authenticationData.user
            };

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.currentUser.token;
            const cookieExpiryDate = new Date();
            cookieExpiryDate.setDate(cookieExpiryDate.getDate() + 7);
            $cookies.put('_authentication', JSON.stringify($rootScope.currentUser), {expires: cookieExpiryDate});
        }

        function clearCredentials() {
            $rootScope.currentUser = null;
            $cookies.remove('_authentication');
            $http.defaults.headers.common.Authorization = '';
        }
    }

})();