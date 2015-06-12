var fs = require('fs'),
    gherkin = require('gherkin');

module.exports.parse = parse;

function parse(featurePath, language) {

    var Lexer = gherkin.Lexer(language || 'en');

    var featureAsJson = {
            scenarios: [],
            scenario_outlines: []
        },
        lastKeywordWithSteps,
        lastKeywordWithRows,

        lexer = new Lexer({
            comment: function onComment(value, line) {
                console.log(value);
            },
            tag: function onTag(value, line) {
                console.log(value);
            },
            feature: function onFeature(keyword, name, description, line) {
                featureAsJson.name = name;
                featureAsJson.description = description;
            },
            background: function onBackground(keyword, name, description, line) {
                lastKeywordWithSteps = 'background';
                featureAsJson.background = {
                    steps: []
                }
            },
            scenario: function onScenario(keyword, name, description, line) {
                lastKeywordWithSteps = 'scenario';
                featureAsJson.scenarios.push({
                    name: name,
                    description: description,
                    steps: []
                });
            },
            scenario_outline: function onScenarioOutline(keyword, name, description, line) {
                lastKeywordWithSteps = 'scenario_outline';
                featureAsJson.scenario_outlines.push({
                    name: name,
                    description: description,
                    steps: [],
                    examples: []
                });
            },
            examples: function onExamples(keyword, name, description, line) {
                lastKeywordWithRows = 'examples';
            },
            step: function onStep(keyword, name, line) {
                lastKeywordWithRows = 'step';
                var stepAsJson = {
                    keyword: keyword.trim(),
                    name: name,
                    args: []
                };

                if (lastKeywordWithSteps === 'background') {
                    featureAsJson.background.steps.push(stepAsJson);
                }

                if (lastKeywordWithSteps === 'scenario') {
                    lastScenario().steps.push(stepAsJson);
                }

                if (lastKeywordWithSteps === 'scenario_outline') {
                    lastScenarioOutline().steps.push(stepAsJson);
                }
            },
            doc_string: function onDocString(content_type, string, line) {
                console.log('      """\n' + string + '\n      """');
            },

            row: function onRow(row, line) {
                if (lastKeywordWithRows === 'examples') {
                    lastScenarioOutline().examples.push(row);
                }

                if (lastKeywordWithRows === 'step') {
                    lastScenario().steps.slice(-1)[0].args.push(row);
                }

            },
            eof: function () {
                // Do nothing here
            }
        });

    function lastScenario() {
        return featureAsJson.scenarios.slice(-1)[0];
    }

    function lastScenarioOutline() {
        return featureAsJson.scenario_outlines.slice(-1)[0];
    }

    lexer.scan(fs.readFileSync(featurePath));
    return featureAsJson;
}
