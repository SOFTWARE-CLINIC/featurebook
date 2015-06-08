module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        files: [
            'public/bower_components/angular/angular.min.js',
            'public/bower_components/angular-route/angular-route.min.js',
            'public/bower_components/angular-sanitize/angular-sanitize.min.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/views/**/*.html',
            'public/assets/js/featurebook.js',
            'test/public/spec/**/*.js'
        ],
        browsers: [
            'PhantomJS'
        ],
        plugins: [
            'karma-ng-html2js-preprocessor',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        preprocessors: {
            'public/views/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'public/',
            moduleName: 'scFeatureBook.templates'
        },
        singleRun: true,
        logLevel: config.LOG_INFO
    });
};