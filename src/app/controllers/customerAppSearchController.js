'use strict';

app.controller('customerAppSearchController', function ($scope, notify, customerService) {

    $scope.description.area = 'Customer';
    $scope.description.name = 'App Subscriptions';

    $scope.CustomerEmail = "";

    $scope.searchCustomerByEmail = function () {
        customerService.searchByEmail($scope.CustomerEmail)
            .then(function(results) {

                if (results.FullName == null) {
                    notify.info('No app subscriptions found associated with that email address', 'Customer App Search');
                }

                $scope.customerInfo = results;
                },
            function(err) {
                notify.error('Unexpected error searching for subscriptions - ' + err);
            });

    };
});