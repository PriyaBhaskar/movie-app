 exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  //getPageTimeout: 60000,
  //allScriptsTimeout: 500000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome',
    'version:' : '50',
    'platform': 'windows',
    'version' : '7'
  },

  // Spec patterns are relative to this directory.
  specs: [
    './test/e2e/features/*.feature'
  ],
  baseUrl: 'http://localhost:9000/',
  cucumberOpts: {
    require: [
    './test/e2e/steps/*.steps.js',
    './test/e2e/page-objects/*.page.js'
    ],
    tags: '@Local',
    format: 'pretty',
    profile: false,
   'no-source': true
  }
};