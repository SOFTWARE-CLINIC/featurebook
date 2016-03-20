Feature: Metadata

**In order to** describe my specification **As a** writer **I want to** be able to provide some metadata about my work.

  Background:
    Given a directory with Gherkin source files
    And  "featurebook.json" descriptor

  Scenario: Provide information about authors and contributors
    Given the "authors" property in "featurebook.json" contains the following authors
      | firstName | lastName    | email                  |
      | Henryk    | Sienkiewicz | hsienkiewicz@gmail.com |
      | Eliza     | Orzeszkowa  | eorzeszkowa@gmail.com  |
    And the "contributors" property in "featurebook.json" contains the following contributors
      | firstName | lastName | email               |
      | Juliusz   | Slowacki | jslowacki@gmail.com |
    When I serve the directory as a system specification
    And open it in my web browser
    Then the authors should be listed beneath the specification's title
    And the contributors should be listed beneath the authors
