Feature: Simple feature with scenario outline and multiline table argument

  To make sure we can parse such a feature.

  Scenario Outline: Getting drinks for free
    Given the machine has the following choices
      | brand  |
      | cola   |
      | sprite |
    When I choose <choice>
    Then the output tray is <empty>
    And the machine delivers a can of <brand> to the output tray

  Examples:
    | choice | empty     | brand  |
    | cola   | not empty | cola   |
    | sprite | not empty | sprite |
