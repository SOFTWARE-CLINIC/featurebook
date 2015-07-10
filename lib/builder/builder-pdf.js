var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    PDFDocument = require('pdfkit');

module.exports = {
    name: 'pdf',
    supports: supports,
    build: build
};

function supports(format) {
    return 'pdf' === format;
}

function build(featureBook, sourceDir, outputDir) {
    var doc = new PDFDocument(),
        builderOutputDir = path.join(outputDir, 'pdf'),
        outputFile = path.join(builderOutputDir, 'specification.pdf');

    console.log('Building pdf in `' + outputFile + '`');

    mkdirp.sync(builderOutputDir);

    var metadata = featureBook.getMetadataSync(sourceDir);
    var summary = featureBook.getSummarySync(sourceDir);

    doc.info.Title = metadata.title;
    doc.info.Author = _.map(metadata.authors, function (author) {
        return author.firstName + ' ' + author.lastName;
    }).join(', ');

    doc.pipe(fs.createWriteStream(outputFile));

    doc.fontSize(18)
        .text(metadata.title + ' ' + (metadata.version || ''));

    doc.fontSize(14)
        .text(_.map(metadata.authors, function (author) {
            return author.firstName + ' ' + author.lastName;
        }));

    doc.fontSize(14)
        .text(_.map(metadata.contributors, function (contributor) {
            return contributor.firstName + ' ' + contributor.lastName;
        }));

    doc.moveDown()
        .fontSize(12)
        .text(summary);

    doc.end();
}