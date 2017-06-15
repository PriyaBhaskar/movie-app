(function() {
    'use strict';

    angular.module('app.movie-app')
        .factory('searchService', searchService);
    searchService.$inject= [
        '$http',
        '$q',
        'appConstants',
        'abortRequestService'];
    function searchService($http, $q, appConstants, abortRequestService) {
        'use strict';

        var abortHttpRequestList = [];

        function searchMovie(data) {
            var response = $q.defer(),
                abortHttpRequest = $q.defer(),
                settings = {
                    method: 'GET',
                    url: appConstants.searchApi,
                    params: JSON.stringify(data),
                    timeout: abortHttpRequest.promise
                },
                id = abortHttpRequestList.length;

            abortHttpRequestList.push(abortHttpRequest);

            $http(settings).then(function (data) {
                response.resolve(data);
            },function (error) {
                response.reject(error);
            }).finally(function () {
                abortRequestService.remove(id, abortHttpRequestList);
            });
            return response.promise;
        }

        function getStubMovie(url) {
            var response = $q.defer(),
                abortHttpRequest = $q.defer(),
                settings = {
                    method: 'GET',
                    url: url,
                    timeout: abortHttpRequest.promise
                },
                id = abortHttpRequestList.length;

            abortHttpRequestList.push(abortHttpRequest);

            $http(settings).then(function (data) {
                response.resolve(data);
            },function (error) {
                response.reject(error);
            }).finally(function () {
                abortRequestService.remove(id, abortHttpRequestList);
            });
            return response.promise;
        }


        return {
            searchMovie: searchMovie,
            getStubMovie: getStubMovie
        };
    }
})();