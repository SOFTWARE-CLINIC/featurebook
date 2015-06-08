module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        files: [
            'test/public/spec/**/*.js'
        ],
        exclude: [],
        browsers: [
            'PhantomJS'
        ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        reporters: ['dots'],
        singleRun: true,
        logLevel: config.LOG_INFO
    });
};