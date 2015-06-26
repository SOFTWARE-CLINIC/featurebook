module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        files: [
            'public/bower_components/angular/angular.min.js',
            'public/bower_components/angular-route/angular-route.min.js',
            'public/bower_components/angular-sanitize/angular-sanitize.min.js',
            'public/bower_components/angular-mocks/angular-mocks.js',

            'public/bower_components/ace-builds/src-min-noconflict/ace.js',
            'public/bower_components/angular-ui-ace/ui-ace.js',

            'public/views/**/*.html',

            'public/scripts/featurebook.module.js',
            'public/scripts/featurebook.controller.js',
            'public/scripts/summary.controller.js',
            'public/scripts/featurebook.service.js',
            'public/scripts/person.directive.js',
            'public/scripts/feature-tree.directive.js',
            'public/scripts/feature-node.directive.js',
            'public/scripts/gherkin-scenario.directive.js',
            'public/scripts/gherkin-step.directive.js',
            'public/scripts/gherkin-data-table.directive.js',
            'public/scripts/encode-uri-component.filter.js',
            'public/scripts/titleize.filter.js',
            'public/scripts/highlight-gherkin-variables.filter.js',

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