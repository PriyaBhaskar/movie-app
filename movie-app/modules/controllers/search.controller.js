(function() {
    'use strict';

    angular
        .module('app.movie-app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', 'appConstants', 'searchService'];

    function SearchController (scope, appConstants, searchService) {

        var vm = this;
        vm.searchMovie = function(movietitle, plot) {
            var searchdata;
            if(plot){
                searchdata = {
                    "apikey": appConstants.apikey,
                    "t": movietitle,
                    "plot": "full"
                }
            }
            else {
                searchdata = {
                    "apikey": appConstants.apikey,
                    "t": movietitle
                }
            }
            searchService.searchMovie(searchdata)
                .then(showSearchedMovie)
                .catch(showErrorNotification(searchdata));

        };

        function showSearchedMovie(data) {
            vm.searchMovieDetails = data.data[1];
            vm.searchMovieDetails.Genre = getSubList(vm.searchMovieDetails.Genre);
            vm.searchMovieDetails.Writer = getSubList(vm.searchMovieDetails.Writer);
            vm.searchMovieDetails.Actors= getSubList(vm.searchMovieDetails.Actors);
            vm.searchMovieDetails.Language = getSubList(vm.searchMovieDetails.Language);
            vm.searchMovieDetails.shortPlot = vm.searchMovieDetails.Plot;
            if(vm.searchMovieDetails.Plot.length > 200) {
                vm.searchMovieDetails.shortPlot = vm.searchMovieDetails.Plot.substr(0, 200);
                vm.searchMovieDetails.readMore = true;
            }
        }

        vm.readMore = function (){
            vm.searchMovieDetails.shortPlot = vm.searchMovieDetails.Plot;
            vm.searchMovieDetails.readMore = false;
        }

        function getSubList (mainList) {
            var tempArray = mainList.split(', ');
            return tempArray;
        }

        function showErrorNotification (searchdata) {
            var url = (searchdata.plot === 'full') ? appConstants.searchfullStubApi : appConstants.searchStubApi;
            searchService.getStubMovie(url)
                .then(showSearchedMovie);
        }
    }

})();

