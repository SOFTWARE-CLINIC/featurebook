var path = require('path'),
    express = require('express'),
    walker = require('./dir-walker'),
    gherkin = require('./gherkin-model'),
    markdown = require('./markdown-parser'),
    color = require('bash-color'),
    fs = require('fs');

module.exports = {
    execute: execute
};

// --- REST API ---
// http://localhost:3000/api/rest/raw/assets/images/hello_world.png
// http://localhost:3000/api/rest/summary
// http://localhost:3000/api/rest/feature/tree
// http://localhost:3000/api/rest/feature/parsed/hello_world.feature
// http://localhost:3000/api/rest/feature/parsed/non_technical%2Fload_testing.feature
// ----------------

function execute(params) {
    var app = express(),
        sourceDir = params.sourceDir,
        port = params.port,
        summary = readSummarySync();

    // serve static files from the `public` folder
    app.use('/', express.static(path.join(__dirname, '..', 'public')));

    // http://localhost:300/api/rest/summary
    app.get('/api/rest/summary', function (req, res) {
        res.send(summary);
    });

    // http://localhost:3000/api/rest/feature/tree
    app.get('/api/rest/feature/tree', function (req, res) {
        res.send(walker.walkSync(sourceDir, visibleDirectoriesAndGherkinSourceFilesFilter));

        function visibleDirectoriesAndGherkinSourceFilesFilter(filePath, stats) {
            var basename = path.basename(filePath),
                isGherkinSourceFile = stats.isFile() && path.extname(filePath) === '.feature',
                isVisibleDirectory = stats.isDirectory() && basename[0] !== '.';

            return (isVisibleDirectory && basename !== 'assets') || isGherkinSourceFile;
        }
    });

    // http://localhost:3000/api/rest/feature/parsed/hello_world.feature
    // http://localhost:3000/api/rest/feature/parsed/non_technical%2Fload_testing.feature
    app.get('/api/rest/feature/parsed/:path', function (req, res) {
        var feature = gherkin.fromFileSync(path.join(sourceDir, req.params.path), summary.language);
        feature.descriptionAsHtml = markdown.parse(feature.description);
        res.send(feature);
    });

    app.use('/api/rest/raw', express.static(process.cwd(), {
        index: false
    }));

    app.listen(port);
    console.log(color.green('FeatureBook is running on port ' + port));

    function readSummarySync() {
        var summary = {
                title: path.basename(sourceDir),
                language: 'en'
            },
            summaryFilePath = path.join(sourceDir, 'featurebook.json');

        if (fs.existsSync(summaryFilePath)) {
            var data = JSON.parse(fs.readFileSync(summaryFilePath, 'UTF-8'));
            summary.title = data.title;
            summary.authors = data.authors;
            summary.version = data.version;
            summary.language = data.language || 'en';
        }
        return summary;
    }
}
