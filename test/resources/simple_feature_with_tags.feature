@FeatureTag1 @FeatureTag2
Feature: Simple feature with tags

  A simple feature to make sure we can parse tags.

  @Scenario1Tag1 @Scenario1Tag2 @Scenario1Tag3
  Scenario: Scenario 1
    Given scenario 1 step 1

  @Scenario2Tag1
  Scenario: Scenario 2
    Given scenario 2 step 1

  @ScenarioOutlineTag1
  Scenario Outline: Scenario Outline 1
    Given a variable <foo>
  Examples:
    | foo |
    | bar |
