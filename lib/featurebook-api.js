var fs = require('fs'),
    path = require('path'),
    markdown = require('./markdown-parser');

var DEFAULT_FILE_ENCODING = 'UTF-8';

module.exports = {
    build: build,
    serve: serve,
    getMetadataSync: getMetadataSync,
    getSummarySync: getSummarySync
};

function build(sourceDir, format, outputDir) {
    var buildCommand = require('./command-build');

    // TODO Experimenting with "dynamic" builders registration
    buildCommand.use(require('../lib/builder/builder-html'));
    buildCommand.use(require('../lib/builder/builder-pdf'));
    buildCommand.use(require('../lib/builder/builder-docx'));

    buildCommand.execute({
        sourceDir: sourceDir,
        format: format,
        outputDir: outputDir
    });
}

function serve(sourceDir, port) {
    var serveCommand = require('./command-serve');
    serveCommand.execute({
        sourceDir: sourceDir,
        port: port
    });
}

function getMetadataSync(sourceDir) {
    var metadata = {
            title: path.basename(sourceDir),
            language: 'en'
        },
        metadataFilePath = path.join(sourceDir, 'featurebook.json');

    if (fs.existsSync(metadataFilePath)) {
        var data = JSON.parse(fs.readFileSync(metadataFilePath, DEFAULT_FILE_ENCODING));
        metadata.title = data.title;
        metadata.authors = data.authors;
        metadata.contributors = data.contributors;
        metadata.version = data.version;
        metadata.language = data.language || 'en';
    }
    return metadata;
}

function getSummarySync(dir) {
    var summaryFilePath = path.join(dir, 'SUMMARY.md');

    if (fs.existsSync(summaryFilePath)) {
        var data = fs.readFileSync(summaryFilePath, DEFAULT_FILE_ENCODING);
        return markdown.parse(data);
    }
    return null;
}
