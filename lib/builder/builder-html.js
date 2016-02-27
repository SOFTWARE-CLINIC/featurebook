'use strict';

var fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  jade = require('jade');

module.exports = {
  build: build
};

function build(featurebook, sourceDir, outputDir) {
  var outputFile = path.join(outputDir, 'specification.html'),
      metadata = featurebook.getMetadataSync(sourceDir),
      templateFile = path.join(__dirname, 'specification.jade'),
      compileOptions = {debug: false, pretty: true};

  mkdirp.sync(outputDir);

  var featuresTree = featurebook.getFeaturesSync(sourceDir);

  var fn = jade.compileFile(templateFile, compileOptions);
  var locals = {metadata: metadata, nodes: featuresTree};
  fs.writeFileSync(outputFile, fn(locals));
}
