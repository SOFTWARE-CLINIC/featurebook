Feature: Navigation

  Scenario Outline: Add a reference to another feature
    Given the description of <keyword> with Markdown:
    """
    This is a [link](path/to/some/other.feature).
    """
    When I serve the directory as a system specification
    And open it in my web browser
    Then the reference to the `path/to/some/other.feature` should be rendered as a hyperlink with the `link` text
    And clicking the link should open that feature in the same web browser tab

  Examples:
    | keyword          |
    | feature          |
    | scenario         |
    | scenario outline |
    | background       |
    | examples         |