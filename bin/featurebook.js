#!/usr/bin/env node

var path = require('path'),
    express = require('express'),
    contentDisposition = require('content-disposition'),
    pkg = require('../package.json'),
    scan = require('../lib/scan'),
    program = require('commander');

program
	.version(pkg.version)
	.option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
	.parse(process.argv);

var port = program.port || 3000;

// scan the directory in which the script was called.
var tree = scan('.', 'files');

// create a new express app
var app = express();

// serve static files from the frontend folder
app.use('/', express.static(path.join(__dirname, '../frontend')));
// serve files from the current directory under the /files route

app.use('/files', express.static(process.cwd(), {
	index: false,
	setHeaders: function(res, path) {
		res.setHeader('Content-Disposition', contentDisposition(path))
	}
}));

app.get('/api/rest/tree', function(req, res) {
	res.send(tree);
});

app.listen(port);
console.log('FeatureBook is running on port ' + port);
