var path = require('path'),
    projectRoot = path.resolve('./'),
    e2eDefaultPath = 'test/e2e',
    e2eRoot = path.join(projectRoot, e2eDefaultPath);


exports.settings = {

    projectRoot: projectRoot,
    e2eRoot: e2eRoot,
    imageComparison: {
        baselineFolder: 'test/e2e/baseline-images',
        screenshotPath: 'test/e2e/screenshots'
    },

    config: {
        local: path.join(e2eRoot, 'conf/protractor.local.conf.js'),
        registrationPage: path.join(e2eRoot, 'conf/movie.app.page.conf.js'),
        chromeEmulator: path.join(e2eRoot, 'conf/protractor.chrome.em.conf.js'),

    },

    urls: {
        selenium: {
            local: 'http://localhost:4444/wd/hub',
            appium: 'http://localhost:4700/wd/hub'
        },
        baseUrl: {
            develop: 'http://localhost/'
        }
    },

    report:{
        saveJSONReportFile: true,
        saveScreenshot: true,
        screenshotPath: "report/screenshots"
    }
};
