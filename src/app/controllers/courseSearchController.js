'use strict';
app.controller('courseSearchController', function ($scope, $http, $modal, notify, courseService, $location) {
    $scope.description.area = 'Golf Course';
    $scope.description.name = 'Search';

    $scope.Criteria = {
        GolfCourseNameOrId: '',
    };

    $scope.courses = [];

    $scope.searchCourses = function () {
        courseService.quickSearch($scope.Criteria.GolfCourseNameOrId, 50)
        .then(function (data) {
            var courses = [];

            angular.forEach(data, function (item) {
                courses.push(item);
            });

            // automatically move them to the facility view page
            if (courses.length == 1) {
                $scope.goTo(courses[0].GolfCourseId);
            }

            $scope.courses = courses;
        },
                function (err) {
                    notify.error('Unexpected error searching for courses - ' + err);
                });
    }

    $scope.goTo = function (golfFacilityId) {
        $location.path('/course/view').search({ id: golfFacilityId });
    };
});