Feature: Summary

**In order to** describe my specification **As a** writer **I want to** be able
to provide some description that is pertinent to all features and scenarios.

We do recommend grouping feature files related to the same functionality into
subfolders. Therefore a writer should be able to summarize subfolders.

  Background:
    Given a directory with Gherkin source files

  Scenario: Provide summary for the whole specification (directory)
    Given the "SUMMARY.md" in the root directory with Markdown
    """
    This is my specification description.
    """
    When I serve the directory as a system specification
    And open it in my web browser
    Then the summary should be displayed on the home page

  Scenario: Provide summary for a section (subdirectory)
    Given the "SUMMARY.md" in the "authentication" subdirectory with Markdown
    """
    Authentication
    ==============
    The Markdown-powered summary of the `Authentication` section
    """
    And the "SUMMARY.md" in the "admin" subdirectory with Markdown
    """
    Admin
    =====
    Summary of the `Admin` section
    """
    When I serve the directory as a system specification
    And open it in my web browser
    And click the "Authentication" node in the features tree
    Then the summary from "authentication/SUMMARY.md" should be parsed and displayed
    When I click the "Admin" node in the features tree
    Then the summary from "admin/SUMMARY.md" should be parsed and displayed
