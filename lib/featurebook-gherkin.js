'use strict';

var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();

module.exports = {
  parse: parse
};

function parse(text) {
  return parser.parse(text);
}
