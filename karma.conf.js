// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-sonarqube-unit-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './reports/coverage'),
      reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
      fixWebpackSourcePaths: true,
      'report-config': {
        cobertura: {
          projectRoot: './',
        },
      },
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'reports/ut_report.xml',
      useBrowserName: false,
      overrideTestDescription: true,
    },
    // the default configuration
    junitReporter: {
      outputDir: 'reports/junit', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      useBrowserName: false, // add browser name to report and classes names
    },
    reporters: ['progress', 'kjhtml', 'sonarqubeUnit', 'junit', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeNoSandbox', 'ChromeHeadless'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--proxy-auto-detect'],
      },
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--disable-dev-shm-usage', '--proxy-auto-detect'],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
  });
};
