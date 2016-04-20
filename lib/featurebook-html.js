var color = require('bash-color');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var jade = require('jade');
var featurebook = require('./featurebook-api');

module.exports = {
  build: build
};

var TEMPLATES_DIR = path.join(__dirname, './META-INF/html');

function build(specDir, outputDir) {
  var metadata = featurebook.readMetadataSync(specDir);
  var indexTemplate = path.join(TEMPLATES_DIR, 'index.jade');
  var featureTemplate = path.join(TEMPLATES_DIR, 'feature.jade');
  var compileOptions = {debug: false, pretty: true};

  mkdirp.sync(outputDir);

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
          feature: feature
        }));
      } catch (err) {
        console.warn(color.red('Error printing feature `%s`: %s'), featurePath, err);
      }
    }
    if (node.type === featurebook.NODE_DIRECTORY) {
      mkdirp.sync(path.join(outputDir, node.path));
      node.children.forEach(function (child) {
        print(child, pathPrefix ? pathPrefix + '../' : './');
      });
    }
  }

}

function copyFile(sourcePath, targetPath) {
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));
}
