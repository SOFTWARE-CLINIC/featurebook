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

var TEMPLATES_DIR = path.join(__dirname, '../META-INF/html');
var NODE_FILE = 'file';
var NODE_DIRECTORY = 'directory';

function build(sourceDir, outputDir) {
  var metadata = featurebook.readMetadataSync(sourceDir);
  var indexTemplate = path.join(TEMPLATES_DIR, 'index.jade');
  var specTreeTemplate = path.join(TEMPLATES_DIR, 'spec-tree.jade');
  var metadataTemplate = path.join(TEMPLATES_DIR, 'metadata.jade');
  var featureTemplate = path.join(TEMPLATES_DIR, 'feature.jade');
  var compileOptions = {debug: false, pretty: true};

  mkdirp.sync(outputDir);

  var specTree = featurebook.readSpecTreeSync(sourceDir);

  var specTreeTemplateCompiled = jade.compileFile(specTreeTemplate, compileOptions);
  var metadataTemplateCompiled = jade.compileFile(metadataTemplate, compileOptions);
  var indexTemplateCompiled = jade.compileFile(indexTemplate, compileOptions);
  var featureTemplateCompiled = jade.compileFile(featureTemplate, compileOptions);

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexTemplateCompiled({metadata: metadata, specTree: specTree}));

  print(specTree);

  function print(node) {
    if (node.type === NODE_FILE) {
      try {
        var feature = featurebook.readFeatureSync(node.path);
        fs.writeFileSync(path.join(outputDir, node.path + '.html'), featureTemplateCompiled({
          metadata: metadata,
          specTree: specTree,
          feature: feature
        }));
      } catch (err) {
        console.warn(color.red('Error printing feature `%s`: %s'), node.path, err);
      }
    }
    if (node.type === NODE_DIRECTORY) {
      mkdirp.sync(path.join(outputDir, node.path));
      node.children.forEach(function (child) {
        print(child);
      });
    }
  }

}

function copyFile(sourcePath, targetPath) {
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));
}
