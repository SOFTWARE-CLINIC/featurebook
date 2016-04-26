'use strict';

var gherkin = require('../../lib/featurebook-gherkin');

describe('featurebook-gherkin', function () {

  describe('#parse', function () {

    it('should parse a feature written in Polish', function () {
      var featureAsString =
        "# language: pl\n" +
        "Funkcja: Logowanie do aplikacji\n" +
        "\n" +
        "  Scenariusz: Logowanie jako admin\n" +
        "    Mając otwartą stronę \"/login.com\"\n" +
        "    Kiedy wpiszesz \"admin\" jako nazwę\n" +
        "    I wpiszesz \"***\" jako hasło\n" +
        "    I klikniesz przycisk \"Loguj\"\n" +
        "    Wtedy zalogujesz się jako administrator\n"

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'pl');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Funkcja');
      feature.should.have.property('name', 'Logowanie do aplikacji');

      var scenarioDefinitions = feature.scenarioDefinitions;

      scenarioDefinitions[0].should.have.deep.property('type', 'Scenario');
      scenarioDefinitions[0].should.have.deep.property('keyword', 'Scenariusz');
      scenarioDefinitions[0].should.have.deep.property('name', 'Logowanie jako admin');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Mając ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'otwartą stronę "/login.com"');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'Kiedy ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'wpiszesz "admin" jako nazwę');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'I ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'wpiszesz "***" jako hasło');

      scenarioDefinitions[0].should.have.deep.property('steps[3].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[3].keyword', 'I ');
      scenarioDefinitions[0].should.have.deep.property('steps[3].text', 'klikniesz przycisk "Loguj"');

      scenarioDefinitions[0].should.have.deep.property('steps[4].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[4].keyword', 'Wtedy ');
      scenarioDefinitions[0].should.have.deep.property('steps[4].text', 'zalogujesz się jako administrator');
    });

    it('should parse a feature with a single scenario', function () {
      var featureAsString =
        "Feature: Hello World\n" +
        "\n" +
        "  Hey Ma this feature has a very nice description with image\n" +
        "\n" +
        "  ![Hello Screenshot](file://assets/images/hello_world.png)\n" +
        "\n" +
        "  Scenario: Look Ma\n" +
        "    Given I am in a browser\n" +
        "    When I make a syntax error\n" +
        "    Then stuff should be red\n";

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Hello World');

      var scenarioDefinitions = feature.scenarioDefinitions;
      scenarioDefinitions[0].should.have.property('type', 'Scenario');
      scenarioDefinitions[0].should.have.property('keyword', 'Scenario');
      scenarioDefinitions[0].should.have.property('name', 'Look Ma');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Given ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'I am in a browser');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'When ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'I make a syntax error');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'Then ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'stuff should be red');
    });

    it('should parse a feature with a single scenario outline', function () {
      var featureAsString =
        "Feature: Eating cucumbers\n" +
        "\n" +
        "  Scenario Outline: Eat\n" +
        "    Given there are <start> cucumbers\n" +
        "    When I eat <eat> cucumbers\n" +
        "    Then I should have <left> cucumbers\n" +
        "\n" +
        "  Examples:\n" +
        "    | start | eat | left |\n" +
        "    | 12    | 5   | 7    |\n" +
        "    | 20    | 5   | 15   |\n";

      var feature = gherkin.parse(featureAsString);

      feature.should.have.property('language', 'en');
      feature.should.have.property('type', 'Feature');
      feature.should.have.property('keyword', 'Feature');
      feature.should.have.property('name', 'Eating cucumbers');

      var scenarioDefinitions = feature.scenarioDefinitions;
      scenarioDefinitions[0].should.have.property('type', 'ScenarioOutline');
      scenarioDefinitions[0].should.have.property('keyword', 'Scenario Outline');
      scenarioDefinitions[0].should.have.property('name', 'Eat');

      scenarioDefinitions[0].should.have.deep.property('steps[0].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[0].keyword', 'Given ');
      scenarioDefinitions[0].should.have.deep.property('steps[0].text', 'there are <start> cucumbers');

      scenarioDefinitions[0].should.have.deep.property('steps[1].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[1].keyword', 'When ');
      scenarioDefinitions[0].should.have.deep.property('steps[1].text', 'I eat <eat> cucumbers');

      scenarioDefinitions[0].should.have.deep.property('steps[2].type', 'Step');
      scenarioDefinitions[0].should.have.deep.property('steps[2].keyword', 'Then ');
      scenarioDefinitions[0].should.have.deep.property('steps[2].text', 'I should have <left> cucumbers');

      scenarioDefinitions[0].examples[0].should.have.property('type', 'Examples');
      scenarioDefinitions[0].examples[0].should.have.property('keyword', 'Examples');

      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[0].value', 'start');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[1].value', 'eat');
      scenarioDefinitions[0].examples[0].tableHeader.should.have.deep.property('cells[2].value', 'left');

      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[0].value', '12');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[1].value', '5');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[0].cells[2].value', '7');

      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].type', 'TableRow');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[0].value', '20');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[1].value', '5');
      scenarioDefinitions[0].examples[0].tableBody.should.have.deep.property('[1].cells[2].value', '15');
    });

  });

});
