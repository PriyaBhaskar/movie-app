(function() {
    'use strict';

    angular
        .module('app.mock', ['ngMockE2E'])
        .factory('mockHttp', mockHttp);

    function mockHttp() {
        var service = {
            get: get
        };
        return service;

        function get(url) {
            var request = new XMLHttpRequest();

            request.open('get', url, false);
            request.send(null);

            if (request.status === 200) {
                return [200, JSON.parse(request.responseText)];
            } else {
                console.error('data url ' + url + ' does not exist');
                return [400, ''];
            }
        }
    }
})();