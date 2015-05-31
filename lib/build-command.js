var dirWalker = require('./dir-walker');

module.exports = {
    execute: execute
};

function execute(params) {
    var tree = dirWalker.walkSync(params.sourceDir, params.sourceDir);
    console.log('output', params.sourceDir, ' to ', params.outputDir);
}
