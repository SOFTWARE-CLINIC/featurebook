#!/usr/bin/env node
'use strict';

var pkg = require('../package.json'),
  program = require('commander'),
  featurebook = require('../lib/featurebook-api'),
  path = require('path');

program
  .version(pkg.version);

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

function serve(sourceDir, options) {
  featurebook.commands.serve(
    sourceDir || process.cwd(),
    options.port || 3000
  );
}

function buildPdf(sourceDir, options) {
  featurebook.commands.pdf(
    sourceDir || process.cwd(),
    options.outputDir || path.join(process.cwd(), 'dist', 'pdf'));
}

function buildHtml(sourceDir, options) {
  featurebook.commands.html(
    sourceDir || process.cwd(),
    options.outputDir || path.join(process.cwd(), 'dist', 'html'));
}

function displayHelpIfNoCommandWasProvided() {
  if (!process.argv.slice(2).length) {
    program.help();
  }
}
