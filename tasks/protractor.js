var path = require('path'),
    localConfig = require(path.resolve(__dirname, '../e2e.conf')).settings;

module.exports = extendProtractorTasks();

function extendProtractorTasks() {
    var tasks = {
        // default options
        options: {
            configFile: localConfig.config.desk,
            keepAlive: false,
            noColor: false,
            debug: false,
            args: {
                baseUrl: localConfig.urls.baseUrl.develop,
                specs: [
                    path.resolve(localConfig.e2eRoot, '**/*.feature')
                ],
                cucumberOpts: {
                    require: [
                        path.resolve(localConfig.e2eRoot, '**/*.steps.js'),
                        path.resolve(localConfig.e2eRoot, '**/*.hooks.js'),
                        path.resolve(localConfig.e2eRoot, '**.page.js')
                    ],
                    tags: [
                        '~@skip' // Add to any scenario to skip it
                    ]
                }

            }
        },

        main: {},

        local: {
                    options: {
                        configFile: localConfig.config.contactPage,
                        args: {
                            baseUrl: 'http://localhost/',
                            specs: [
                                path.resolve(localConfig.e2eRoot, 'features/*.feature')
                            ],
                            cucumberOpts: {
                                tags: '@smoke',
                                require: [
                                    // also accommodate for generic.steps.js in the e2e root directory
                                    path.resolve(localConfig.toolRoot, '**/hooks/**/*.js'),
                                    path.resolve(localConfig.e2eRoot, '**/*.steps.js'),
                                    path.resolve(localConfig.e2eRoot, '**/*.hooks.js'),
                                    path.resolve(localConfig.e2eRoot, '**/*.page.js')
                                ]
                            }

                        }
                    }
                }
    };

    return tasks;
}
