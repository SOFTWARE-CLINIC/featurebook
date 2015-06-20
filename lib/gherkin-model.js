var fs = require('fs'),
    gherkin = require('gherkin');

module.exports.fromFileSync = fromFileSync;

function fromFileSync(featurePath, config) {
    config = config || {};

    var BACKGROUND = 'background',
        SCENARIO = 'scenario',
        SCENARIO_OUTLINE = 'scenario_outline',
        EXAMPLES = 'examples',
        STEP = 'step';

    var descriptionCallback = config.descriptionCallback || identity;

    var Lexer = gherkin.Lexer(config.language || 'en');

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
                // Do nothing here
            },
            tag: function onTag(value, line) {
                tags.push(value);
            },
            feature: function onFeature(keyword, name, description, line) {
                featureModel.tags = popTags();
                featureModel.name = name;
                featureModel.description = descriptionCallback(description);
            },
            background: function onBackground(keyword, name, description, line) {
                lastKeywordWithSteps = BACKGROUND;
                featureModel.background = {
                    name: name,
                    description: descriptionCallback(description),
                    steps: []
                }
            },
            scenario: function onScenario(keyword, name, description, line) {
                lastKeywordWithSteps = SCENARIO;
                featureModel.scenarios.push({
                    tags: popTags(),
                    name: name,
                    description: descriptionCallback(description),
                    steps: []
                });
            },
            scenario_outline: function onScenarioOutline(keyword, name, description, line) {
                lastKeywordWithSteps = SCENARIO_OUTLINE;
                featureModel.scenario_outlines.push({
                    tags: popTags(),
                    name: name,
                    description: descriptionCallback(description),
                    steps: [],
                    examples: {
                        dataTable: []
                    }
                });
            },
            examples: function onExamples(keyword, name, description, line) {
                lastKeywordWithRows = EXAMPLES;
                lastScenarioOutline().examples.name = name;
                lastScenarioOutline().examples.description = descriptionCallback(description);
            },
            step: function onStep(keyword, name, line) {
                lastKeywordWithRows = 'step';
                var stepAsJson = {
                    keyword: keyword.trim(),
                    name: name,
                    dataTable: []
                };

                if (lastKeywordWithSteps === BACKGROUND) {
                    featureModel.background.steps.push(stepAsJson);
                }

                if (lastKeywordWithSteps === SCENARIO) {
                    lastScenario().steps.push(stepAsJson);
                }

                if (lastKeywordWithSteps === SCENARIO_OUTLINE) {
                    lastScenarioOutline().steps.push(stepAsJson);
                }
            },
            doc_string: function onDocString(content_type, string, line) {
                if (lastKeywordWithSteps === SCENARIO) {
                    lastScenario().steps.slice(-1)[0].docString = string;
                }
                if (lastKeywordWithSteps === SCENARIO_OUTLINE) {
                    lastScenarioOutline().steps.slice(-1)[0].docString = string;
                }
            },
            row: function onRow(row, line) {
                if (lastKeywordWithRows === EXAMPLES) {
                    lastScenarioOutline().examples.dataTable.push(row);
                }

                if (lastKeywordWithRows === STEP) {
                    if (lastKeywordWithSteps === SCENARIO) {
                        lastScenario().steps.slice(-1)[0].dataTable.push(row);
                    }
                    if (lastKeywordWithSteps === SCENARIO_OUTLINE) {
                        lastScenarioOutline().steps.slice(-1)[0].dataTable.push(row);
                    }
                }

            },
            eof: function onEof() {
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

    function identity(x) {
        return x;
    }

    lexer.scan(fs.readFileSync(featurePath));
    return featureModel;
}
