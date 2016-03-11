'use strict';

var fs = require('fs'),
  path = require('path'),
  walker = require('./dir-walker'),
  gherkin = require('./gherkin-model'),
  markdown = require('./markdown-parser');

var DEFAULT_FILE_ENCODING = 'UTF-8';
var DEFAULT_METADATA_FILE_NAME = 'featurebook.json';
var DEFAULT_SUMMARY_FILE_NAME = 'SUMMARY.md';
var FEATURE_FILE_EXTENSION = '.feature';

var featurebook = {
  commands: {
    serve: serve,
    pdf: pdf,
    html: html
  },
  getMetadataSync: getMetadataSync,
  getFeaturesSync: getFeaturesSync,
  getFeatureSync: getFeatureSync,
  getSummarySync: getSummarySync,
  descriptionMarkdownToHTML: descriptionMarkdownToHTML,

  readMetadata: readMetadata,
  readSummary: readSummary,
  readSpecTree: readSpecTree
};

module.exports = featurebook;

function pdf(sourceDir, outputDir) {
  require('./builder/builder-pdf').build(featurebook, sourceDir, outputDir);
}

function html(sourceDir, outputDir) {
  require('./builder/builder-html').build(featurebook, sourceDir, outputDir);
}

function serve(sourceDir, port) {
  var serveCommand = require('./command-serve');
  serveCommand.execute({
    sourceDir: sourceDir,
    port: port
  });
}

/**
 * Asynchronously reads a given spec's metadata (featurebook.json).
 * @param specDir specification directory
 * @param callback
 */
function readMetadata(specDir, callback) {
  var metadataFile = path.join(specDir, DEFAULT_METADATA_FILE_NAME);

  fs.stat(metadataFile, function (err) {
    if (err) {
      var metadata = {
        title: path.basename(specDir)
      };
      callback(null, metadata);
    } else {
      fs.readFile(metadataFile, DEFAULT_FILE_ENCODING, function (err, metadataFileContents) {
        if (err) {
          throw err;
        }
        callback(null, JSON.parse(metadataFileContents));
      });
    }
  });
}

/**
 * Asynchronously reads a given spec's summary (SUMMARY.md):
 * @param specDir specification directory
 * @param callback
 */
function readSummary(specDir, callback) {
  var summaryFile = path.join(specDir, DEFAULT_SUMMARY_FILE_NAME);

  fs.stat(summaryFile, function (err) {
    if (err) {
      callback(null, null);
    } else {
      fs.readFile(summaryFile, DEFAULT_FILE_ENCODING, function (err, summary) {
        if (err) {
          throw err;
        }
        callback(null, summary);
      });
    }
  });
}

/**
 * Asynchronously traverses a given spec's directory and finds the feature files.
 * @param specDir specification directory
 */
function readSpecTree(specDir) {

}

/**
 * @deprecated since 0.0.26 - use readMetadata instead
 */
function getMetadataSync(specDir) {
  var metadata = {
      title: path.basename(specDir)
    },
    metadataFilePath = path.join(specDir, DEFAULT_METADATA_FILE_NAME);

  if (fs.existsSync(metadataFilePath)) {
    var data = JSON.parse(fs.readFileSync(metadataFilePath, DEFAULT_FILE_ENCODING));
    metadata.title = data.title;
    metadata.authors = data.authors;
    metadata.contributors = data.contributors;
    metadata.version = data.version;
  }
  return metadata;
}

/**
 * @deprecated since 0.0.26 - use readSpecTree instead
 */
function getFeaturesSync(specDir) {
  function visibleDirectoriesAndGherkinSourceFilesFilter(filePath, stats) {
    var basename = path.basename(filePath),
      isGherkinSourceFile = stats.isFile() && path.extname(filePath) === FEATURE_FILE_EXTENSION,
      isVisibleDirectory = stats.isDirectory() && basename[0] !== '.';

    return (isVisibleDirectory && basename !== 'assets') || isGherkinSourceFile;
  }

  return walker.walkSync(specDir, visibleDirectoriesAndGherkinSourceFilesFilter);
}

function getFeatureSync(filePath) {
  return gherkin.fromFileSync(filePath);
}

/**
 * @deprecated since 0.0.26 - use readSummary instead
 */
function getSummarySync(specDir) {
  var summaryFilePath = path.join(specDir, DEFAULT_SUMMARY_FILE_NAME);

  if (fs.existsSync(summaryFilePath)) {
    return fs.readFileSync(summaryFilePath, DEFAULT_FILE_ENCODING);
  }
  return null;
}

function descriptionMarkdownToHTML(feature) {
  var background = feature.background,
    scenarioDefinitions = feature.scenarioDefinitions,
    scenarioDefinition,
    examples,
    example;

  if (feature.description) {
    feature.description = markdown.toHTML(feature.description);
  }
  if (background && background.description) {
    background.description = markdown.toHTML(background.description);
  }
  if (scenarioDefinitions) {
    for (var s = 0; s < scenarioDefinitions.length; s++) {
      scenarioDefinition = scenarioDefinitions[s];
      examples = scenarioDefinition.examples;
      if (scenarioDefinition.description) {
        scenarioDefinition.description = markdown.toHTML(scenarioDefinition.description);
      }
      if (examples) {
        for (var e = 0; e < examples.length; e++) {
          example = examples[e];
          if (example.description) {
            example.description = markdown.toHTML(example.description);
          }
        }
      }
    }
  }
  return feature;
}
