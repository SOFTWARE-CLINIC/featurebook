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

var color = {
    inherit: 'black',
    keyword: 'red'
};

var fontSize = {
    xxLarge: 18,
    xLarge: 16,
    larger: 14,
    inherit: 12,
    smaller: 10,
    xSmall: 8,
    xxSmall: 6
};

function build(featurebook, sourceDir, outputDir) {
    var doc = new PDFDocument(),
        builderOutputDir = path.join(outputDir, 'pdf'),
        outputFile = path.join(builderOutputDir, 'specification.pdf');

    mkdirp.sync(builderOutputDir);

    var metadata = featurebook.getMetadataSync(sourceDir);
    var summary = featurebook.getSummarySync(sourceDir);

    doc.info.Title = metadata.title;
    doc.info.Author = _.map(metadata.authors, function (author) {
        return author.firstName + ' ' + author.lastName;
    }).join(', ');

    doc.pipe(fs.createWriteStream(outputFile));

    doc.fontSize(fontSize.xxLarge)
        .text(metadata.title + ' ' + (metadata.version || ''));

    doc.fontSize(fontSize.larger)
        .text(_.map(metadata.authors, function (author) {
            return author.firstName + ' ' + author.lastName;
        }));

    doc.fontSize(fontSize.larger)
        .text(_.map(metadata.contributors, function (contributor) {
            return contributor.firstName + ' ' + contributor.lastName;
        }));

    var featuresTree = featurebook.getFeaturesSync(sourceDir);

    printNode(featuresTree);

    doc.end();

    function printNode(node) {
        if (node.type === 'file') {
            printFeature(featurebook.getFeatureSync(path.join(sourceDir, node.path)));
        }
        if (node.type === 'folder') {
            doc.addPage()
                .fontSize(fontSize.xxLarge)
                .text(node.name, {underline: true});
            _.each(node.items, printNode);
        }
    }

    function printFeature(feature) {
        doc.moveDown()
            .fontSize(fontSize.xLarge)
            .fillColor('red')
            .text(feature.keyword + ': ', {continued: true})
            .fillColor('black')
            .text(feature.name);

        printBackground(feature.background);
        _.each(feature.scenarios, printScenario);
    }

    function printBackground(background) {
        if (background) {
            doc.moveDown()
                .fontSize(fontSize.larger)
                .fillColor('red')
                .text(background.keyword + ': ', {continued: true})
                .fillColor('black')
                .text(background.name)
                .moveDown();
            _.each(background.steps, printStep);
        }
    }

    function printScenario(scenario) {
        doc.moveDown()
            .fontSize(fontSize.larger)
            .fillColor('red')
            .text(scenario.keyword + ': ', {continued: true})
            .fillColor('black')
            .text(scenario.name);
        _.each(scenario.steps, printStep);
    }

    function printStep(step) {
        doc.fontSize(fontSize.inherit)
            .fillColor('red')
            .text(step.keyword + ': ', {continued: true})
            .fillColor('black')
            .text(step.name);
    }

}