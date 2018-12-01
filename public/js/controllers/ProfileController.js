(function () {
    angular.module(QuizUp).controller('ProfileController', ['$scope', '$authenticationService', '$userService', function ($scope, $authenticationService, $userService) {

        let vm = this;

        vm.alerts = [];

        vm.addAlert = function (message, type) {
            vm.alerts.push({message: message, type: type});
        };

        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };

        if ($authenticationService.IsLoggedIn()) {
            vm.profile = {
                first_name: $scope.currentUser.user.first_name,
                last_name: $scope.currentUser.user.last_name
            };
        } else {
            vm.profile = {};
        }

        vm.update = function(){
            $userService.Profile(vm.profile).then(success => {
                vm.addAlert("Profile Updated Successfully", "success")

            }, error => {
                vm.addAlert("Profile Could Not Be Updated", "danger")
            });
        };

        vm.profileFields = [
            {
                key: 'first_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter Your First Name',
                    required: true
                }
            },
            {
                key: 'last_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter Your Last Name',
                    required: true
                }
            }
        ];

    }]);
})();