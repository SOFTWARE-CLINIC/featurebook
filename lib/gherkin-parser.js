var fs = require('fs'),
    gherkin = require('gherkin');

module.exports.parseSync = parseSync;

function parseSync(featurePath, language) {

    var Lexer = gherkin.Lexer(language || 'en');

    var featureModel = {
            scenarios: [],
            scenario_outlines: [],
            tags: []
        },
        lastKeywordWithSteps,
        lastKeywordWithRows,
        tags = [],

        lexer = new Lexer({
            comment: function onComment(value, line) {
                console.log(value);
            },
            tag: function onTag(value, line) {
                tags.push(value);
            },
            feature: function onFeature(keyword, name, description, line) {
                featureModel.tags = popTags();

                featureModel.name = name;
                featureModel.description = description;
            },
            background: function onBackground(keyword, name, description, line) {
                lastKeywordWithSteps = 'background';
                featureModel.background = {
                    steps: []
                }
            },
            scenario: function onScenario(keyword, name, description, line) {
                lastKeywordWithSteps = 'scenario';
                featureModel.scenarios.push({
                    name: name,
                    description: description,
                    steps: [],
                    tags: popTags()
                });
            },
            scenario_outline: function onScenarioOutline(keyword, name, description, line) {
                lastKeywordWithSteps = 'scenario_outline';
                featureModel.scenario_outlines.push({
                    name: name,
                    description: description,
                    steps: [],
                    examples: [],
                    tags: popTags()
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
                    featureModel.background.steps.push(stepAsJson);
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

    function popTags() {
        var tmp = tags;
        tags = [];
        return tmp;
    }

    function lastScenario() {
        return featureModel.scenarios.slice(-1)[0];
    }

    function lastScenarioOutline() {
        return featureModel.scenario_outlines.slice(-1)[0];
    }

    lexer.scan(fs.readFileSync(featurePath));
    return featureModel;
}
