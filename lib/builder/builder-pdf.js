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

    doc.info.Title = metadata.title;
    doc.info.Author = _.map(metadata.authors, function (author) {
        return author.firstName + ' ' + author.lastName;
    }).join(', ');

    doc.pipe(fs.createWriteStream(outputFile));

    doc.font(path.join(__dirname, 'fonts', 'Anaheim-Regular.ttf'));

    doc.fontSize(32)
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
            printFeature(featurebook.getFeatureSync(path.join(sourceDir, node.path), metadata.language));
        }
        if (node.type === 'folder') {
            doc.addPage()
                .fontSize(fontSize.xxLarge)
                .fillColor('black')
                .text(node.name, {underline: true});

            var summary = featurebook.getSummarySync(path.join(sourceDir, node.path));
            if (summary) {
                doc.moveDown(0.5);
                doc.fontSize(fontSize.inherit)
                    .fillColor('gray')
                    .text(summary);
            }

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

        doc.moveDown(0.5);

        doc.fontSize(fontSize.inherit)
            .fillColor('gray')
            .text(feature.description);

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
        doc.moveDown(0.5);
        _.each(scenario.steps, printStep);
        _.each(scenario.examples, printExample);
    }

    function printStep(step) {
        doc.fontSize(fontSize.inherit)
            .fillColor('red')
            .text(step.keyword + ': ', {continued: true})
            .fillColor('black')
            .text(step.name);
        printDocString(step.docString);
        printDataTable(step.dataTable);
    }

    function printExample(example) {
        doc.moveDown(0.5);
        doc.fontSize(fontSize.larger)
            .fillColor('red')
            .text(example.keyword + ':');
        printDataTable(example.dataTable);
    }

    function printDocString(docString) {
        if (docString) {
            doc.fillColor('green')
                .text(docString);
        }
    }

    function printDataTable(dataTable) {
        var i;
        for (i = 0; i < dataTable.length; i++) {
            doc.fontSize(fontSize.inherit)
                .fillColor('blue')
                .text('| ' + dataTable[i].join(' | ') + ' |');
        }
    }

}