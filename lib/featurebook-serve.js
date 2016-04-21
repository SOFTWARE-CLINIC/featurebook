var _ = require('lodash');
var path = require('path');
var express = require('express');
var color = require('bash-color');
var featurebook = require('./featurebook-api');
var markdown = require('./featurebook-markdown');
var opener = require('opener');

module.exports = {
  execute: execute
};

// --- REST API ---
// http://localhost:3000/api/rest/raw/assets/images/hello_world.png
// http://localhost:3000/api/rest/metadata
// http://localhost:3000/api/rest/summary
// http://localhost:3000/api/rest/spec/tree
// http://localhost:3000/api/rest/feature/hello_world.feature
// http://localhost:3000/api/rest/feature/non_technical%2Fload_testing.feature
// ----------------

function execute(specDir, port) {
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
        res.send(markdown.toHTML(summary, markdownOptions));
      } else {
        res.status(404).end();
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

  app.use(clientErrorHandler);

  app.listen(port, function () {
    printServeStatus(port);
    printShareLinkAndOpenItInTheDefaultBrowser(port);
  });

  function clientErrorHandler(err, req, res, next) {
    res.status(500).send({error: err.message});
  }

  function printServeStatus(port) {
    console.log(color.green('FeatureBook is running on port ' + port));
  }

  function printShareLinkAndOpenItInTheDefaultBrowser(port) {
    require('dns').lookup(require('os').hostname(), function (err, address) {
      var shareLink = 'http://' + address + ':' + port;
      console.log(color.yellow('It is available to all computers in the local network at ' + shareLink));
      opener(shareLink);
    });
  }
}

function imageRenderer(href, title, text) {
  return '<img src="' + (isAbsolute(href) ? href : restApiPrefix(href)) + '" alt="' + text + '">';

  function isAbsolute(url) {
    return _.startsWith(url, 'http://') || _.startsWith(url, 'https://');
  }

  function restApiPrefix(url) {
    return 'api/rest/raw' + (_.startsWith(url, '/') ? '' : '/') + url;
  }
}

function linkRenderer(href, title, text) {
  return '<a href="' + (_.endsWith(href, '.feature') ? featureRoutePrefix(href) : href) + '">' + text + '</a>';

  function featureRoutePrefix(url) {
    return '/#/viewer' + (_.startsWith(url, '/') ? '' : '/') + url;
  }
}
