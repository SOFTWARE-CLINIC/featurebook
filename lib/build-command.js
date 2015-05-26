var dirWalker = require('./directory-walker');

module.exports = {
  execute: execute
};

function execute(params) {
  var tree = dirWalker.walk(params.sourceDir, params.sourceDir);
  console.log('output to html/pdf/or something else...', tree);
}
