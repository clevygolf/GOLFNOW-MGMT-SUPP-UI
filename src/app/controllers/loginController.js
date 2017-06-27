'use strict';
app.controller('loginController', ['$scope', '$location', '$modal', 'authenticationService', 'config', 'notify', function ($scope, $location, $modal, authenticationService, config, notify) {
    $scope.description.area = 'Support';
    $scope.description.name = 'Login';
    authenticationService.logOut();

    $scope.loginInfo = { userName: '', password: '' };

    $scope.login = function () {
        authenticationService.login($scope.loginInfo)
                .then(function () {
                    var obj = $location.search();
                    if (obj.ru != null && obj.ru.length > 0) {
                        $location.url(obj.ru);
                    } else {
                        $location.url('/');
                    }
                },
                function (res) { notify.error( res.error_description != null ? res.error_description : 'login failed'); });
    };

    $scope.loginInfo.resetPasswordRequest = function () {
        if ($scope.loginInfo.userName == null) {
            notify.warning('Please enter your user name', 'User Name Not Specified');
        } else {
            authenticationService.resetPasswordRequest($scope.loginInfo.userName).then(function () {
                notify.success('Please check your email for the next steps to reset your password.');
            });
        }
    };
}]);