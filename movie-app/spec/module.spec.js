describe('tnt-registration-flow.mainController', function() {
    'use strict';

    var controller, DeferredObj, deferredObj1, element, form, rootScope, scope, vm, appConstants, registerService, registerServiceData;

    beforeEach(module('app.movie-app'));

    beforeEach(inject(function($injector, $rootScope, $compile, $componentController, $templateCache, $q) {
        scope = $rootScope.$new();
        rootScope = $injector.get('$rootScope');
        appConstants = $injector.get('appConstants');
        $templateCache.put("movie-app/module.html", '<section class="movie-app">\r\n	<nav class="menu">\r\n		<ul>\r\n			<li class="menu-items"><a href="#!search">Search</a></li>\r\n			<li class="menu-items"><a href="#!featured">Featured Movies</a></li>\r\n			<li class="menu-items"><a href="#!contactus">Contact Us</a></li>\r\n		</ul>\r\n	</nav>\r\n	<div ng-view></div>\r\n</section>');
        element = angular.element('<movie-app></movie-app>');
        element = $compile(element)(scope);
        controller = $componentController('movieApp', {$scope: scope});
        scope.$apply();
    }));


    beforeEach(inject(function($injector) {

        registerServiceData = {};
        registerService = {
            registerUser: function() {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            }
        };

        DeferredObj = function() {
            this.then = function(_successCallback, _errorCallback) {
                this.successCallback = _successCallback;
                this.errorCallback = _errorCallback;
                return this;
            };
            this.catch = function(fun) {
                this.catchCallback = fun;
            };
            this.resolve = function(data) {
                this.successCallback(data);
            };
            this.reject = function(data) {
                /!* istanbul ignore if *!/
                if (this.errorCallback) {
                    this.errorCallback(data);
                }
                else if (this.catchCallback) {
                    this.catchCallback(data);
                }
            };
        };


        vm = controller;

    }));

    afterEach(inject(function(){
    }));


    it('should initialize controller', function() {
        expect(vm).not.toBeNull();
    });

    it('Controller should initialize default variables', function() {
        //spyOn(registerService, 'registerUser').and.callThrough();
        expect(vm.register).toBeDefined();
    });

    it('Should fail to submit the user registration form', function() {
        spyOn(registerService, 'registerUser').and.callFake(function() {
            var promise = deferredObj.promise;
            deferredObj.reject();
            return promise;
        });

    });


    it('Should submit the user registration form', function() {
        spyOn(registerService, 'registerUser').and.callThrough();

    });


    it('Should validate if the password is with correct format', function() {

    });


});

