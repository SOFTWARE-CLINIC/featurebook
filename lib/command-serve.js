'use strict';

var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    markdown = require('./markdown-parser'),
    color = require('bash-color'),
    featurebook = require('./featurebook-api'),
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
        metadata = featurebook.getMetadataSync(sourceDir);

    app.disable('x-powered-by');
    app.use(bodyParser.text());

    // serve static files from the `public` folder
    app.use('/', express.static(path.join(__dirname, '..', 'public')));

    // http://localhost:300/api/rest/metadata
    app.get('/api/rest/metadata', function (req, res) {
        res.send(metadata);
    });

    // returns parsed summary or 404 if SUMMARY.md is not present
    app.get('/api/rest/summary/:path?', function (req, res) {
        var summaryDir = req.params.path ? path.join(sourceDir, req.params.path) : sourceDir,
            summary = featurebook.getSummarySync(summaryDir);

        if (summary !== null) {
            res.send(markdown.toHTML(summary));
        } else {
            res.status(404).end();
        }
    });

    // http://localhost:3000/api/rest/feature/tree
    app.get('/api/rest/feature/tree', function (req, res) {
        res.send(featurebook.getFeaturesSync(sourceDir));
    });

    // http://localhost:3000/api/rest/feature/parsed/hello_world.feature
    // http://localhost:3000/api/rest/feature/parsed/non_technical%2Fload_testing.feature
    app.get('/api/rest/feature/parsed/:path', function (req, res) {
        var responseBody = {};

        try {
            responseBody.status = 'success';
            responseBody.data = featurebook.descriptionMarkdownToHTML(
                featurebook.getFeatureSync(path.join(sourceDir, req.params.path)));
        } catch (err) {
            responseBody.status = 'error';
            responseBody.message = 'Unable to parse the feature file: ' + err;
        }
        res.send(responseBody);
    });

    // serve static raw files from the specification source dir directory
    app.use('/api/rest/raw', express.static(sourceDir, {
        index: false
    }));

    app.post('/api/rest/raw/:path', function (req, res) {
        // TODO Implement me! Remember about security considerations (e.g. validate some token before saving the content).
        console.log('feature to be updated:', req.params.path);
        console.log('content:', req.body);
        res.end();
    });

    app.listen(port);

    printServeStatus(port);
    printShareLinkAndOpenItInTheDefaultBrowser(port);

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
