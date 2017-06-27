var app = angular.module('SupportApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'ui.bootstrap', 'ngSanitize', 'queryBuilder', 'chart.js', 'yaru22.jsonHuman']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "dashboardController",
            templateUrl: "app/views/dashboard.html"
        })
        .when("/login", {
            controller: "loginController",
            templateUrl: "app/views/login.html",
            anonymous: true,
        })
        .when("/profile", {
            controller: "profileController",
            templateUrl: "app/views/profile.html"
        })
        .when("/customer/app", {
            controller: "customerAppSearchController",
            templateUrl: "app/views/Customer/customerAppSearch.html"
        })
        .when("/customer/correspondence", {
            controller: "customerEmailSearchController",
            templateUrl: "app/views/Customer/customerEmailSearch.html"
        })
        .when("/general/logs/crm", {
            controller: "logsCrmController",
            templateUrl: "app/views/General/logs.html"
        })
        .when("/general/logs/apps", {
            controller: "appLogsController",
            templateUrl: "app/views/General/applogs.html"
        })
        .when("/ops/affiliate/endpoint", {
            controller: "affiliateEndPointController",
            templateUrl: "app/views/Ops/addEndPoint.html"
        })
        .when("/ops/internal/principals", {
            controller: "applicationPrincipalsController",
            templateUrl: "app/views/Ops/applicationPrincipals.html"
        })
        .when("/course/search", {
            controller: "courseSearchController",
            templateUrl: "app/views/Course/search.html"
        })
        .when("/course/view", {
            controller: "courseViewController",
            templateUrl: "app/views/Course/view.html"
        })
        .when("/reservation/search", {
            controller: "reservationSearchController",
            templateUrl: "app/views/Reservation/search.html"
        })
        .when("/general/interface", {
            controller: "interfaceErrorController",
            templateUrl: "app/views/General/interface.html"
        })
        .otherwise({});
});

app.config(function($httpProvider) {
    /**
     * make delete type json
     */
    $httpProvider.defaults.headers.delete = {
        //'Content-Type': 'application/json;charset=utf-8',
    
    };
});

app.run(function ($rootScope, $location, authenticationService) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if (next && next.$$route && !next.$$route.anonymous) {
            if (!authenticationService.profile.isAuthorized) {
                $rootScope.$evalAsync(function () {
                    $location.path('/login');
                });
            }
        }
    });

    authenticationService.fillAuthData();
});

// configure authentication interceptor
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authenticationInterceptorService');
});

var converter = {};

converter.regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
converter.convertDateStringsToDates = function (input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(converter.regexIso8601))) {
            var milliseconds = Date.parse(match[0]);
            if (!isNaN(milliseconds)) {
                input[key] = new Date(milliseconds);
            }
        } else if (typeof value === "object") {
            // Recurse into object
            converter.convertDateStringsToDates(value);
        }
    }
};

// convert 'dates as strings' to real 'date' objects
app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function (responseData) {
        converter.convertDateStringsToDates(responseData);
        return responseData;
    });
}]);
