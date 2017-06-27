'use strict';

app.controller('customerEmailSearchController', function ($scope, notify, customerService) {

    $scope.description.area = 'Customer';
    $scope.description.name = 'Email Exchange Search';

    $scope.CustomerEmail = "";

    $scope.searchCustomerCorrespondence = function () {

        customerService.searchCorrespondence($scope.CustomerEmail)
            .then(function(results) {
                if (results.length == 0) {
                    notify.info('No exchanges with that email address found', 'Customer Email Search');
                }

                    $scope.customerCorrespondence = results;
                },
            function(err) {
                notify.error('Unexpected error searching for correspondence - ' + err);
        });
    };
});