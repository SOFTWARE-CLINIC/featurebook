Feature: Simple feature with doc string

  Background:
    Given the home page with Markdown body
    """
    Awesome Blog
    ============
    Welcome to Awesome Blog!
    """

  Scenario: Some scenario

    Given a blog post named "Random" with Markdown body
    """
    Some Title, Eh?
    ===============
    Here is the first paragraph of my blog post.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    """
    And a comment with Markdown body
    """
    This is awesome dude!
    """
    When I open it in a web browser
    Then it should be displayed as a nicely formatted HTML page