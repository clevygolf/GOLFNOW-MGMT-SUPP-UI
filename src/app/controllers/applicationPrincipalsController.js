'use strict';
app.controller('applicationPrincipalsController', function ($scope, $modal, notify, principalService) {
    $scope.description.area = 'Operations';
    $scope.description.name = 'App Principals';

    $scope.principals = [];

    $scope.getApplicationPrincipals = function() {
        principalService.getAllPrincipals()
        .then(
            function (results) {
                $scope.principals = results;
            });
    };

    $scope.getApplicationPrincipals();

    $scope.createPrincipal = function () {

        if (!$scope.security.CanCreateApplicationPrincipal) {
            notify.warning('You do not have the required permission to create an application principal');
            return;
        }

        var item = {
            ApplicationName: '',
            LoginName: '',
            Password: '',
            ConfirmPassword: '',
            Accept: function (callback) {
                principalService.createPrincipal(this.ApplicationName, this.LoginName, this.Password)
                    .then(function() {
                        notify.success('principal created!');
                    });
            }
        };

        var modalInstance = $modal.open({
            templateUrl: 'app/views/Shared/createprincipal-view.html',
            controller: modalViewModel,
            size: 'lg',
            resolve: {
                item: function () { return item; }
            }
        });
    };

    $scope.viewPrincipal = function (item) {

        if (!$scope.security.CanViewApplicationPrincipalPermissions) {
            notify.warning('You do not have the required permission to view an application principal in detail');
            return;
        }

        item.domains = [];
        item.Accept = function (callback) {
            principalService.setPermissions(this.ApplicationPrincipalId, this.domains)
                .then(callback);
        }

        principalService.getPermissionsByPrincipal(item.ApplicationPrincipalId)
            .then(function(results) {
                item.domains = results;
            });

        var modalInstance = $modal.open({
            templateUrl: 'app/views/shared/principal-view.html',
            controller: modalViewModel,
            size: 'lg',
            resolve: {
                item: function () { return item; }
            }
        });
    };
});