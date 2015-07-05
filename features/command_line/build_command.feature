Feature: `build` command

  Use the `build` command to build a specification document in a given format.

  Background:
    Given a directory with Gherkin source files

  Scenario: `--format=html` option
    When I run `featurebook build --format=html`
    Then the HTML document is accessible at `dist/html/specification.html`

  Scenario: `--format=pdf` option
    When I run `featurebook build --format=pdf`
    Then the PDF document is accessible at `dist/pdf/specification.pdf`

  Scenario: `--format=docx` option
    When I run `featurebook build --format=docx`
    Then the DOCX document is accessible at `dist/docx/specification.docx`