#!/usr/bin/env node

var pkg = require('../package.json'),
    program = require('commander'),
    path = require('path');

program
    .version(pkg.version);

program
    .command('serve [source-dir]')
    .option('-p, --port <port>', 'port on which to listen to (defaults to 3000)', parseInt)
    .description('serve source-dir as a system specification')
    .action(serve);

// FIXME Update command documentation
program
    .command('build [source-dir]')
    .option('-f, --format <format>', 'output format')
    .option('-o, --output-dir <output-dir>', 'directory where the static website will be generated (defaults to dist)')
    .description('build a static website from source-dir')
    .action(build);

program.parse(process.argv);

displayHelpIfNoCommandWasProvided();

function serve(sourceDir, options) {
    var serveCommand = require('../lib/command-serve');
    serveCommand.execute({
        sourceDir: sourceDir || process.cwd(),
        port: options.port || 3000
    });
}

function build(sourceDir, options) {
    var buildCommand = require('../lib/command-build');

    // TODO Experimenting with "dynamic" builders registration
    buildCommand.use(require('../lib/builder/builder-html'));
    buildCommand.use(require('../lib/builder/builder-pdf'));
    buildCommand.use(require('../lib/builder/builder-docx'));

    buildCommand.execute({
        sourceDir: sourceDir || process.cwd(),
        outputDir: options.outputDir || path.join(process.cwd(), 'dist'),
        format: options.format
    });
}

function displayHelpIfNoCommandWasProvided() {
    if (!process.argv.slice(2).length) {
        program.help();
    }
}
