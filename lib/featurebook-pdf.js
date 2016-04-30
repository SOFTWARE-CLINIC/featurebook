'use strict';

var _ = require('lodash');
var color = require('bash-color');
var fs = require('fs-extra');
var path = require('path');
var featurebook = require('featurebook-api');
var PDFDocument = require('pdfkit');

var fontSize = {
  xxLarge: 18,
  xLarge: 16,
  larger: 14,
  inherit: 12,
  smaller: 10,
  xSmall: 8,
  xxSmall: 6
};

function pdf(specDir, outputDir) {
  var doc = new PDFDocument();
  var outputFile = path.join(outputDir, 'specification.pdf');
  var metadata = featurebook.readMetadataSync(specDir);

  fs.mkdirpSync(outputDir);

  doc.info.Title = metadata.title;
  doc.info.Author = _.map(metadata.authors, function (author) {
    return author.firstName + ' ' + author.lastName;
  }).join(', ');

  doc.pipe(fs.createWriteStream(outputFile));

  doc.font(path.join(__dirname, './META-INF/pdf/fonts', 'Anaheim-Regular.ttf'));

  printTitle();
  printAuthors();
  printContributors();

  var specTree = featurebook.readSpecTreeSync(specDir);

  printNode(specTree);

  doc.end();

  function printNode(node) {
    if (node.type === featurebook.NODE_FILE) {
      printFeature(node);
    }
    if (node.type === featurebook.NODE_DIRECTORY) {
      printDirectory(node);
      _.each(node.children, printNode);
    }
  }

  function printTitle() {
    doc.fontSize(32)
      .text(metadata.title + ' ' + (metadata.version || ''));
  }

  function printAuthors() {
    doc.fontSize(fontSize.larger)
      .text(_.map(metadata.authors, function (author) {
        return author.firstName + ' ' + author.lastName;
      }));
  }

  function printContributors() {
    doc.fontSize(fontSize.larger)
      .text(_.map(metadata.contributors, function (contributor) {
        return contributor.firstName + ' ' + contributor.lastName;
      }));
  }

  function printDirectory(node) {
    doc.addPage()
      .fontSize(fontSize.xxLarge)
      .fillColor('black')
      .text(node.displayName, {underline: true});

    var summary = featurebook.readSummarySync(path.join(specDir, node.path));
    if (summary) {
      doc.moveDown(0.5);
      doc.fontSize(fontSize.inherit)
        .fillColor('gray');
      printMarkdown(summary);
    }
  }

  function printFeature(node) {
    try {
      var feature = featurebook.readFeatureSync(path.join(specDir, node.path));

      doc.moveDown()
        .fontSize(fontSize.xLarge)
        .fillColor('red')
        .text(feature.keyword + ':', {continued: true})
        .fillColor('black')
        .text(' ' + feature.name);

      if (feature.description) {
        doc.fontSize(fontSize.inherit)
          .fillColor('gray');
        printMarkdown(feature.description);
      }

      printBackground(feature.background);
      _.each(feature.scenarioDefinitions, printScenarioDefinition);
    } catch (err) {
      console.warn(color.red('Error printing feature `%s`: %s'), node.path, err);
    }
  }

  function printBackground(background) {
    if (background) {
      doc.moveDown()
        .fontSize(fontSize.larger)
        .fillColor('red')
        .text(background.keyword + ':', {continued: true})
        .fillColor('black')
        .text(' ' + background.name);

      if (background.description) {
        doc.fontSize(fontSize.inherit)
          .fillColor('gray');
        printMarkdown(background.description);
      }

      _.each(background.steps, printStep);
    }
  }

  function printScenarioDefinition(scenario) {
    doc.moveDown()
      .fontSize(fontSize.larger)
      .fillColor('red')
      .text(scenario.keyword + ':', {continued: true})
      .fillColor('black')
      .text(' ' + scenario.name);

    if (scenario.description) {
      doc.fontSize(fontSize.inherit)
        .fillColor('gray');
      printMarkdown(scenario.description);
    }

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
      .text(example.keyword + ':', {continued: true})
      .fillColor('black')
      .text(' ' + example.name);

    if (example.description) {
      doc.fontSize(fontSize.inherit)
        .fillColor('gray');
      printMarkdown(example.description);
    }

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

  function printMarkdown(text) {
    // TODO Actually parse the markdown text and print it.
    doc.text(text);
  }

}

module.exports = pdf;
