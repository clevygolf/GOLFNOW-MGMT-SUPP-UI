'use strict';
app.controller('affiliateEndPointController', function ($scope, notify, affiliateService) {
    $scope.description.area = 'Operations';
    $scope.description.name = 'Affiliate End Points';

    $scope.AffiliateName = "";
    $scope.StartingPoint = "";
    $scope.EndingPoint = "";

    $scope.searchEndPoints = function () {
        affiliateService.searchEndpoints($scope.AffiliateName)
            .then(function(results) {
                $scope.endPoints = results;
            });
    };

    $scope.addEndPoints = function () {

        affiliateService.addEndpoint($scope.AffiliateName, $scope.StartingPoint, $scope.EndingPoint)
            .then(function(results) {
                notify.info('End point successfully added.', 'End Points');
                $scope.searchEndPoints();
            });

    };

});