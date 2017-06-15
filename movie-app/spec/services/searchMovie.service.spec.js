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

    it('should get best matching employee data from service', function(){
        httpBackend.expectGET(appConstants.searchStubApi).respond(200, {});
        var deferredObj = searchService.searchMovie();
        deferredObj.then(function(data){
            expect(data).toEqual({});
        });
        httpBackend.flush();
    });

    it('should get best matching employee data from service', function(){
        httpBackend.expectGET(appConstants.searchfullStubApi).respond(200, {});
        var deferredObj = searchService.getStubMovie(appConstants.searchfullStubApi);
        deferredObj.then(function(data){
            expect(data).toEqual({});
        });
        httpBackend.flush();
    });

    it('should get default photo when employee photo fails to load', function(){
        httpBackend.expectGET(appConstants.searchStubApi).respond(404);
        searchService.searchMovie();
        httpBackend.flush();
    });

    it('should resolve deferred Object', function(){
        searchService.searchMovie();
        abortService.remove();
    });

});
