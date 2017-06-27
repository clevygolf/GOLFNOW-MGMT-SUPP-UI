'use strict';
app.factory('accountService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _getProfile = function () {

        var deferred = $q.defer();
        $http.get(config.commonUrl + 'account/profile').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _changePassword = function (oldPassword, newPassword, confirmPassword) {
        var deferred = $q.defer();
        $http.post(config.url + 'account/ChangePassword', { OldPassword: oldPassword, NewPassword: newPassword, ConfirmPassword: confirmPassword }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.getProfile = _getProfile;
    factory.changePassword = _changePassword;

    return factory;
}]);