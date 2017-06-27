'use strict';
app.controller('profileController', ['$scope', 'notify', '$modal', 'accountService', 'config', function ($scope, notify, $modal, accountService, config, metadataService) {

    $scope.profile = {};
    $scope.changePassword = { Current: '', Password: '', ConfirmPassword: '' };

    $scope.refresh = function () {
        accountService.getProfile()
        .then(function (response) {
            $scope.profile = response;
        }, function (err) {
            notify.error('Unable to get profile information. Please try again later.');
        });
    };

    $scope.refresh();

    $scope.changePassword = function () {
        accountService.changePassword($scope.changePassword.Current, $scope.changePassword.Password, $scope.changePassword.ConfirmPassword)
            .then(function () {
                notify.success('Password successfully changed!');
            });
    };

    $scope.loginInfo.authExternalProvider = function (provider) {
        var redirectUri = location.protocol + '//' + location.host + config.suffix + '/auth.html';

        var externalProviderUrl = config.commonUrl + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + config.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };
}]);