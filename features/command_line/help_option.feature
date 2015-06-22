Feature: `--help` option

  Use the `--help` option to display available commands and options.

  Background:
    Given I installed FeatureBook with `npm install featurebook -g`

  Scenario: Use `--help` option to display available commands and options
    When I run `featurebook --help`
    Then the command should succeed with output like:
    """
  Usage: featurebook [options] [command]

  Commands:

    serve [options] [source-dir]  serve source-dir as a system specification
    build [options] [source-dir]  build a static website from source-dir

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    """

  Scenario: Use `serve --help` to display help for the `serve` command
    When I run `featurebook serve --help`
    Then the command should succeed with output like:
    """
  Usage: serve [options] [source-dir]

  serve source-dir as a system specification

  Options:

    -h, --help         output usage information
    -p, --port <port>  port on which to listen to (defaults to 3000)

    """

  Scenario: Use `build --help` to display help for the `build` command
    When I run `featurebook build --help`
    Then the command should succeed with output like:
    """
  Usage: build [options] [source-dir]

  build a static website from source-dir

  Options:

    -h, --help                     output usage information
    -o, --output-dir <output-dir>  directory where the static website will be generated (defaults to dist)
    """
