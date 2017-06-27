'use strict';
app.factory('logService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _searchCrm = function (email, maxReturned) {

        var deferred = $q.defer();
        $http.get(config.url + 'log/search/crm', { params: { email: email, maxReturned: maxReturned } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _searchAppLogs = function (query, daysBack, maxReturned, lastId) {

        var deferred = $q.defer();
        $http.post(config.url + 'log/search/app', { Operand: query, DaysBack: daysBack, Take: maxReturned, LastId : lastId }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _getAppLogMappings = function() {
        var deferred = $q.defer();
        $http.get(config.url + 'log/mappings/app', { }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.searchCrm = _searchCrm;
    factory.searchAppLogs = _searchAppLogs;
    factory.getAppLogMappings = _getAppLogMappings;

    return factory;
}]);