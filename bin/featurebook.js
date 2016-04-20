#!/usr/bin/env node
var program = require('commander');
var featurebook = require('../lib/featurebook-api');
var path = require('path');

var DEFAULT_SERVE_PORT = 3000;

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
  .action(buildPdf);

program
  .command('html [source-dir]')
  .option('-o, --output-dir <output-dir>', 'directory where the HTML specification will be generated (defaults to <source-dir>/dist/html)')
  .description('build the specification HTML document')
  .action(buildHtml);

program.parse(process.argv);

displayHelpIfNoCommandWasProvided();

function serve(specDir, options) {
  require('../lib/featurebook-serve').execute(
    specDir || process.cwd(),
    options.port || DEFAULT_SERVE_PORT);
}

function buildPdf(specDir, options) {
  require('../lib/featurebook-pdf').build(
    specDir || process.cwd(),
    options.outputDir || path.join(process.cwd(), 'dist', 'pdf'));
}

function buildHtml(specDir, options) {
  require('../lib/featurebook-html').build(
    specDir || process.cwd(),
    options.outputDir || path.join(process.cwd(), 'dist', 'html'));
}

function displayHelpIfNoCommandWasProvided() {
  if (!process.argv.slice(2).length) {
    program.help();
  }
}
