var path = require('path'),
    registrationPagePO = require('../page-objects/tnt.registration.page.js'),
    localConfig = require(path.resolve(__dirname, '../../../e2e.conf')).settings,

    registrationflow = "//section[contains(@class,'tnt-registration-flow')]//img[@class='input-details']";

function registrationFlowSteps() {
    'use strict';
    /*jshint validthis:true */
    this.Given(/^I am in registration page$/, checkRegistrationPage);
    this.When(/^I enter the username$/, getUsername);
    this.When(/^I enter the password$/, getPassword);
    this.When(/^I enter the confirm password$/, getConfirmPassword);
    this.Then(/^The password validation should happen$/, validatePassword);
    this.Then(/^The confirm password should match with the password$/, validateConfirmPassword);


    function checkRegistrationPage(headerTxt,callback){
        expect(registrationPagePO.getElementByClassName(main-header).getText()).to.eventually.equal(headerTxt).and.notify(callback);
    }

    function getUsername(fotoUrl, callback){
        /* TODO: implementation to get username */
    }

    function getPassword(defTxt, callback) {
        /* TODO: implementation to get username */
    }


    function getConfirmPassword(callback){
        /* TODO: implementation to get username */
    }

    function validatePassword(bmeText,bmeBranch,callback)
    {
        /* TODO: implementation to get username */
    }


}

module.exports = registrationFlowSteps;