'use strict';
app.controller('modalController', ['$scope', '$modalInstance', 'item',
    function ($scope, $modalInstance, item) {
        $scope.item = item;
        $scope.save = function () {
            $modalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);