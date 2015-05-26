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
 * Build the static system specification website in the target directory from the content of the given source directory.
 *
 * @param sourceDir
 * @param targetDir
 */
function build(sourceDir, targetDir) {
  var buildCommand = require('./build-command');
  buildCommand.execute({
    sourceDir: sourceDir,
    targetDir: targetDir
  });
}