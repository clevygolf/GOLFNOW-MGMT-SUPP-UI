'use strict';
app.controller('appLogsController', ['$scope', '$modal', 'notify', 'logService', function ($scope, $modal, notify, logService) {

    $scope.description.area = 'General';
    $scope.description.name = 'App Logs';
    $scope.logs = [];

    logService.getAppLogMappings()
        .then(function (results) {
            $scope.fields = results.Fields;
            $scope.operators = results.Operators;
            $scope.conditions = results.Conditions;
        });

    $scope.days = [1, 2, 3, 4, 5];
    $scope.returns = [25, 50, 100];
    $scope.daysBack = 3;
    $scope.maxReturned = 25;
    $scope.query = null;

    $scope.criteria = {
        query: null,
        daysBack: 1,
        maxReturned: 25
    };

    $scope.searchAppLogs = function () {

        $scope.logs = [];

        if ($scope.query == null) {
            notify.warning("Please set a filter first");
            return;
        }

        // make copy of query
        $scope.criteria.query = JSON.parse(JSON.stringify($scope.query));
        $scope.criteria.daysBack = $scope.daysBack;
        $scope.criteria.maxReturned = $scope.maxReturned;

        logService.searchAppLogs($scope.query, $scope.daysBack, $scope.maxReturned)
            .then(function(res) {
                angular.forEach(res, function (item) {
                    $scope.logs.push(item);
                });
            });
    };

    $scope.continueSearchAppLogs = function() {
        var id = $scope.logs[$scope.logs.length - 1].Id;

        logService.searchAppLogs($scope.criteria.query, $scope.criteria.daysBack, $scope.criteria.maxReturned, id)
            .then(function (res) {
                angular.forEach(res, function (item) {
                    $scope.logs.push(item);
                });
            });

    };

    $scope.viewDetail = function (item) {
        var modalInstance = $modal.open({
            templateUrl: 'app/views/shared/generic-view.html',
            controller: modalViewModel,
            size: 'lg',
            resolve: {
                item: function() {
                    return JSON.stringify(item, undefined, 2);
                }
            }
        });
    };

    var data = '{"group": { "$type" : "ManageApi.Areas.Support.Model.General.GroupOperand, ManageApi.Areas.Support.Model", "operator": "AND","rules": []}}';

    function htmlEntities(str) {
        return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function computed(group) {
        if (!group) return "";
        for (var str = "(", i = 0; i < group.rules.length; i++) {
            i > 0 && (str += " <strong>" + group.operator + "</strong> ");
            str += group.rules[i].group ?
                computed(group.rules[i].group) :
                 "\"" + group.rules[i].field + "\"" + " " + htmlEntities(group.rules[i].condition) + " "  + "\"" + group.rules[i].data + "\"";
        }

        return str + ")";
    }

    $scope.json = null;

    $scope.filter = JSON.parse(data);

    $scope.$watch('filter', function (newValue) {
        $scope.query = newValue.group;
        $scope.json = JSON.stringify(newValue, null, 2);
        $scope.output = computed(newValue.group);
    }, true);
}]);
