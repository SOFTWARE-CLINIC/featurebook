Feature: Metadata

  Scenario: Provide information about authors and contributors
    Given the "authors" property in "featurebook.json" contains the following authors
      | firstName | lastName    | email                  |
      | Henryk    | Sienkiewicz | hsienkiewicz@gmail.com |
      | Eliza     | Orzeszkowa  | eorzeszkowa@gmail.com  |
    And the "contributors" property in "featurebook.json" contains the following contributors
      | firstName | lastName | email               |
      | Juliusz   | Slowacki | jslowacki@gmail.com |
    When I server the directory as a system specification
    And open it in my Web browser
    Then the authors should be listed beneath the specification's title
    And the contributors should be listed beneath the authors
