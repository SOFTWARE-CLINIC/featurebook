'use strict';

var fs = require('fs');
var path = require('path');
var walker = require('./dir-walker');
var gherkin = require('./featurebook-gherkin');

var DEFAULT_FILE_ENCODING = 'UTF-8';
var DEFAULT_METADATA_FILE_NAME = 'featurebook.json';
var DEFAULT_SUMMARY_FILE_NAME = 'SUMMARY.md';
var DEFAULT_IGNORE_FILE_NAME = '.featurebookignore';
var DEFAULT_ASSETS_DIR = 'assets';
var DEFAULT_DIST_DIR = 'dist';
var GIT_REPO_DIR = '.git';

module.exports = {
  NODE_FILE: 'file',
  NODE_DIRECTORY: 'directory',
  version: require('../package.json').version,

  readMetadata: readMetadata,
  readMetadataSync: readMetadataSync,
  readSummary: readSummary,
  readSummarySync: readSummarySync,
  readSpecTree: readSpecTree,
  readSpecTreeSync: readSpecTreeSync,
  readFeature: readFeature,
  readFeatureSync: readFeatureSync
};

/**
 * Asynchronously reads a given spec's metadata (featurebook.json).
 * @param specDir
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
 * Synchronous version of featurebook.readMetadata.
 */
function readMetadataSync(specDir) {
  var metadataFilePath = path.join(specDir, DEFAULT_METADATA_FILE_NAME);

  if (fs.existsSync(metadataFilePath)) {
    return JSON.parse(fs.readFileSync(metadataFilePath, DEFAULT_FILE_ENCODING));
  } else {
    return {
      title: path.basename(specDir)
    };
  }
}

/**
 * Asynchronously reads a given directory's summary (SUMMARY.md):
 * @param dir
 * @param callback
 */
function readSummary(dir, callback) {
  var summaryFile = path.join(dir, DEFAULT_SUMMARY_FILE_NAME);

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
 * Synchronous version of featurebook.readSummary.
 */
function readSummarySync(specDir) {
  var summaryFilePath = path.join(specDir, DEFAULT_SUMMARY_FILE_NAME);

  if (fs.existsSync(summaryFilePath)) {
    return fs.readFileSync(summaryFilePath, DEFAULT_FILE_ENCODING);
  }
  return null;
}

/**
 * Asynchronously traverses a given spec's directory and finds the feature files.
 * @param specDir specification directory
 * @param callback
 */
function readSpecTree(specDir, callback) {
  walker.findTree(specDir, ignoredFilesFilter, function (err, specTree) {
    if (err) {
      throw err;
    }
    callback(null, specTree);
  });
}

/**
 * Synchronous version of featurebook.readSpecTree.
 */
function readSpecTreeSync(specDir) {
  return walker.findTreeSync(specDir, ignoredFilesFilter);
}

function readFeature(file, callback) {
  fs.readFile(file, DEFAULT_FILE_ENCODING, function (err, data) {
    if (err) {
      throw err;
    }
    try {
      callback(null, gherkin.parse(data));
    } catch (err) {
      callback(err);
    }
  });
}

/**
 * Synchronous version of featurebook.readFeature
 * @param file
 */
function readFeatureSync(file) {
  return gherkin.parse(fs.readFileSync(file, DEFAULT_FILE_ENCODING));
}

function ignoredFilesFilter(f) {
  // TODO Filter out files according to the .featurebookignore file
  return f !== DEFAULT_METADATA_FILE_NAME
    && f !== DEFAULT_SUMMARY_FILE_NAME
    && f != DEFAULT_IGNORE_FILE_NAME
    && f != DEFAULT_ASSETS_DIR
    && f !== DEFAULT_DIST_DIR
    && f !== GIT_REPO_DIR;
}
