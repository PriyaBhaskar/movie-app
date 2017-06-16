describe('searchMovie.Service', function() {
    'use strict';

    var searchService, httpBackend, appConstants, abortService;

    beforeEach(module('app.movie-app'));

    beforeEach(inject(function($injector) {
        httpBackend = $injector.get('$httpBackend');
        searchService = $injector.get('searchService');
        appConstants = $injector.get('appConstants');
        abortService = $injector.get('abortRequestService');

    }));

    it('should get searched movie data with plot from service', function(){
        httpBackend.expectGET(appConstants.searchApi).respond(200);
        var deferredObj = searchService.searchMovie();
        deferredObj.then(function(data){
        });
        httpBackend.flush();
    });

    it('should get searched movie data with full plot from service', function(){
        httpBackend.expectGET(appConstants.searchStubFullApi).respond(200, {});
        var deferredObj = searchService.getStubMovie(appConstants.searchfullStubApi);
        deferredObj.then(function(data){
            expect(data.data).toEqual({});
        });
        httpBackend.flush();
    });

    it('should get error code when the search service call fails', function(){
        httpBackend.expectGET(appConstants.searchApi).respond(404);
        var deferredObj = searchService.searchMovie();
        deferredObj.then(function(){}, function (error) {
            expect(error.status).toEqual(404);
        });
        abortService.remove();
        httpBackend.flush();
    });

    it('should resolve deferred Object', function(){
        searchService.searchMovie();
        abortService.remove();
    });

});
