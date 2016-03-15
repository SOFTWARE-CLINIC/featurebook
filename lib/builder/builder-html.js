'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var jade = require('jade');
var featurebook = require('../featurebook-api')

module.exports = {
  build: build
};

function build(sourceDir, outputDir) {
  var outputFile = path.join(outputDir, 'index.html');
  var metadata = featurebook.readMetadataSync(sourceDir);
  var indexTemplate = path.join(__dirname, '../META-INF/index.jade');
  var featureTemplate = path.join(__dirname, '../META-INF/feature.jade');
  var compileOptions = {debug: false, pretty: true};

  mkdirp.sync(outputDir);

  var specTree = featurebook.readSpecTreeSync(sourceDir);

  var fn = jade.compileFile(indexTemplate, compileOptions);
  var locals = {metadata: metadata, nodes: specTree};
  fs.writeFileSync(outputFile, fn(locals));

  print(specTree);

  function print(node) {
    if (node.type === 'file') {
      var feature = featurebook.readFeatureSync(node.path);
      var fn = jade.compileFile(featureTemplate, compileOptions);
      fs.writeFileSync(path.join(outputDir, node.name + '.html'), fn({feature: feature}));
    }
    if (node.type === 'directory') {
      node.children.forEach(function (child) {
        print(child);
      });
    }
  }

}
