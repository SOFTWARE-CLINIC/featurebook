module.exports = {
    serve: serve,
    build: build
};

/**
 * Serve the content of the given source directory as a system specification website.
 *
 * @param sourceDir
 * @param port
 */
function serve(sourceDir, port) {
    var serveCommand = require('./serve-command');
    serveCommand.execute({
        sourceDir: sourceDir,
        port: port
    });
}

/**
 * Build the static system specification website in the output directory from the content of the given source directory.
 *
 * @param sourceDir
 * @param outputDir
 */
function build(sourceDir, outputDir) {
    var buildCommand = require('./build-command');
    buildCommand.execute({
        sourceDir: sourceDir,
        outputDir: outputDir
    });
}