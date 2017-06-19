var path = require('path'),
    movieAppPagePO = require('../page-objects/movie.app.page.js'),
    localConfig = require(path.resolve(__dirname, '../../../e2e.conf')).settings,

    movieApp = "//section[contains(@class,'movie-app')]//img[@class='input-details']";

function movieAppSteps() {
    'use strict';
    /*jshint validthis:true */
    this.Given(/^I am in search page$/, checksearchPage);
    this.When(/^I enter the moviename$/, getMoviename);
    this.Given(/^I am in featured page$/, checkFeaturedPage);
    this.Then(/^The search movie should appear on the screen$/, searchMovie);
    this.Then(/^The featured movie should appear on the screen$/, featuredMovie);


    function checksearchPage(headerTxt,callback){
        expect(movieAppPagePO.getElementByClassName(main-header).getText()).to.eventually.equal(headerTxt).and.notify(callback);
    }

    function getMoviename(url, callback){
        /* TODO: implementation to get username */
    }

    function checkFeaturedPage(defTxt, callback) {
        /* TODO: implementation to get username */
    }


    function searchMovie(callback){
        /* TODO: implementation to get username */
    }

    function featuredMovie(bmeText,bmeBranch,callback)
    {
        /* TODO: implementation to get username */
    }


}

module.exports = movieAppSteps;