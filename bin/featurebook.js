#!/usr/bin/env node

var program = require('commander');
var featurebook = require('featurebook-api');
var featurebookServe = require('featurebook-serve');
var featurebookPdf = require('featurebook-pdf');
var featurebookHtml = require('featurebook-html');
var path = require('path');
var color = require('bash-color');
var opener = require('opener');

var DEFAULT_SERVE_PORT = 3000;
var COMMAND_NAMES = ['serve', 'pdf', 'html'];

program
  .version('CLI version: ' + require('../package.json').version + '\nAPI version: ' + featurebook.getVersion());

program
  .command('serve [spec-dir]')
  .option('-p, --port <port>', 'port on which to listen to (defaults to 3000)', parseInt)
  .description('serve <spec-dir> as a system specification')
  .action(serve);

program
  .command('pdf [spec-dir]')
  .option('-o, --output-dir <output-dir>', 'directory where the PDF specification will be generated (defaults to <spec-dir>/dist/pdf)')
  .description('build the specification PDF document')
  .action(pdf);

program
  .command('html [spec-dir]')
  .option('-o, --output-dir <output-dir>', 'directory where the HTML specification will be generated (defaults to <spec-dir>/dist/html)')
  .description('build the specification HTML document')
  .action(html);

program.parse(process.argv);

displayHelpIfNoCommandWasProvided();

function serve(specDir, options) {
  var port = options.port || DEFAULT_SERVE_PORT;
  featurebookServe(specDir || process.cwd(), port, printServeStatus);

  function printServeStatus() {
    console.log(color.green('FeatureBook is running on port ' + port));
    require('dns').lookup(require('os').hostname(), function (err, address) {
      var shareLink = 'http://' + address + ':' + port;
      console.log(color.yellow('It is available to all computers in the local network at ' + shareLink));
      opener(shareLink);
    });
  }
}

function pdf(specDir, options) {
  var outputDir = options.outputDir || path.join(process.cwd(), 'dist', 'pdf');
  featurebookPdf(specDir || process.cwd(), outputDir);
}

function html(specDir, options) {
  var outputDir = options.outputDir || path.join(process.cwd(), 'dist', 'html');
  featurebookHtml(specDir || process.cwd(), outputDir);
}

function displayHelpIfNoCommandWasProvided() {
  var args = process.argv.slice(2);
  if (!args.length || COMMAND_NAMES.indexOf(args[0]) === -1) {
    program.help();
  }
}
