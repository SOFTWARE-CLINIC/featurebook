var color = require('bash-color');
var fs = require('fs-extra');
var path = require('path');
var jade = require('jade');
var featurebook = require('./featurebook-api');

var TEMPLATES_DIR = path.join(__dirname, './META-INF/html');

function build(specDir, outputDir) {
  var metadata = featurebook.readMetadataSync(specDir);
  var indexTemplate = path.join(TEMPLATES_DIR, 'index.jade');
  var featureTemplate = path.join(TEMPLATES_DIR, 'feature.jade');
  var compileOptions = {debug: false, pretty: true};

  fs.mkdirpSync(outputDir);
  copyAssetsDir();

  var specTree = featurebook.readSpecTreeSync(specDir);

  var indexTemplateCompiled = jade.compileFile(indexTemplate, compileOptions);
  var featureTemplateCompiled = jade.compileFile(featureTemplate, compileOptions);

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexTemplateCompiled({pathPrefix: './', metadata: metadata, specTree: specTree}));

  print(specTree);

  function print(node, pathPrefix) {
    if (node.type === featurebook.NODE_FILE) {
      var featurePath = path.join(specDir, node.path);
      try {
        var feature = featurebook.readFeatureSync(featurePath);
        fs.writeFileSync(path.join(outputDir, node.path + '.html'), featureTemplateCompiled({
          pathPrefix: pathPrefix || './',
          path: node.path,
          metadata: metadata,
          specTree: specTree,
          feature: featurebook.descriptionMarkdownToHTML(feature)
        }));
      } catch (err) {
        console.warn(color.red('Error printing feature `%s`: %s'), featurePath, err);
      }
    }
    if (node.type === featurebook.NODE_DIRECTORY) {
      fs.mkdirpSync(path.join(outputDir, node.path));
      node.children.forEach(function (child) {
        print(child, pathPrefix ? pathPrefix + '../' : './');
      });
    }
  }

  function copyAssetsDir() {
    var assetsDir = path.join(specDir, 'assets');
    try {
      var stats = fs.statSync(assetsDir);
      if (stats.isDirectory()) {
        fs.copySync(assetsDir, path.join(outputDir, 'assets'));
      }
    } catch (err) {
      // ignore
    }
  }

}

module.exports = {
  build: build
};
