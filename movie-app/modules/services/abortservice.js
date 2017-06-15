(function () {
    'use strict';

    angular.module('app.movie-app')
        .factory('abortRequestService', abortRequestService);
    abortRequestService.$inject = [];

    function abortRequestService() {

        function abort(id, abortHttpRequestList) {

            function abortRequestFn(promise, i) {
                promise.resolve();
                abortHttpRequestList.splice(i, 1);
            }

            if (angular.isDefined(id)) {
                abortRequestFn(abortHttpRequestList[id], id);
            } else {
                angular.forEach(abortHttpRequestList, abortRequestFn);
            }

        }

        return {
            remove: abort
        };
    }

})();