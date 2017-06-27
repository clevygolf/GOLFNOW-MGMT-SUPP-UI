'use strict';
app.factory('analyticsService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _getInterfaceErrorsByDays = function (date) {
        var deferred = $q.defer();
        $http.get(config.url + 'analytics/interface/days', { params: { date: date } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.getInterfaceErrorsByDays = _getInterfaceErrorsByDays;

    return factory;
}]);