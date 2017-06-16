describe('featured.Service', function() {
  'use strict';

  var featuredService, httpBackend, appConstants, abortService;
  beforeEach(module('movie-app-test'));
  beforeEach(module('app.movie-app'));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
    featuredService = $injector.get('featuredService');
    appConstants = $injector.get('appConstants');
    abortService = $injector.get('abortRequestService');

  }));

  it('should get featured movies data from service', function(){
    httpBackend.expectGET(appConstants.featuredApi).respond(200, {});
    var deferredObj = featuredService.featuredMovie();
    deferredObj.then(function(data){
      expect(data.data).toEqual({});
    });
    httpBackend.flush();
  });

  it('should get error code when the featured movies services call fails', function(){
    httpBackend.expectGET(appConstants.featuredApi).respond(404);
    var deferredObj = featuredService.featuredMovie();
    deferredObj.then(function () {}, function (error) {
      expect(error.status).toEqual(404);
    });
    httpBackend.flush();
  });

  it('should resolve deferred Object', function(){
    featuredService.featuredMovie();
    abortService.remove();
  });

});
