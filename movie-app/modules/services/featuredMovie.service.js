(function() {
    'use strict';

angular.module('app.movie-app')
    .factory('featuredService', featuredService);
    featuredService.$inject= [
        '$http',
        '$q',
        'appConstants',
        'abortRequestService'];
        function featuredService($http, $q, appConstants, abortRequestService) {
            'use strict';

            var abortHttpRequestList = [];

            function featuredMovie() {
                var response = $q.defer(),
                    abortHttpRequest = $q.defer(),
                    settings = {
                        method: 'GET',
                        url: appConstants.featuredApi,
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
                featuredMovie: featuredMovie
            };
        }
})();