var fs = require('fs'),
  Lexer = require('gherkin').Lexer('en');

module.exports.parse = parse;

function parse(featurePath) {

  var featureAsJson = {
      scenarios: [],
      scenario_outlines: []
    },
    outline,

    lexer = new Lexer({
      comment: function (value, line) {
        console.log(value);
      },
      tag: function (value, line) {
        console.log(value);
      },
      feature: function (keyword, name, description, line) {
        featureAsJson.name = name;
        featureAsJson.description = description;
      },
      background: function (keyword, name, description, line) {
        console.log('  ' + keyword + ': ' + name);
      },
      scenario: function (keyword, name, description, line) {
        outline = false;
        featureAsJson.scenarios.push({
          name: name,
          description: description,
          steps: []
        });
      },
      scenario_outline: function (keyword, name, description, line) {
        outline = true;
        featureAsJson.scenario_outlines.push({
          name: name,
          description: description,
          steps: [],
          examples: []
        });
      },
      examples: function (keyword, name, description, line) {
        // Do nothing here
      },
      step: function (keyword, name, line) {
        var property = outline ? 'scenario_outlines' : 'scenarios',
          lastScenario = featureAsJson[property].slice(-1)[0];

        lastScenario.steps.push({
          keyword: keyword.trim(),
          name: name
        });
      },
      doc_string: function (content_type, string, line) {
        console.log('      """\n' + string + '\n      """');
      },
      row: function (row, line) {
        var lastScenario = featureAsJson.scenario_outlines.slice(-1)[0];
        lastScenario.examples.push(row);
      },
      eof: function () {
        // Do nothing here
      }
    });

  lexer.scan(fs.readFileSync(featurePath));
  return featureAsJson;
}
