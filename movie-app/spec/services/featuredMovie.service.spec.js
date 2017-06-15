describe('register.Service', function() {
  'use strict';

  var featuredService, httpBackend, appConstants, abortService;


  beforeEach(module('app.movie-app'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    featuredService = $injector.get('featuredService');
    appConstants = $injector.get('appConstants');
    abortService = $injector.get('abortRequestService');

  }));

  it('should get best matching employee data from service', function(){
    httpBackend.expectGET(appConstants.featuredApi).respond(200, {});
    var deferredObj = featuredService.featuredMovie();
    deferredObj.then(function(data){
      expect(data).toEqual({});
    });
    httpBackend.flush();
  });

  it('should get default photo when employee photo fails to load', function(){
    httpBackend.expectGET(appConstants.featuredApi).respond(404);
    featuredService.featuredMovie();
    httpBackend.flush();
  });

  it('should resolve deferred Object', function(){
    featuredService.featuredMovie();
    abortService.remove();
  });

});
