'use strict';
app.factory('principalService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _getAllPrincipals = function () {

        var deferred = $q.defer();
        $http.get(config.url + 'principal/all').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _getPermissionsByPrincipal = function (principalId) {

        var deferred = $q.defer();
        $http.get(config.url + 'principal/permissions', { params: { principalId: principalId } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _setPermissions = function (principalId, permissions) {

        var deferred = $q.defer();
        $http.put(config.url + 'principal/permissions/set', { PrincipalId: principalId, Permissions: permissions }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _createPrincipal = function (applicationName, loginName, password) {

        var deferred = $q.defer();
        $http.post(config.url + 'principal/create', { ApplicationName : applicationName, LoginName : loginName, Password : password }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.getAllPrincipals = _getAllPrincipals;
    factory.getPermissionsByPrincipal = _getPermissionsByPrincipal;
    factory.setPermissions = _setPermissions;
    factory.createPrincipal = _createPrincipal;

    return factory;
}]);