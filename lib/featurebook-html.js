'use strict';

var _ = require('lodash');
var color = require('bash-color');
var fs = require('fs-extra');
var path = require('path');
var jade = require('jade');
var featurebook = require('featurebook-api');
var markdown = require('featurebook-markdown');

var TEMPLATES_DIR = path.join(__dirname, './META-INF/html');
var NO_SUMMARY_MESSAGE_MD = 'You can put some content here by creating the `SUMMARY.md` Markdown file.';

function html(specDir, outputDir) {
  var metadata = featurebook.readMetadataSync(specDir);
  var indexTemplate = path.join(TEMPLATES_DIR, 'index.jade');
  var featureTemplate = path.join(TEMPLATES_DIR, 'feature.jade');
  var compileOptions = {debug: false, pretty: true};

  fs.mkdirpSync(outputDir);
  copyAssetsDir();

  var specTree = featurebook.readSpecTreeSync(specDir);

  var indexTemplateCompiled = jade.compileFile(indexTemplate, compileOptions);
  var featureTemplateCompiled = jade.compileFile(featureTemplate, compileOptions);

  print(specTree);

  function print(node, pathPrefix) {
    if (node.type === featurebook.NODE_FILE) {
      var featurePath = path.join(specDir, node.path);
      var nextPathPrefix = pathPrefix || './';
      try {
        var feature = featurebook.readFeatureSync(featurePath);
        fs.writeFileSync(path.join(outputDir, node.path + '.html'), featureTemplateCompiled({
          pathPrefix: nextPathPrefix,
          path: node.path,
          metadata: metadata,
          specTree: specTree,
          feature: markdown.descriptionMarkdownToHTML(feature, getMarkdownOptions(nextPathPrefix))
        }));
      } catch (err) {
        console.warn(color.red('Error printing feature `%s`: %s'), featurePath, err);
      }
    }
    if (node.type === featurebook.NODE_DIRECTORY) {
      fs.mkdirpSync(path.join(outputDir, node.path));

      var summary = featurebook.readSummarySync(path.join(specDir, node.path)) || NO_SUMMARY_MESSAGE_MD;
      var summaryOutputPath = path.join(outputDir, node.path, 'index.html');
      var nextPathPrefix = pathPrefix ? pathPrefix + '../' : './';

      fs.writeFileSync(summaryOutputPath, indexTemplateCompiled({
        pathPrefix: nextPathPrefix,
        metadata: metadata,
        specTree: specTree,
        summary: markdown.render(summary, getMarkdownOptions(nextPathPrefix))
      }));

      node.children.forEach(function (child) {
        print(child, nextPathPrefix);
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

function getMarkdownOptions(pathPrefix) {
  return {
    imageRenderer: getImageRenderer(pathPrefix),
    linkRenderer: getLinkRenderer(pathPrefix)
  };
}

function getImageRenderer(pathPrefix) {

  return function (attrs) {
    var src = attrs.src;
    attrs.src = isAsset(src) ? removeSchemaPrefix(src) : src;
    return attrs;
  };

  function isAsset(href) {
    return _.startsWith(href, markdown.ASSET_URL_SCHEMA);
  }

  function removeSchemaPrefix(url) {
    return pathPrefix + url.substring(markdown.ASSET_URL_SCHEMA.length);
  }

}

function getLinkRenderer(pathPrefix) {

  return function (attrs) {
    var href = attrs.href;
    attrs.href = isFeature(href) ? removeSchemaPrefixAndAppendHtmlSuffix(href) : href;
    return attrs;
  };

  function isFeature(href) {
    return _.startsWith(href, markdown.FEATURE_URL_SCHEMA);
  }

  function removeSchemaPrefixAndAppendHtmlSuffix(url) {
    return pathPrefix + url.substring(markdown.FEATURE_URL_SCHEMA.length) + '.html';
  }

}

module.exports = html;
html.$imageRenderer = getImageRenderer('');
html.$linkRenderer = getLinkRenderer('');
