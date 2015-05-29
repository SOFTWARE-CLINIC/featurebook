var dirWalker = require('./dir-walker');

module.exports = {
  execute: execute
};

function execute(params) {
  var tree = dirWalker.walkSync(params.sourceDir, params.sourceDir);
  console.log('output to html/pdf/or something else...', tree);
}
