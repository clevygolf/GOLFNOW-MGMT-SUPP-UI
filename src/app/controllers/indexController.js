'use strict';
app.controller('indexController', ['$scope', '$location', '$modal', 'authenticationService', 'config', 'notify', function ($scope, $location, $modal, authenticationService, config, notify) {

    $scope.copyright = '\u00A9' + ' ' + (new Date().getFullYear());
    $scope.description = {};
    $scope.security = {};

    $scope.logOut = function () {
        authenticationService.logOut();
        $location.path('/login');
    };

    authenticationService.fillAuthData();

    if (!authenticationService.profile.isAuthorized) {
        authenticationService.logOut();
        $location.path('/login');
        return;
    }

    $scope.loginInfo = { userName: '', password: '' };
    $scope.profile = authenticationService.profile;
    $scope.login = function () {
        var modalInstance = $modal.open({
            templateUrl: 'templates/login.html',
            controller: 'modalController',
            backdrop: 'static',
            resolve: {
                item: function () {
                    return $scope.loginInfo;
                }
            }
        });

        modalInstance.result.then(function (item) {
            authenticationService.login(item)
                .then(function () {
                    var obj = $location.search();
                    if (obj.ru != null && obj.ru.length > 0) {
                        $location.url(obj.ru);
                    }
                },
                function () { $scope.login(); });
        });
    };

    $scope.loginInfo.resetPasswordRequest = function (emailaddress) {
        if (emailaddress == null) {
            notify.warning('Please enter your email address', 'Email Not Specified');
        } else {
            authenticationService.resetPasswordRequest(emailaddress).then(function () {
                notify.success('Please check your email for the next steps to reset your password.');
            });
        }
    };

    authenticationService.getSecuritySet()
        .then(
            function(results) {
                $scope.security = results;
            });
}]);