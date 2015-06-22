var gherkin = require('../../lib/gherkin-model'),
    assert = require('assert'),
    should = require('chai').should();

describe('gherkin-model', function () {

    describe('#fromFileSync', function () {

        it('should parse a simple feature with a single scenario', function () {
            var feature = gherkin.fromFileSync('test/resources/hello_world.feature'),
                firstScenario = feature.scenarios[0];

            feature.name.should.equal('Hello World');

            feature.scenarios.should.have.length(1);

            assert.equal(firstScenario.name, 'Look Ma');
            assert.equal(firstScenario.steps.length, 3);

            assertStepEqual(firstScenario.steps[0], 'Given', 'I am in a browser');
            assertStepEqual(firstScenario.steps[1], 'When', 'I make a syntax error');
            assertStepEqual(firstScenario.steps[2], 'Then', 'stuff should be red');
        });

        it('should parse a simple feature with a single scenario outline', function () {
            var feature = gherkin.fromFileSync('test/resources/eating_cucumbers.feature'),
                firstScenarioOutline = feature.scenarios[0];

            feature.name.should.equal('Eating cucumbers');
            feature.scenarios.should.have.length(1);

            assert.equal(firstScenarioOutline.name, 'Eat');
            assert.equal(firstScenarioOutline.steps.length, 3);

            assertStepEqual(firstScenarioOutline.steps[0], 'Given', 'there are <start> cucumbers');
            assertStepEqual(firstScenarioOutline.steps[1], 'When', 'I eat <eat> cucumbers');
            assertStepEqual(firstScenarioOutline.steps[2], 'Then', 'I should have <left> cucumbers');

            assert.equal(firstScenarioOutline.examples.dataTable.length, 3);
            assertRowEqual(firstScenarioOutline.examples.dataTable[0], ['start', 'eat', 'left']);
            assertRowEqual(firstScenarioOutline.examples.dataTable[1], [12, 5, 7]);
            assertRowEqual(firstScenarioOutline.examples.dataTable[2], [20, 5, 15]);
        });

        it('should parse a simple feature with the background', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_with_background.feature');
            var backgroundSteps = feature.background.steps;
            var firstScenarioSteps = feature.scenarios[0].steps;

            feature.name.should.equal('Simple feature with background');

            feature.background.name.should.equal('a background can have name');
            feature.background.description.should.equal('\nAs well as description');
            feature.background.steps.should.have.length(3);

            assertStepEqual(backgroundSteps[0], 'Given', 'background step 1');
            assertStepEqual(backgroundSteps[1], 'And', 'background step 2');
            assertStepEqual(backgroundSteps[2], 'And', 'background step 3');

            assertStepEqual(firstScenarioSteps[0], 'Given', 'scenario step 1');
            assertStepEqual(firstScenarioSteps[1], 'When', 'scenario step 2');
            assertStepEqual(firstScenarioSteps[2], 'Then', 'scenario step 3');
        });

        it('should parse a simple feature written in Polish', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_written_in_polish.feature', {language: 'pl'}),
                firstScenario = feature.scenarios[0];

            feature.name.should.equal('Logowanie do aplikacji');
            feature.scenarios.should.have.length(1);

            assertStepEqual(firstScenario.steps[0], 'Mając', 'otwartą stronę "/login.com"');
            assertStepEqual(firstScenario.steps[1], 'Kiedy', 'wpiszesz "admin" jako nazwę');
            assertStepEqual(firstScenario.steps[2], 'I', 'wpiszesz "***" jako hasło');
            assertStepEqual(firstScenario.steps[3], 'I', 'klikniesz przycisk "Loguj"');
            assertStepEqual(firstScenario.steps[4], 'Wtedy', 'zalogujesz się jako administrator');
        });

        it('should parse a simple feature with data tables', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_with_data_tables.feature'),
                firstScenario = feature.scenarios[0];

            feature.name.should.equal('Metadata');

            firstScenario.name.should.equal('Provide information about authors and contributors');

            firstScenario.steps[0].dataTable[0].should.have.members(['firstName', 'lastName', 'email']);
            firstScenario.steps[0].dataTable[1].should.have.members(['Henryk', 'Sienkiewicz', 'hsienkiewicz@gmail.com']);
            firstScenario.steps[0].dataTable[2].should.have.members(['Eliza', 'Orzeszkowa', 'eorzeszkowa@gmail.com']);

            firstScenario.steps[1].dataTable[0].should.have.members(['firstName', 'lastName', 'email']);
            firstScenario.steps[1].dataTable[1].should.have.members(['Juliusz', 'Slowacki', 'jslowacki@gmail.com']);
        });

        it('should parse a simple feature with doc strings', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_with_doc_strings.feature'),
                firstScenario = feature.scenarios[0];

            feature.background.steps[0].docString.should.equal('Awesome Blog\n============\nWelcome to Awesome Blog!');

            firstScenario.steps[0].docString.should.equal(
                'Some Title, Eh?\n===============\nHere is the first paragraph of my blog post.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.');

            firstScenario.steps[1].docString.should.equal('This is awesome dude!');
        });

        it('should parse a simple feature with tags', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_with_tags.feature');

            feature.tags.should.have.members(['@FeatureTag1', '@FeatureTag2']);

            feature.scenarios[0].tags.should.have.members(['@Scenario1Tag1', '@Scenario1Tag2', '@Scenario1Tag3']);
            feature.scenarios[1].tags.should.have.members(['@Scenario2Tag1']);
            feature.scenarios[2].tags.should.have.members(['@ScenarioOutlineTag1']);
        });

        it('should parse a simple feature with scenario outline and data table', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_with_scenario_outline_and_data_table.feature'),
                firstScenarioOutline = feature.scenarios[0],
                firstStep = firstScenarioOutline.steps[0];

            feature.name.should.equal('Simple feature with scenario outline and data table');

            assertStepEqual(firstStep, 'Given', 'the machine has the following choices');

            firstStep.dataTable[0].should.have.members(['brand']);
            firstStep.dataTable[1].should.have.members(['cola']);
            firstStep.dataTable[2].should.have.members(['sprite']);

            firstScenarioOutline.examples.dataTable[0].should.have.members(['choice', 'empty', 'brand']);
            firstScenarioOutline.examples.dataTable[1].should.have.members(['cola', 'not empty', 'cola']);
            firstScenarioOutline.examples.dataTable[2].should.have.members(['sprite', 'not empty', 'sprite']);
        });

        it('should preserve order when parsing scenarios and scenario outlines', function () {
            var feature = gherkin.fromFileSync('test/resources/simple_feature_with_scenarios_and_scenario_outlines.feature');

            feature.scenarios[0].name.should.equal('first outline');
            feature.scenarios[1].name.should.equal('first scenario');
            feature.scenarios[2].name.should.equal('second outline');
            feature.scenarios[3].name.should.equal('second scenario');
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