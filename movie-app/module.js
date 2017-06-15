(function() {
    'use strict';

    angular
        .module('app.movie-app', ['ngRoute'])
        .component('movieApp', {
            bindings: {
            },
            templateUrl: 'movie-app/module.html',
            controller: MainController
        })
        .config(['$routeProvider',function($routeProvider) {
            $routeProvider
                .when("/search", {
                    templateUrl : "movie-app/partials/search.html",
                    controller: "SearchController",
                    controllerAs: "search"
                })
                .when("/featured", {
                    templateUrl : "movie-app/partials/featured.html",
                    controller: "FeaturedController",
                    controllerAs: "featured"
                })
                .when("/contactus", {
                    templateUrl : "movie-app/partials/contactus.html"
                });

        }]);

    MainController.$inject = ['$scope'];

    function MainController($scope) {

        /*jshint validthis: true */
        var vm = this;

    }

})();

