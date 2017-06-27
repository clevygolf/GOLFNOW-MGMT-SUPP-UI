'use strict';
app.factory('courseService', ['$http', '$q', 'config', 'notify', function ($http, $q, config, notify) {

    var factory = {};

    var _search = function (courseId, text, activeOnly, maxReturned) {

        var deferred = $q.defer();
        $http.get(config.url + 'course/search', { params : { golfCourseId : courseId, text : text, activeOnly : activeOnly, maxReturned : maxReturned }}).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _quickSearch = function ( text, maxReturned) {

        var deferred = $q.defer();
        $http.get(config.url + 'course/search/quick', { params : { text : text, maxReturned : maxReturned }}).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    var _rateSetSearch = function(courseId, playCourseId, rateSetId) {

        var deferred = $q.defer();
        $http.get(config.url + 'rateset/search', { params: { golfCourseId: courseId, playCourseId: playCourseId, rateSetId: rateSetId } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _refreshWebMarket = function (courseId) {

        var deferred = $q.defer();
        $http.put(config.url + 'webmarket/refresh', {} , { params : { golfCourseId: courseId } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _isWebMarket = function (courseId) {

        var deferred = $q.defer();
        $http.get(config.url + 'webmarket/is', { params: { golfCourseId: courseId } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    factory.search = _search;
    factory.quickSearch = _quickSearch;
    factory.rateSetSearch = _rateSetSearch;
    factory.refreshWebMarket = _refreshWebMarket;
    factory.isWebMarket = _isWebMarket;

    return factory;
}]);