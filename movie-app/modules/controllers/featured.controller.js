(function() {
    'use strict';

    angular
        .module('app.movie-app')
        .controller('FeaturedController', FeaturedController);

    FeaturedController.$inject = ['$scope', 'appConstants', 'featuredService'];


    function FeaturedController ($scope, appConstants, featuredService) {

        var vm = this;
        featuredService.featuredMovie()
            .then(showFeaturedMovies)
            .catch(showErrorNotification);

        function showFeaturedMovies(data) {
            vm.featureMovie = data.data[1].featured;
        }

        function showErrorNotification(error) {
            vm.featureMovieError = true;
        }

    }



})();

