function modalViewModel($scope, $modalInstance, item) {

    $scope.item = item;

    $scope.Accept = function () {
        $modalInstance.close();
    };

    $scope.Cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};