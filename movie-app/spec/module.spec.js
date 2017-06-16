describe('movie-app.mainController', function() {
    'use strict';

    var controller, DeferredObj, deferredObj1, element, rootScope, scope, vm, appConstants;

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
        vm = controller;
    }));

    it('should initialize controller', function() {
        expect(vm).not.toBeNull();
    });

});

