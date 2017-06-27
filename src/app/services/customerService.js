'use strict';
app.factory('customerService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _searchByEmail = function (email) {

        var deferred = $q.defer();
        $http.get(config.url + 'customer/get', { params : { email: email } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _searchCorrespondence = function (email) {
        var deferred = $q.defer();
        $http.get(config.url + 'customer/correspondence/search', { params: { email: email } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.searchByEmail = _searchByEmail;
    factory.searchCorrespondence = _searchCorrespondence;

    return factory;
}]);