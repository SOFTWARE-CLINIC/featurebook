'use strict';

var _ = require('lodash');
var path = require('path');
var express = require('express');
var featurebook = require('featurebook-api');
var markdown = require('./featurebook-markdown');

var NOT_FOUND = 404;
var INTERNAL_SERVER_ERROR = 500;

// --- REST API ---
// http://localhost:3000/api/rest/raw/assets/images/hello_world.png
// http://localhost:3000/api/rest/metadata
// http://localhost:3000/api/rest/summary
// http://localhost:3000/api/rest/spec/tree
// http://localhost:3000/api/rest/feature/hello_world.feature
// http://localhost:3000/api/rest/feature/non_technical%2Fload_testing.feature
// ----------------

function serve(specDir, port, cb) {
  var app = express();

  var markdownOptions = {
    imageRenderer: imageRenderer,
    linkRenderer: linkRenderer
  };

  app.disable('x-powered-by');

  // serve static files from the `public` folder
  app.use('/', express.static(path.join(__dirname, '..', 'public')));

  // serve static raw files from the specification source dir directory
  app.use('/api/rest/raw', express.static(specDir, {
    index: false
  }));

  app.get('/api/rest/metadata', function (req, res, next) {
    featurebook.readMetadata(specDir, function (err, metadata) {
      if (err) {
        next(err);
      } else {
        res.send(metadata);
      }
    });
  });

  // returns parsed summary or 404 if SUMMARY.md is not present
  app.get('/api/rest/summary/:path?', function (req, res, next) {
    var summaryDir = req.params.path ? path.join(specDir, req.params.path) : specDir;
    featurebook.readSummary(summaryDir, function (err, summary) {
      if (err) {
        next(err);
      } else if (summary !== null) {
        res.send(markdown.render(summary, markdownOptions));
      } else {
        res.status(NOT_FOUND).end();
      }
    });
  });

  app.get('/api/rest/spec/tree', function (req, res, next) {
    featurebook.readSpecTree(specDir, function (err, specTree) {
      if (err) {
        next(err);
      } else {
        res.send(specTree);
      }
    });
  });

  app.get('/api/rest/feature/:path', function (req, res) {
    featurebook.readFeature(path.join(specDir, req.params.path), function (err, feature) {
      var responseBody = {};
      if (err) {
        responseBody.status = 'error';
        responseBody.message = 'Unable to parse the feature file: ' + err;
      } else {
        responseBody.status = 'success';
        responseBody.data = markdown.descriptionMarkdownToHTML(feature, markdownOptions);
      }
      res.send(responseBody);
    });
  });

  app.use(function (err, req, res, next) {
    res.status(INTERNAL_SERVER_ERROR).send({error: err.message});
  });

  app.listen(port, cb);

  return app;
}

function imageRenderer(attrs) {
  var src = attrs.src;
  attrs.src = isAsset(src) ? addAssetPrefix(src) : src;
  return attrs;

  function isAsset(url) {
    return _.startsWith(url, markdown.ASSET_URL_SCHEMA);
  }

  function addAssetPrefix(url) {
    return 'api/rest/raw' + (_.startsWith(url, '/') ? '' : '/') + url.substring(markdown.ASSET_URL_SCHEMA.length);
  }
}

function linkRenderer(attrs) {
  var href = attrs.href;
  attrs.href = isFeature(href) ? addFeaturePrefix(href) : href;
  return attrs;

  function isFeature(url) {
    return _.startsWith(href, markdown.FEATURE_URL_SCHEMA);
  }

  function addFeaturePrefix(url) {
    return '/#/viewer' + (_.startsWith(url, '/') ? '' : '/') + url.substring(markdown.FEATURE_URL_SCHEMA.length);
  }
}

module.exports = serve;
serve.$imageRenderer = imageRenderer;
serve.$linkRenderer = linkRenderer;
