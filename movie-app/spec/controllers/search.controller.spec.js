describe('Test for search movie controller', function () {
    'use strict';

    var vm, scope, controller, createController, searchService, appConstants, DeferredObj, httpBackend, rootScope, searchMovieData;

    beforeEach(module('app.movie-app'));

    beforeEach(inject(function ($injector) {
        appConstants = $injector.get('appConstants');
        httpBackend = $injector.get('$httpBackend');
        rootScope = $injector.get('$rootScope');
        searchService = $injector.get('searchService');
        searchMovieData = {data: [ {}, {"Title":"The Holiday","Year":"2006","Rated":"PG-13","Released":"08 Dec 2006","Runtime":"138 min","Genre":"Comedy, Romance","Director":"Nancy Meyers","Writer":"Nancy Meyers","Actors":"Cameron Diaz, Kate Winslet, Jude Law, Jack Black","Plot":"Two women troubled with guy-problems swap homes in each other's countries, where they each meet a local guy and fall in love. Two women troubled with guy-problems swap homes in each other's countries, where they each meet a local guy and fall in love. Two women troubled with guy-problems swap homes in each other's countries, where they each meet a local guy and fall in love.","Language":"English","Country":"USA","Awards":"2 wins & 7 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2MzEyNDkxNF5BMl5BanBnXkFtZTcwODE5NjkzMQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"6.9/10"},{"Source":"Rotten Tomatoes","Value":"47%"},{"Source":"Metacritic","Value":"52/100"}],"Metascore":"52","imdbRating":"6.9","imdbVotes":"194,176","imdbID":"tt0457939","Type":"movie","DVD":"N/A","BoxOffice":"$63,224,849","Production":"Sony Pictures","Website":"http://www.sonypictures.com/movies/theholiday/index.html","Response":"True"} ]};

        DeferredObj = function(){
            this.then = function (_successCallback, _errorCallback) {
                this.successCallback = _successCallback;
                this.errorCallback = _errorCallback;
                this.catchCallback = _errorCallback;
                return this;
            };
            this.catch = function (error){
                this.catchCallback = error;
            };
            this.resolve = function (data) {
                this.successCallback(data);
            };
            this.reject = function (error) {
                this.catchCallback = error;
            };
        };

        searchService = {
            searchMovie: function () {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            getStubMovie: function () {
                this.deferredObj = new DeferredObj();
                return this.deferredObj;
            },
            remove: function(){

            }
        };

        controller = $injector.get('$controller');

        createController = function () {
            scope = rootScope.$new();
            return controller('SearchController', {
                '$scope': scope,
                '$http': httpBackend,
                'appConstants': appConstants,
                'searchService': searchService
            });
        };

        vm = createController();

    }));


    it('should initialize controller', function () {
        expect(vm).not.toBeNull();
    });

    it('Branch Coverage',function(){
        vm = createController();

    });

    it('should get searched short plot movie data',function(){
        vm = createController();
        vm.searchMovie("The Holiday", '');
        searchService.deferredObj.resolve(searchMovieData);
        vm.readMore();
        expect(vm.searchMovieDetails.Title).toEqual('The Holiday');
    });

    it('should get searched full movie data',function(){
        vm = createController();
        vm.searchMovie("The Holiday", "full");
        searchService.deferredObj.resolve(searchMovieData);
        vm.readMore();
        expect(vm.searchMovieDetails.Title).toEqual('The Holiday');
    });


    it('should get searched full movie data with read more option',function(){
        vm = createController();
        vm.searchMovie("The Holiday", "full");
        searchService.deferredObj.resolve(searchMovieData);
        expect(vm.searchMovieDetails.Title).toEqual('The Holiday');
        vm.readMore();
        expect(vm.searchMovieDetails.readMore).toEqual(false);
    });

    it('should handle error callback',function(){
        vm = createController();
        var error = {'status': 500};
        vm.searchMovie("The Holiday", "full");
        searchService.deferredObj.reject(error);
    });

});