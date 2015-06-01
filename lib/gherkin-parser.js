var fs = require('fs'),
    Lexer = require('gherkin').Lexer('en');

module.exports.parse = parse;

function parse(featurePath) {

    var featureAsJson = {
            scenarios: [],
            scenario_outlines: []
        },
        lastKeywordWithSteps,

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
                lastKeywordWithSteps = 'background';
                featureAsJson.background = {
                    steps: []
                }
            },
            scenario: function (keyword, name, description, line) {
                lastKeywordWithSteps = 'scenario';
                featureAsJson.scenarios.push({
                    name: name,
                    description: description,
                    steps: []
                });
            },
            scenario_outline: function (keyword, name, description, line) {
                lastKeywordWithSteps = 'scenario_outline';
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
                var stepAsJson = {
                    keyword: keyword.trim(),
                    name: name
                };

                if (lastKeywordWithSteps === 'background') {
                    featureAsJson.background.steps.push(stepAsJson);
                }

                if (lastKeywordWithSteps === 'scenario') {
                    featureAsJson.scenarios.slice(-1)[0].steps.push(stepAsJson);
                }

                if (lastKeywordWithSteps === 'scenario_outline') {
                    featureAsJson.scenario_outlines.slice(-1)[0].steps.push(stepAsJson);
                }
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
