'use strict';
app.controller('logsCrmController', function ($scope, $http, notify, logService) {
    $scope.description.area = 'General';
    $scope.description.name = 'CRM Error Logs';

    $scope.MaxToReturn = [5, 10, 25, 100, 1000];
    $scope.Criteria = new searchErrorLogsCriterialViewModel();

    $scope.searchErrorLogs = function () {

        // validate
        if ($scope.Criteria.EmailAddress == null) {
            notify.warning('Please enter a valid email address', 'Invalid Email Address');
            return;
        }

        logService.searchCrm($scope.Criteria.EmailAddress, $scope.Criteria.LogsToReturn)
            .then(function(results) {
                if (results == null) {
                    notify.error('Unexpected error encountered!');
                }
                else if (results.length == 0) {
                    notify.info('No logs found!', 'CRM Error Logs');
                }
                $scope.logs = results;
                },
                function(err) {
                    notify.error('Unexpected error searching for logs - ' + err);
                });
    };
});