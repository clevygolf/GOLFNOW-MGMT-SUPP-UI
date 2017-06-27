'use strict';
app.controller('reservationSearchController', function ($scope, $http, $modal, notify, courseService, reservationService) {
    $scope.description.area = 'Reservation';
    $scope.description.name = 'Search for Reservations';

    $scope.Criteria = new searchReservationsCriteriaViewModel();

    $scope.ReservationStartDateViewModel = new datePickerViewModel();
    $scope.ReservationEndDateViewModel = new datePickerViewModel();
    $scope.TeeTimeStartDateViewModel = new datePickerViewModel();
    $scope.TeeTimeEndDateViewModel = new datePickerViewModel();

    $scope.loadingGolfCourses = false;

    $scope.getGolfCourses = function (val) {
        return courseService.quickSearch(val, 20)
            .then(
                function(results) {
                    var facilities = [];

                    angular.forEach(results, function (item) {
                        facilities.push(item);
                    });
                    return facilities;
                });
    }

    $scope.getRateSets = function (golfCourseId) {
        courseService.rateSetSearch(golfCourseId, null, null)
            .then(
                function(results) {
                    $scope.rateSets = results;
                },
                function(err) {
                    notify.error('Unexpected error searching for rate sets - ' + err);
                }
            );
    };

    $scope.SelectedGolfCourse = null;
    $scope.SelectedRateSet = null;
    $scope.rateSets = [];

    $scope.$watch('SelectedGolfCourse', function (newValue, oldValue) {
        if (newValue != null && newValue.GolfCourseId != null) {
            $scope.getRateSets(newValue.GolfCourseId);
        }
    });

    $scope.searchReservations = function () {

        if ($scope.SelectedGolfFacility != null) {
            $scope.Criteria.GolfFacilityId = $scope.SelectedGolfFacility.GolfFacilityId;
        }
        else {
            $scope.Criteria.GolfFacilityId = null;
        }

        if ($scope.SelectedGolfCourse != null) {
            $scope.Criteria.GolfCourseId = $scope.SelectedGolfCourse.GolfCourseId;
        }
        else {
            $scope.Criteria.GolfCourseId = null;
        }

        reservationService.search($scope.Criteria)
            .then(
                function(results) {
                    if (results.length === 0) {
                        notify.info('No reservations found!', 'Reservations');
                    }
                    $scope.reservations = results;

                    if (results.length === 1) {
                        $scope.viewReservation(results[0]);
                    }
                },
                function(err) {
                    notify.error('Unexpected error searching for reservations - ' + err);
                }
            );
    };

    $scope.viewReservation = function (item) {
        var modalInstance = $modal.open({
            templateUrl: 'app/views/shared/reservation-view.html',
            controller: modalViewModel,
            size: 'lg',
            resolve: {
                item: function () { return item; }
            }
        });
    };
});