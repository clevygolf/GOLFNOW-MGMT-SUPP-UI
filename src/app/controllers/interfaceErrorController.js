'use strict';
app.controller('interfaceErrorController', function ($scope, $http, $modal, notify, analyticsService) {
    $scope.description.area = 'General';
    $scope.description.name = 'Interface Errors';

    $scope.date = null;
    $scope.InterfaceErrorViewModel = new datePickerViewModel();

    $scope.metric = {
        series: [],
        labels: [],
        data: [],
        source: null,
        selectedSummary: null,
        selectedItem: null,
        selectedDetail: null
    };

    $scope.getInterfaceErrorsByDays = function () {
        analyticsService.getInterfaceErrorsByDays($scope.date)
            .then(function (results) {

                $scope.metric.source = null;
                $scope.metric.series = [];
                $scope.metric.labels = [];
                $scope.metric.data = [];
                $scope.metric.source = null;
                $scope.metric.selectedSummary = null;
                $scope.metric.selectedItem = null;
                    
                var labels = [];
                var data = [];
                var series = [];

                series = results.Series;

                angular.forEach(results.Summaries, function (summary) {
                    labels.push(summary.Label);
                    var counter = 0;
                    
                    angular.forEach(summary.Items, function (item) {

                        if (data[counter] == null) {
                            data[counter] = [];
                        }

                        data[counter].push(item.Frequency);
                        counter++;
                    });
                });

                $scope.metric.source = results;
                $scope.metric.series = series;
                $scope.metric.labels = labels;
                $scope.metric.data = data;
            });
    };

    $scope.onClick = function (points, evt) {
        
        if (points != null && points.length > 0) {
            var label = points[0].label;
            
            for (var i = 0; i < $scope.metric.source.Summaries.length; i++) {
                var summary = $scope.metric.source.Summaries[i];

                if (summary.Label === label) {
                    $scope.metric.selectedSummary = summary;

                    if (summary.Items.length > 0) {
                        $scope.metric.selectedItem = summary.Items[0];
                    }

                    return;
                }
            }
        }
    };

    $scope.viewDetail = function (item) {
        var modalInstance = $modal.open({
            templateUrl: 'app/views/shared/interface-view.html',
            controller: modalViewModel,
            size: 'lg',
            resolve: {
                item: function () { return item; }
            }
        });
    };
});