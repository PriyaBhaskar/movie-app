var q = require('q');
var webdriver = require('selenium-webdriver'),
    until = webdriver.until;
var waitForTime = 12000;

function moveAppPage() {
    'use strict';

    return {
        waitForElementById: waitForElementById,
        waitForElementByClassName: waitForElementByClassName,
        waitForElementByCss: waitForElementByCss,
        waitForElementByXpath: waitForElementByXpath,
        waitForElementPresentByClassName: waitForElementPresentByClassName,
        waitForElementByName: waitForElementByName,
        getElementById: getElementById,
        getElementByClassName: getElementByClassName,
        getElementByXpath: getElementByXpath,
        getElementByCss: getElementByCss,
        getElementByName: getElementByName,
        getPageTitle: getPageTitle,
        isElementPresentById: isElementPresentById,
        isElementPresentByClassName: isElementPresentByClassName,
        isElementPresentByName: isElementPresentByName,
        isDisplayedByClassName: isDisplayedByClassName,
        isDisplayedByXpath: isDisplayedByXpath,
        sleepForTimeInterval: sleepForTimeInterval,
        getElementByLinkText: getElementByLinkText
    };

    function getElementById(elementById) {
        return browser.driver.findElement(by.id(elementById));
    }

    function getElementByLinkText(elementByLinkText) {
            return browser.driver.findElement(by.linkText(elementByLinkText));
        }

    function getElementByClassName(cName) {
        return browser.driver.findElement(by.className(cName));
    }

    function getElementByXpath(xpathValue) {
        return browser.driver.findElement(by.xpath(xpathValue));
    }

    function getElementByCss(css) {
        return browser.driver.findElement(by.css(css));
    }

    function getElementByCssContainingText(css,text) {
            return element(by.cssContainingText(css,text));
        }

    function getElementByName(name) {
        return browser.driver.findElement(by.name(name));
    }

    function isElementPresentById(elementId) {
        return browser.driver.isElementPresent(by.id(elementId));
    }

    function isElementPresentByName(name) {
        return browser.driver.isElementPresent(by.name(name));
    }

    function isElementPresentByClassName(cName) {
        return browser.driver.isElementPresent(by.className(cName));
    }

    function isDisplayedByClassName(cName) {
        var el = getElementByClassName(cName);
        return el.isDisplayed();
    }

    function isDisplayedByXpath(xpath) {
        var el = getElementByXpath(xpath);
        return el.isDisplayed();
    }

    function waitForElementById(elementId) {
        browser.wait(function() {
            return isElementPresentById(elementId);
        }, waitForTime);
    }

    function waitForElementByClassName(cName) {
        browser.wait(function() {
            return isDisplayedByClassName(cName);
        }, waitForTime);
    }

    function waitForElementPresentByClassName(cName) {
        browser.wait(function() {
            return browser.driver.isElementPresent(by.className(cName));
        }, waitForTime);
    }

    function waitForElementByXpath(xpath) {
        browser.wait(function() {
            return isDisplayedByXpath(xpath);
        }, waitForTime);
    }

    function waitForElementByCss(css) {
        browser.wait(function() {
            return browser.driver.isElementPresent(by.css(css));
        }, waitForTime);
    }

    function waitForElementByName(name) {
        browser.wait(function() {
            return isElementPresentByName(name);
        }, waitForTime);
    }

    function getPageTitle() {
        return browser.getTitle();
    }

    function sleepForTimeInterval(timeInSeconds) {
        browser.sleep(timeInSeconds);
    }

}

module.exports = moveAppPage();