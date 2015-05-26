var path = require('path'),
  express = require('express'),
  dirWalker = require('./directory-walker'),
  gherkin = require('./gherkin-parser');

module.exports = {
  execute: execute
};

function execute(params) {
  var app = express(),
    dir = params.sourceDir,
    port = params.port;

  // serve static files from the frontend folder
  app.use('/', express.static(path.join(__dirname, '../public')));

  // http://localhost:3000/api/rest/feature/tree
  app.get('/api/rest/feature/tree', function (req, res) {
    res.send(dirWalker.walk(dir, dir));
  });

  // http://localhost:3000/api/rest/feature/raw/hello_world.feature
  // http://localhost:3000/api/rest/feature/raw/non_technical%2Fload_testing.feature
  app.get('/api/rest/feature/raw/:path', function (req, res) {
    res.send(gherkin.parse(req.params.path));
  });

  app.listen(port);
  console.log('FeatureBook is running on port ', port);
}
