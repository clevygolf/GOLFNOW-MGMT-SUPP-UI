'use strict';
app.factory('authenticationService', ['$http', '$q', 'localStorageService', 'config', 'notify', 'accountService', function ($http, $q, localStorageService, config, notify, accountService) {

    var authServiceFactory = {};

    var _profile = {
        isAuthorized: false,
        userName: ""
    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=" + config.clientId;

        var deferred = $q.defer();

        $http.post(config.baseUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            _profile.isAuthorized = true;
            var d = { token: response.access_token, refresh: response.refresh_token, userName: loginData.userName };
            localStorageService.set('authorizationData', d);

            accountService.getProfile()
                .then(function (rsp) {
                    _profile.userName = rsp.Name;
                }, function (err, status) {
                    _profile.userName = loginData.userName;
                })
            .finally(function () {
                localStorageService.set('authorizedUser', { friendlyName: _profile.userName });
            });

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');
        localStorageService.remove('authorizedUser');

        _profile.isAuthorized = false;
        _profile.userName = "";

    };

    var _fillAuthData = function () {

        var friendly = localStorageService.get('authorizedUser');

        if (friendly) {
            _profile.isAuthorized = true;
            _profile.userName = friendly.friendlyName;
        }

    };

    var _resetPasswordRequest = function (emailAddress) {
        var deferred = $q.defer();
        $http.put(config.url + 'account/resetpasswordrequest?emailaddress=' + emailAddress).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _resetPassword = function (emailAddress, token) {
        var deferred = $q.defer();
        $http.put(config.url + 'account/resetpassword?emailaddress=' + emailAddress + '&token=' + token).success(function (response) {
            deferred.resolve(response);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _getSecuritySet = function () {

        var deferred = $q.defer();
        $http.get(config.commonUrl + 'account/security').success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _refreshToken = function () {

        var deferred = $q.defer();
        var authData = localStorageService.get('authorizationData');

        var data = "grant_type=refresh_token&refresh_token=" + authData.refresh + "&client_id=" + config.clientId;
        $http.post(config.baseUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function (response) {
                _profile.isAuthorized = true;
                var authData = localStorageService.get('authorizationData');
                authData.token = response.data.access_token;
                authData.refresh = response.data.refresh_token;
                localStorageService.set('authorizationData', authData);
                deferred.resolve(response);
            }, function (err, status) {
                _logOut();
                deferred.reject(err);
            });

        return deferred.promise;
    };

    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.profile = _profile;
    authServiceFactory.resetPasswordRequest = _resetPasswordRequest;
    authServiceFactory.resetPassword = _resetPassword;
    authServiceFactory.getSecuritySet = _getSecuritySet;
    authServiceFactory.refreshToken = _refreshToken;

    return authServiceFactory;
}]);