var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    markdown = require('../markdown-parser'),
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
                    .text(JSON.stringify(markdown.parse(summary)));
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

        doc.fontSize(fontSize.inherit)
            .fillColor('gray')
            .text(JSON.stringify(markdown.parse(feature.description)));

        printBackground(feature.background);
        _.each(feature.scenarioDefinitions, printScenario);
    }

    function printBackground(background) {
        if (background) {
            doc.moveDown()
                .fontSize(fontSize.larger)
                .fillColor('red')
                .text(background.keyword + ': ', {continued: true})
                .fillColor('black')
                .text(background.text)
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
            .text(step.keyword, {continued: true})
            .fillColor('black')
            .text(step.text);
        printDocStringArgument(step);
        printDataTableArgument(step);
    }

    function printExample(example) {
        doc.moveDown(0.5);
        doc.fontSize(fontSize.larger)
            .fillColor('red')
            .text(example.keyword + ':');
        printTableHeader(example.tableHeader);
        printTableData(example.tableBody);
    }

    function printDocStringArgument(step) {
        if (step.argument && step.argument.type === 'DocString') {
            doc.fillColor('green')
                .text(step.argument.content);
        }
    }

    function printDataTableArgument(step) {
        if (step.argument && step.argument.type === 'DataTable') {
            printTableData(step.argument.rows);
        }
    }

    function printTableHeader(tableHeader) {
        printTableRow(tableHeader);
    }

    function printTableData(tableData) {
        _.each(tableData, printTableRow);
    }

    function printTableRow(tableHeader) {
        doc.fontSize(fontSize.inherit)
            .fillColor('blue')
            .text('| ' + _.map(tableHeader.cells, getCellValue).join(' | ') + ' |');

        function getCellValue(cell) {
            return cell.value;
        }
    }

}