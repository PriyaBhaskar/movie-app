var config = {};

config.seleniumAddress = 'http://localhost:4444/wd/hub';

config.multiCapabilities = [

    {
        // used for selenium (grid)
        applicationName: "movieapp_regression",
        browserName: 'chrome',
        shardTestFiles: true,
        // custom
        deviceProperties: {
            browser: {
                name: 'chrome',
                version: '50'
            },
            deviceType: 'desk',
            os: {
                name: 'windows',
                version: '7'
            }
        },
        chromeOptions: {
            args: [
                'disable-extensions'
            ]
        }
    }
];

exports.config = config;