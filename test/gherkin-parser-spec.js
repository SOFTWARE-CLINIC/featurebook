var gherkin = require('../lib/gherkin-parser'),
    assert = require('assert'),
    should = require('chai').should();

describe('gherkin-parser', function () {

    describe('#parse', function () {

        it('should parse a simple feature with a single scenario', function () {
            var featureAsJson = gherkin.parse('test/resources/hello_world.feature'),
                firstScenario = featureAsJson.scenarios[0];

            featureAsJson.name.should.equal('Hello World');

            featureAsJson.scenarios.should.have.length(1);
            featureAsJson.scenario_outlines.should.be.empty;

            assert.equal(firstScenario.name, 'Look Ma');
            assert.equal(firstScenario.steps.length, 3);

            assertStepEqual(firstScenario.steps[0], 'Given', 'I am in a browser');
            assertStepEqual(firstScenario.steps[1], 'When', 'I make a syntax error');
            assertStepEqual(firstScenario.steps[2], 'Then', 'stuff should be red');
        });

        it('should parse a simple feature with a single scenario outline', function () {
            var feature = gherkin.parse('test/resources/eating_cucumbers.feature'),
                firstScenarioOutline = feature.scenario_outlines[0];

            feature.name.should.equal('Eating cucumbers');
            feature.scenarios.should.have.length(0);
            feature.scenario_outlines.should.have.length(1);

            assert.equal(firstScenarioOutline.name, 'Eat');
            assert.equal(firstScenarioOutline.steps.length, 3);

            assertStepEqual(firstScenarioOutline.steps[0], 'Given', 'there are <start> cucumbers');
            assertStepEqual(firstScenarioOutline.steps[1], 'When', 'I eat <eat> cucumbers');
            assertStepEqual(firstScenarioOutline.steps[2], 'Then', 'I should have <left> cucumbers');

            assert.equal(firstScenarioOutline.examples.length, 3);
            assertRowEqual(firstScenarioOutline.examples[0], ['start', 'eat', 'left']);
            assertRowEqual(firstScenarioOutline.examples[1], [12, 5, 7]);
            assertRowEqual(firstScenarioOutline.examples[2], [20, 5, 15]);
        });

        it('should parse a simple feature with the background', function () {
            var feature = gherkin.parse('test/resources/simple_feature_with_background.feature');
            var backgroundSteps = feature.background.steps;
            var firstScenarioSteps = feature.scenarios[0].steps;

            feature.name.should.equal('Simple feature with background');
            feature.background.steps.should.have.length(3);

            assertStepEqual(backgroundSteps[0], 'Given', 'background step 1');
            assertStepEqual(backgroundSteps[1], 'And', 'background step 2');
            assertStepEqual(backgroundSteps[2], 'And', 'background step 3');

            assertStepEqual(firstScenarioSteps[0], 'Given', 'scenario step 1');
            assertStepEqual(firstScenarioSteps[1], 'When', 'scenario step 2');
            assertStepEqual(firstScenarioSteps[2], 'Then', 'scenario step 3');
        });

        it('should parse a simple feature written in Polish', function () {
            var feature = gherkin.parse('test/resources/simple_feature_written_in_polish.feature', 'pl'),
                firstScenario = feature.scenarios[0];

            feature.name.should.equal('Logowanie do aplikacji');
            feature.scenarios.should.have.length(1);
            feature.scenario_outlines.should.have.length(0);

            assertStepEqual(firstScenario.steps[0], 'Mając', 'otwartą stronę "/login.com"');
            assertStepEqual(firstScenario.steps[1], 'Kiedy', 'wpiszesz "admin" jako nazwę');
            assertStepEqual(firstScenario.steps[2], 'I', 'wpiszesz "***" jako hasło');
            assertStepEqual(firstScenario.steps[3], 'I', 'klikniesz przycisk "Loguj"');
            assertStepEqual(firstScenario.steps[4], 'Wtedy', 'zalogujesz się jako administrator');
        });

    });

    function assertStepEqual(actualStep, keyword, name) {
        assert.equal(keyword, actualStep.keyword);
        assert.equal(name, actualStep.name);
    }

    function assertRowEqual(actualRow, expectedRow) {
        assert.deepEqual(actualRow, expectedRow);
    }

});