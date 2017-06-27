'use strict';
app.factory('affiliateService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _searchEndpoints = function (affiliate) {

        var deferred = $q.defer();
        $http.get(config.url + 'endpoint/search', { params : { affiliate: affiliate }}).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _addEndpoint = function (affiliateName, startingPoint, endingPoint) {
        var deferred = $q.defer();
        $http.post(config.url + 'endpoint/add', { AffiliateName: affiliateName, StartingPoint: startingPoint, EndingPoint: endingPoint }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.searchEndpoints = _searchEndpoints;
    factory.addEndpoint = _addEndpoint;

    return factory;
}]);