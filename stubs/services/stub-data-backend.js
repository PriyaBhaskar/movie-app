(function() {
    'use strict';

    angular
        .module('app.mock')
        .factory('stubDataBackend', stubDataBackend);

    stubDataBackend.$inject = ['$location', 'mockHttp'];

    function stubDataBackend($location, mockHttp) {
        var service = {
            respond: respond
        };

        return service;

        function respond(path) {
            if(path === '/search') {
                return mockHttp.get('/stubs/services/searchmovie-data-backend.json');
            }
            if(path === '/searchfull') {
                return mockHttp.get('/stubs/services/searchmovie-data-backend-full.json');
            }
            else if(path === '/featured') {
                return mockHttp.get('/stubs/services/featuredmovie-data-backend.json');
            }
        }
    }
})();