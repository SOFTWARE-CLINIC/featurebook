var fs = require('fs'),
  Lexer = require('gherkin').Lexer('en');

module.exports.parse = function parse(featurePath) {

  var featureAsJson = {
      scenarios: []
    },

    lexer = new Lexer({
      comment: function (value, line) {
        console.log(value);
      },
      tag: function (value, line) {
        console.log(value);
      },
      feature: function (keyword, name, description, line) {
        console.log(keyword + ': ' + name);
        featureAsJson.name = name;
        featureAsJson.description = description;
      },
      background: function (keyword, name, description, line) {
        console.log('  ' + keyword + ': ' + name);
      },
      scenario: function (keyword, name, description, line) {
        console.log('  ' + keyword + ': ' + name);
        featureAsJson.scenarios.push({
          name: name,
          description: description
        });
      },
      scenario_outline: function (keyword, name, description, line) {
        console.log('  ' + keyword + ': ' + name);
      },
      examples: function (keyword, name, description, line) {
        console.log('  ' + keyword + ': ' + name);
      },
      step: function (keyword, name, line) {
        console.log('    ' + keyword + name);
      },
      doc_string: function (content_type, string, line) {
        console.log('      """\n' + string + '\n      """');
      },
      row: function (row, line) {
        console.log('      | ' + row.join(' | ') + ' |');
      },
      eof: function () {
        console.log('=====');
      }
    });

  lexer.scan(fs.readFileSync(featurePath));
  return featureAsJson;
};
