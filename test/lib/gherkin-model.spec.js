var featurebook = require('featurebook-api');
var chai = require('chai');
var should = chai.should();
var path = require('path');

describe('gherkin-model', function () {

  var FEATURES_DIR = 'test/resources/features';

  describe('#readFeatureSync', function () {

    it('should parse a simple feature with the background', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_background.feature'));
      var backgroundSteps = feature.background.steps;
      var firstScenarioSteps = feature.scenarioDefinitions[0].steps;

      feature.name.should.equal('Simple feature with background');

      feature.background.name.should.equal('a background can have name');
      feature.background.description.should.equal('  As well as description');
      feature.background.steps.should.have.length(3);

      assertStepEqual(backgroundSteps[0], 'Given ', 'background step 1');
      assertStepEqual(backgroundSteps[1], 'And ', 'background step 2');
      assertStepEqual(backgroundSteps[2], 'And ', 'background step 3');

      assertStepEqual(firstScenarioSteps[0], 'Given ', 'scenario step 1');
      assertStepEqual(firstScenarioSteps[1], 'When ', 'scenario step 2');
      assertStepEqual(firstScenarioSteps[2], 'Then ', 'scenario step 3');
    });

    it('should parse a simple feature with data tables', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_data_tables.feature')),
        firstScenarioDefinition = feature.scenarioDefinitions[0];

      feature.name.should.equal('Metadata');

      firstScenarioDefinition.name.should.equal('Provide information about authors and contributors');

      assertTableDataEqual(firstScenarioDefinition.steps[0].argument.rows, [
        ['firstName', 'lastName', 'email'],
        ['Henryk', 'Sienkiewicz', 'hsienkiewicz@gmail.com'],
        ['Eliza', 'Orzeszkowa', 'eorzeszkowa@gmail.com']
      ]);

      assertTableDataEqual(firstScenarioDefinition.steps[1].argument.rows, [
        ['firstName', 'lastName', 'email'],
        ['Juliusz', 'Slowacki', 'jslowacki@gmail.com']
      ]);
    });

    it('should parse a simple feature with doc strings', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_doc_strings.feature')),
        firstScenario = feature.scenarioDefinitions[0];

      feature.background.steps[0].argument.content.should.equal('Awesome Blog\n============\nWelcome to Awesome Blog!');

      firstScenario.steps[0].argument.content.should.equal(
        'Some Title, Eh?\n===============\nHere is the first paragraph of my blog post.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.');

      firstScenario.steps[1].argument.content.should.equal('This is awesome dude!');
    });

    it('should parse a simple feature with tags', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_tags.feature'));

      feature.tags[0].name.should.equal('@FeatureTag1');
      feature.tags[1].name.should.equal('@FeatureTag2');

      feature.scenarioDefinitions[0].tags[0].name.should.equal('@Scenario1Tag1');
      feature.scenarioDefinitions[0].tags[1].name.should.equal('@Scenario1Tag2');
      feature.scenarioDefinitions[0].tags[2].name.should.equal('@Scenario1Tag3');

      feature.scenarioDefinitions[1].tags[0].name.should.equal('@Scenario2Tag1');
      feature.scenarioDefinitions[2].tags[0].name.should.equal('@ScenarioOutlineTag1');
    });

    it('should parse a simple feature with scenario outline and data table', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_scenario_outline_and_data_table.feature')),
        firstScenarioDefinition = feature.scenarioDefinitions[0],
        firstStep = firstScenarioDefinition.steps[0];

      feature.name.should.equal('Simple feature with scenario outline and data table');

      assertStepEqual(firstStep, 'Given ', 'the machine has the following choices');

      assertTableDataEqual(firstStep.argument.rows, [
        ['brand'],
        ['cola'],
        ['sprite']
      ]);

      assertTableHeaderEqual(firstScenarioDefinition.examples[0].tableHeader, ['choice', 'empty', 'brand']);
      assertTableDataEqual(firstScenarioDefinition.examples[0].tableBody, [
        ['cola', 'not empty', 'cola'],
        ['sprite', 'not empty', 'sprite']
      ]);
    });

    it('should preserve order when parsing scenarios and scenario outlines', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_scenarios_and_scenario_outlines.feature'));

      feature.scenarioDefinitions[0].name.should.equal('first outline');
      feature.scenarioDefinitions[1].name.should.equal('first scenario');
      feature.scenarioDefinitions[2].name.should.equal('second outline');
      feature.scenarioDefinitions[3].name.should.equal('second scenario');
    });

    it('should parse a simple feature with scenario outline and two examples', function () {
      var feature = featurebook.readFeatureSync(path.join(FEATURES_DIR, 'simple_feature_with_scenario_outline_and_two_examples.feature')),
        firstScenario = feature.scenarioDefinitions[0];

      firstScenario.examples[0].name.should.equal('Successful withdrawal');
      assertTableHeaderEqual(firstScenario.examples[0].tableHeader, ['Balance', 'Withdrawal', 'Outcome', 'Remaining']);
      assertTableDataEqual(firstScenario.examples[0].tableBody, [
        ['$500', '$50', 'receive $50 cash', '$450'],
        ['$500', '$100', 'receive $100 cash', '$400']
      ]);

      firstScenario.examples[1].name.should.equal('Attempt to withdraw too much');
      assertTableHeaderEqual(firstScenario.examples[1].tableHeader, ['Balance', 'Withdrawal', 'Outcome', 'Remaining']);
      assertTableDataEqual(firstScenario.examples[1].tableBody, [
        ['$100', '$200', 'see an error message', '$100'],
        ['$0', '$50', 'see an error message', '$0']
      ]);
    });

  });

  function assertStepEqual(actualStep, expectedKeyword, expectedText) {
    actualStep.keyword.should.equal(expectedKeyword);
    actualStep.text.should.equal(expectedText);
  }

  function assertTableHeaderEqual(tableHeader, expectedCellValues) {
    tableHeader.cells.map(cellValue).should.deep.equal(expectedCellValues);

    function cellValue(cell) {
      return cell.value;
    }
  }

  function assertTableDataEqual(tableData, expectedCellValues) {
    tableData.map(cellValue).should.deep.equal(expectedCellValues);

    function cellValue(row) {
      return row.cells.map(function (cell) {
        return cell.value;
      });
    }
  }

});
