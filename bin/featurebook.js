#!/usr/bin/env node
"use strict";

var pkg = require('../package.json'),
    program = require('commander'),
    featurebook = require('../lib/featurebook-api'),
    path = require('path');

program
    .version(pkg.version);

program
    .command('serve [source-dir]')
    .option('-p, --port <port>', 'port on which to listen to (defaults to 3000)', parseInt)
    .description('serve source-dir as a system specification')
    .action(serve);

program
    .command('build [source-dir]')
    .option('-f, --format <format>', 'output format')
    .option('-o, --output-dir <output-dir>', 'directory where the document will be generated (defaults to dist)')
    .description('build a specification document in a given format from source-dir')
    .action(build);

program.parse(process.argv);

displayHelpIfNoCommandWasProvided();

function serve(sourceDir, options) {
    featurebook.commands.serve(
        sourceDir || process.cwd(),
        options.port || 3000
    );
}

function build(sourceDir, options) {
    featurebook.commands.build(
        sourceDir || process.cwd(),
        options.format,
        options.outputDir || path.join(process.cwd(), 'dist'));
}

function displayHelpIfNoCommandWasProvided() {
    if (!process.argv.slice(2).length) {
        program.help();
    }
}
