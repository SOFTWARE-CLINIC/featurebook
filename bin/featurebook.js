#!/usr/bin/env node

var pkg = require('../package.json'),
  program = require('commander'),
  path = require('path'),
  featurebook = require('../lib/featurebook');

program
  .version(pkg.version);

program
  .command('serve [source-dir]')
  .option('-p, --port <port>', 'port on which to listen to (defaults to 3000)', parseInt)
  .description('serve source-dir as a system specification')
  .action(serve);

program
  .command('build [source-dir]')
  .option('-o, --output-dir <output-dir>', 'directory where the static website will be generated (defaults to dist)')
  .description('build a static website from source-dir')
  .action(build);

program.parse(process.argv);

displayHelpIfNoCommandWasProvided();

function serve(sourceDir, options) {
  featurebook.serve(sourceDir || process.cwd(), options.port || 3000);
}

function build(sourceDir, options) {
  featurebook.build(sourceDir || process.cwd(), options.outputDir || path.join(process.cwd(), 'dist'));
}

function displayHelpIfNoCommandWasProvided() {
  if (!process.argv.slice(2).length) {
    program.help();
  }
}
