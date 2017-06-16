describe('Test for Featured movies controller', function () {
    'use strict';

    var vm, scope, controller, createController, searchService, featuredService, appConstants, DeferredObj, httpBackend, rootScope;

    beforeEach(module('app.movie-app'));

    beforeEach(inject(function ($injector) {
        appConstants = $injector.get('appConstants');
        httpBackend = $injector.get('$httpBackend');
        rootScope = $injector.get('$rootScope');
        //featuredService = $injector.get('featuredService');
        DeferredObj = function(){
            this.then = function (_successCallback, _errorCallback) {
                this.successCallback = _successCallback;
                this.errorCallback = _errorCallback;
                return this;
            };
            this.catch = function (err){
                this.catchCallback = err;
            };
            this.resolve = function (data) {
                this.successCallback(data);
            };
            this.reject = function (error) {
                /*if (this.errorCallback) {
                    this.errorCallback(data);
                }else if(this.catchCallback){

                  */  this.catchCallback(error);
               // }
            };
        };

        featuredService = {
            featuredMovie: function () {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            remove: function(){

            }
        };

        controller = $injector.get('$controller');

        createController = function () {
            scope = rootScope.$new();
            return controller('FeaturedController', {
                '$scope': scope,
                '$http': httpBackend,
                'appConstants': appConstants,
                'featuredService': featuredService
            });
        };

        vm = createController();

    }));

    it('should initialize controller', function () {
        expect(vm).not.toBeNull();
    });

    it('Branch Coverage',function(){
        createController();
    });

    it('should get the feature movies list',function(){
        vm = createController();
        var data = {data: [ {}, {featured: {'title': 'La La Land'}}]};
        featuredService.deferredObj.resolve(data);
        expect(vm.featureMovie).toEqual({'title': 'La La Land'});
    });

    it('should handle the failure scenario of the featured service',function(){
        vm = createController();
        featuredService.deferredObj.reject(500);
        expect(vm.featureMovieError).toEqual(true);
    });


});