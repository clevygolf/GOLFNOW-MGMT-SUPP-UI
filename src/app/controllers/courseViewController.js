'use strict';
app.controller('courseViewController', function ($scope, $http, $modal, notify, courseService, $location) {
    $scope.description.area = 'Course';
    $scope.description.name = 'View Golf Course';

    $scope.HasWebMarketRateSets = false;
    $scope.golfCourseId = $location.search().id;

    if ($scope.golfCourseId == null) {
        $location.path('/product/search');
        return;
    }

    $scope.GolfCourse = {};
    $scope.CourseRateSets = [];
    $scope.AllRateSets = [];

    courseService.search($scope.golfCourseId, '', false, 1)
            .then(function (results) {
                $scope.GolfCourse = results[0];
            });

    courseService.rateSetSearch($scope.golfCourseId, null, null)
        .then(function(results) {
            var courses = [];
            angular.forEach(results, function (item) {
                courses.push(item);
            });
            $scope.CourseRateSets = courses;
        });

    courseService.rateSetSearch(null, $scope.golfCourseId, null)
        .then(function (results) {
            var courses = [];
            angular.forEach(results, function (item) {
                courses.push(item);
            });
            $scope.AllRateSets = courses;
        });

    courseService.isWebMarket($scope.golfCourseId)
        .then(function (results) {
            $scope.HasWebMarketRateSets = results;
        });

    $scope.refreshWebMarketInventory = function () {

        courseService.refreshWebMarket($scope.golfCourseId)
            .then(function(results) {
                if (results.GolfNowRateSetCount == 0 || results.WebMarketRateSetCount == 0) {
                    notify.error('This golf course is not a web market course.');
                    return;
                }
                else {
                    var msg = results.GolfNowRateSetCount + ' GolfNow and ' + results.WebMarketRateSetCount + ' Web Market rate sets have been refreshed!';
                    notify.success(msg);
                    return;
                }
            });
    }
});