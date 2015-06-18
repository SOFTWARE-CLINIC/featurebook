var path = require('path'),
    express = require('express'),
    walker = require('./dir-walker'),
    gherkin = require('./gherkin-model'),
    markdown = require('./markdown-parser'),
    color = require('bash-color'),
    fs = require('fs'),
    opener = require('opener');

module.exports = {
    execute: execute
};

// --- REST API ---
// http://localhost:3000/api/rest/raw/assets/images/hello_world.png
// http://localhost:3000/api/rest/metadata
// http://localhost:3000/api/rest/summary
// http://localhost:3000/api/rest/feature/tree
// http://localhost:3000/api/rest/feature/parsed/hello_world.feature
// http://localhost:3000/api/rest/feature/parsed/non_technical%2Fload_testing.feature
// ----------------

function execute(params) {
    var app = express(),
        sourceDir = params.sourceDir,
        port = params.port,
        metadata = readMetadataSync();

    // serve static files from the `public` folder
    app.use('/', express.static(path.join(__dirname, '..', 'public')));

    // http://localhost:300/api/rest/metadata
    app.get('/api/rest/metadata', function (req, res) {
        res.send(metadata);
    });

    // returns parsed summary or 404 if SUMMARY.md is not present
    app.get('/api/rest/summary', function (req, res) {
        res.send(readSummarySync());
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
        var feature = gherkin.fromFileSync(path.join(sourceDir, req.params.path), metadata.language);
        feature.descriptionAsHtml = markdown.parse(feature.description);
        res.send(feature);
    });

    app.use('/api/rest/raw', express.static(process.cwd(), {
        index: false
    }));

    app.disable('x-powered-by');
    app.listen(port);

    printServeStatus(port);
    printShareLinkAndOpenItInTheDefaultBrowser(port);

    function readMetadataSync() {
        var metadata = {
                title: path.basename(sourceDir),
                language: 'en'
            },
            metadataFilePath = path.join(sourceDir, 'featurebook.json');

        if (fs.existsSync(metadataFilePath)) {
            var data = JSON.parse(fs.readFileSync(metadataFilePath, 'UTF-8'));
            metadata.title = data.title;
            metadata.authors = data.authors;
            metadata.contributors = data.contributors;
            metadata.version = data.version;
            metadata.language = data.language || 'en';
        }
        return metadata;
    }

    function readSummarySync() {
        var summary = 'Select a feature to display.',
            summaryFilePath = path.join(sourceDir, 'SUMMARY.md');

        if (fs.existsSync(summaryFilePath)) {
            var data = fs.readFileSync(summaryFilePath, 'UTF-8');
            summary = markdown.parse(data);
        }
        return summary;
    }

    function printServeStatus(port) {
        console.log(color.green('FeatureBook is running on port ' + port));
    }

    function printShareLinkAndOpenItInTheDefaultBrowser(port) {
        require('dns').lookup(require('os').hostname(), function (err, address) {
            var shareLink = 'http://' + address + ':' + port;
            console.log(color.yellow('It is available to all computers in the local network at ' + shareLink));
            opener(shareLink);
        });
    }
}
