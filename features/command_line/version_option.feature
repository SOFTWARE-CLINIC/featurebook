Feature: `--version` option

  Use the `--version` option to display currently installed version of FeatureBook.

  Scenario: Use `--version` option to display currently installed version
    Given I installed FeatureBook version "0.0.12"
    When I run `featurebook --version`
    Then the command should succeed with output like:
    """
    0.0.12
    """ 
