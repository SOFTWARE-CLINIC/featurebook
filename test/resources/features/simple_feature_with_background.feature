Feature: Simple feature with background

  A simple feature to make sure we can parse the `Background` keyword.

  Background: a background can have name

  As well as description

    Given background step 1
    And background step 2
    And background step 3

  Scenario: Scenario 1
    Given scenario step 1
    When scenario step 2
    Then scenario step 3
