(function () {
    angular.module(QuizUp).controller('LoginController', ['$scope', '$api', '$http', '$authenticationService', '$state', function ($scope, $api, $http, $authenticationService, $state) {

        let vm = this;

        vm.alerts = [];

        vm.addAlert = function (message, type) {
            vm.alerts.push({message: message, type: type});
        };

        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };

        vm.login = function () {
            $authenticationService.Login(vm.loginData).then(function (data) {
                $state.go("Home", {}, {reload: true});
            }, function (err) {
                console.log(err);
            });
        };

        vm.loginData = {};

        // An array of our form fields with configuration
        // and options set. We make reference to this in
        // the 'fields' attribute on the  element
        vm.loginFields = [
            {
                key: 'username',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Username',
                    placeholder: 'Enter Your Username',
                    required: true
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter Your Password',
                    required: true
                }
            }
        ];
    }]);
})();