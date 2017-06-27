'use strict';
app.controller('dashboardController', ['$scope', 'notify', '$modal', function ($scope, notify, $modal, accountService, config, metadataService) {
    $scope.description.area = 'Home';
    $scope.description.name = 'Dashboard';
}]);