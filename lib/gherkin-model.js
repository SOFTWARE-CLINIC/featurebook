'use strict';

var fs = require('fs'),
    Gherkin = require('gherkin'),
    parser = new Gherkin.Parser();

module.exports = {
    fromFileSync: fromFileSync
};

function fromFileSync(featurePath) {
    var gherkinDoc = fs.readFileSync(featurePath, 'UTF-8');
    return parser.parse(
        new Gherkin.TokenScanner(gherkinDoc),
        new Gherkin.AstBuilder(),
        new Gherkin.TokenMatcher()
    );
}
