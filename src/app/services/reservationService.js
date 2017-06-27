'use strict';
app.factory('reservationService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _search = function (criteria) {

        var deferred = $q.defer();
        $http.get(config.url + 'reservation/search', {
            params:
            {
                golfCourseId: criteria.GolfCourseId,
                confirmationNumber: criteria.ConfirmationNumber,
                emailAddress: criteria.EmailAddress,
                rateSetId: criteria.RateSetId,
                reservationId: criteria.ReservationId,
                teeTimeId: criteria.TeeTimeId,
                teeTimeStartDate: criteria.TeeTimeStartDate,
                teeTimeEndDate: criteria.TeeTimeEndDate,
                reservationStartDate: criteria.ReservationStartDate,
                reservationEndDate: criteria.ReservationEndDate
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.search = _search;

    return factory;
}]);