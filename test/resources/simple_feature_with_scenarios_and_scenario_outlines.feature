Feature: Simple feature with scenarios and scenario outlines

  To make sure we can preserve the order.

  Scenario Outline: first outline
    Given some variable <foo>
  Examples:
    | foo |
    | bar |

  Scenario: first scenario
    Given some step goes here

  Scenario Outline: second outline
    Given some other variable <bar>
  Examples:
    | bar |
    | foo |

  Scenario: second scenario
    Given some other step goes here