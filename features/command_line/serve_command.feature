Feature: `serve` command

  Use the `serve` command to serve a [directory](format/directory.feature) as a system specification.

  Background:
    Given a directory with Gherkin source files

  Scenario: `--port` option
    When I run `featurebook --port 4000`
    Then I can access specification at "http://localhost:4000"