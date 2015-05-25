#!/usr/bin/env node

var pkg = require('../package.json'),
  program = require('commander'),
  featurebook = require('../lib/featurebook');

program
  .version(pkg.version)
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
  .parse(process.argv);

var port = program.port || 3000;

featurebook.serve(port, '.');