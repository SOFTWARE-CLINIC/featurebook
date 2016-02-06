'use strict';

var fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp');

module.exports = {
  build: build
};

function build(featurebook, sourceDir, outputDir) {
  var outputFile = path.join(outputDir, 'specification.html');
  mkdirp.sync(outputDir);
  fs.closeSync(fs.openSync(outputFile, 'w'));
}
