#!/usr/bin/env node

var program = require('commander');
var featurebook = require('../lib/featurebook-api');
var path = require('path');

var DEFAULT_SERVE_PORT = 3000;
var COMMAND_NAMES = ['serve', 'pdf', 'html'];

program
  .version(featurebook.version);

program
  .command('serve [source-dir]')
  .option('-p, --port <port>', 'port on which to listen to (defaults to 3000)', parseInt)
  .description('serve <source-dir> as a system specification')
  .action(serve);

program
  .command('pdf [source-dir]')
  .option('-o, --output-dir <output-dir>', 'directory where the PDF specification will be generated (defaults to <source-dir>/dist/pdf)')
  .description('build the specification PDF document')
  .action(pdf);

program
  .command('html [source-dir]')
  .option('-o, --output-dir <output-dir>', 'directory where the HTML specification will be generated (defaults to <source-dir>/dist/html)')
  .description('build the specification HTML document')
  .action(html);

program.parse(process.argv);

displayHelpIfNoCommandWasProvided();

function serve(specDir, options) {
  require('../lib/featurebook-serve').execute(
    specDir || process.cwd(),
    options.port || DEFAULT_SERVE_PORT);
}

function pdf(specDir, options) {
  require('../lib/featurebook-pdf').build(
    specDir || process.cwd(),
    options.outputDir || path.join(process.cwd(), 'dist', 'pdf'));
}

function html(specDir, options) {
  require('../lib/featurebook-html').build(
    specDir || process.cwd(),
    options.outputDir || path.join(process.cwd(), 'dist', 'html'));
}

function displayHelpIfNoCommandWasProvided() {
  var args = process.argv.slice(2);
  if (!args.length || COMMAND_NAMES.indexOf(args[0]) === -1) {
    program.help();
  }
}
