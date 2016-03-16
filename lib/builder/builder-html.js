'use strict';

var color = require('bash-color');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var jade = require('jade');
var featurebook = require('../featurebook-api');

module.exports = {
  build: build
};

function build(sourceDir, outputDir) {
  var outputFile = path.join(outputDir, 'index.html');
  var metadata = featurebook.readMetadataSync(sourceDir);
  var indexTemplate = path.join(__dirname, '../META-INF/html/index.jade');
  var featureTemplate = path.join(__dirname, '../META-INF/html/feature.jade');
  var compileOptions = {debug: false, pretty: true};

  mkdirp.sync(outputDir);

  var specTree = featurebook.readSpecTreeSync(sourceDir);

  var fn = jade.compileFile(indexTemplate, compileOptions);
  var locals = {metadata: metadata, nodes: specTree};
  fs.writeFileSync(outputFile, fn(locals));

  print(specTree);

  function print(node) {
    if (node.type === 'file') {
      try {
        var feature = featurebook.readFeatureSync(node.path);
        var fn = jade.compileFile(featureTemplate, compileOptions);
        fs.writeFileSync(path.join(outputDir, node.path + '.html'), fn({feature: feature}));
      } catch (err) {
        console.warn(color.red('Error printing feature `%s`: %s'), node.path, err);
      }
    }
    if (node.type === 'directory') {
      mkdirp.sync(path.join(outputDir, node.path));
      node.children.forEach(function (child) {
        print(child);
      });
    }
  }

}
