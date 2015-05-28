var path = require('path'),
  express = require('express'),
  walker = require('./dir-walker'),
  gherkin = require('./gherkin-parser');

module.exports = {
  execute: execute
};

// --- REST API ---
// http://localhost:3000/api/rest/raw/assets/images/hello_world.png
// http://localhost:3000/api/rest/feature/tree
// http://localhost:3000/api/rest/feature/parsed/hello_world.feature
// http://localhost:3000/api/rest/feature/parsed/non_technical%2Fload_testing.feature
// ----------------

function execute(params) {
  var app = express(),
    sourceDir = params.sourceDir,
    port = params.port;

  // serve static files from the frontend folder
  app.use('/', express.static(path.join(__dirname, '../public')));

  // http://localhost:3000/api/rest/feature/tree
  app.get('/api/rest/feature/tree', function (req, res) {
    res.send(walker.walkSync(sourceDir, sourceDir));
  });

  // http://localhost:3000/api/rest/feature/parsed/hello_world.feature
  // http://localhost:3000/api/rest/feature/parsed/non_technical%2Fload_testing.feature
  app.get('/api/rest/feature/parsed/:path', function (req, res) {
    res.send(gherkin.parse(req.params.path));
  });

  app.use('/api/rest/raw', express.static(process.cwd(), {
    index: false
  }));

  app.listen(port);
  console.log('FeatureBook is running on port', port);
}
