#!/usr/bin/env node

var path = require('path'),
  express = require('express'),
  pkg = require('../package.json'),
  dirWalker = require('../lib/directory-walker'),
  gherkin = require('../lib/gherkin-parser'),
  program = require('commander');

program
  .version(pkg.version)
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
  .parse(process.argv);

var port = program.port || 3000;

var app = express();

// serve static files from the frontend folder
app.use('/', express.static(path.join(__dirname, '../frontend')));

// http://localhost:3000/api/rest/feature/tree
app.get('/api/rest/feature/tree', function (req, res) {
  // scan the directory in which the script was called.
  res.send(dirWalker.walk('.', '.'));
});

// http://localhost:3000/api/rest/feature/raw/hello_world.feature
// http://localhost:3000/api/rest/feature/raw/non_technical%2Fload_testing.feature
app.get('/api/rest/feature/raw/:path', function (req, res) {
  res.send(gherkin.parse(req.params.path));
});

app.listen(port);
console.log('FeatureBook is running on port ' + port);
