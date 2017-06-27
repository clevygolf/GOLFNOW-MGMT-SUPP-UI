'use strict';
app.factory('authenticationInterceptorService', ['$q', '$location', '$injector', 'localStorageService', 'notify', function ($q, $location, $injector, localStorageService, notify) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData && !config.url.endsWith('/token')) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    };

    var _retryHttpRequest = function (config, deferred) {
        var http = $injector.get('$http');
        http(config).then(function (response) {
            deferred.resolve(response);
        }, function (response) {
            deferred.reject(response);
        });
    }

    var _responseError = function (rejection) {
        var deferred = $q.defer();
        if (rejection.status === 401) {

            if (rejection.status === 401) {
                var authService = $injector.get('authenticationService');
                authService.refreshToken()
                    .then(function (response) {
                    _retryHttpRequest(rejection.config, deferred);
                    }, function () {
                        localStorageService.clearAll();
                        authService.logOut();
                        $location.path('/login');
                        deferred.reject(rejection);
                    });
            }
        }
        else if(rejection.status === 403) {
            notify.error("You do not have permission to execute this action");
        }
        else if (rejection.status === 500) {
            var message = 'Unexpected Error';

            if (rejection.data != null) {
                if (rejection.data.error_description != null) {
                    message = rejection.data.error_description;
                } else if (rejection.data.Message != null) {
                    message = rejection.data.Message;
                }
            }

            notify.error(message);
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);