FeatureBook
===========

[![Build Status](https://travis-ci.org/SOFTWARE-CLINIC/featurebook.svg)](https://travis-ci.org/SOFTWARE-CLINIC/featurebook)
[![npm version](https://badge.fury.io/js/featurebook.svg)](http://badge.fury.io/js/featurebook)
[![dependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook)
[![Code Climate](https://codeclimate.com/github/SOFTWARE-CLINIC/featurebook/badges/gpa.svg)](https://codeclimate.com/github/SOFTWARE-CLINIC/featurebook)
[![Test Coverage](https://codeclimate.com/github/SOFTWARE-CLINIC/featurebook/badges/coverage.svg)](https://codeclimate.com/github/SOFTWARE-CLINIC/featurebook/coverage)
[![Join the chat at https://gitter.im/SOFTWARE-CLINIC/featurebook](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SOFTWARE-CLINIC/featurebook?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* [Introduction](#introduction)
* [Rationale](#rationale)
* [Usage](#usage)
* [Specification format](#specification-format)
 * [Gherkin source files](#gherkin-source-files)
 * [featurebook.json](#featurebookjson)
 * [SUMMARY.md](#summarymd)
* [Public API](#public-api)
* [Development environment](#development-environment)
* [Contributing](#contributing)
* [License](#license)

## Introduction

FeatureBook is a command line tool (and [Node.js](https://nodejs.org) library) for generating beautiful system
specifications from [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) source files.
[Here](https://github.com/SOFTWARE-CLINIC/featurebook-examples) are the example specifications you can play with.

![Screenshot 1](/README/featurebook_screenshot_1.png)

![Screenshot 2](/README/featurebook_screenshot_2.png)

## Rationale

Even in 2015, there are development teams that don't know how to apply
[Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development)) or some other
[Agile methodology](https://en.wikipedia.org/wiki/Agile_software_development) in day-to-day business. Believe it or not
but that's the matter of fact. Doing just daily meetings at 9 or 10 a.m. doesn't really mean that you're in the Agile
mode. With business analysts or other business folks it's even worse. Most of them haven't heard the buzzwords Scrum or
Agile. Therefore, it's not surprising that so many people undervalue specifying unambiguously what the system is
supposed to do. Instead, we are given 200 pages Microsoft Word documents that, after a short while, become a maintenance
nightmare and complete mess to read and understand.

FeatureBook is here to help you creating living documentation from Gherkin source files (suitable for DEV or QA guys)
and publish it in a format accessible for people who may not know how to work with source control systems or who are not
interested in seeing all of the source code. We bring the fun back into writing documentation!

What's more, the authors of FeatureBook are ready to help you writing system specification for real-life complex systems
and applications. If it's not a top secret mission critical beast, feel free to submit an issue where we can discuss
the details publicly. Otherwise let's meet in person in Warsaw, Poland.
If you buy the tickets and we like the destination, we'll fly over and do the training for you and your team!
(Especially we're looking forward to seeing Albania one day.) The outcome would be a FeatureBook tailored for your
system.

## Usage

Before installing FeatureBook, you will need the following:

* Node.js v0.10.x+
* [npm](https://www.npmjs.com) (which comes bundled with Node) v2.1.0+

FeatureBook can be installed (or updated if it's already installed) from npm:

```shell
$ npm install -g featurebook
```

You can serve the current directory as a system specification:

```shell
$ featurebook serve --port 3000
```

Or simply build a PDF document:

```shell
$ featurebook pdf
```

To list all available commands and options:

```
$ featurebook --help

  Usage: featurebook [options] [command]


  Commands:

    serve [options] [spec-dir]  serve <spec-dir> as a system specification
    pdf [options] [spec-dir]    build the specification PDF document
    html [options] [spec-dir]   build the specification HTML document

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

To display help for a given command:

```shell
$ featurebook serve --help

  Usage: serve [options] [spec-dir]

  serve <spec-dir> as a system specification

  Options:

    -h, --help         output usage information
    -p, --port <port>  port on which to listen to (defaults to 3000)
```

FeatureBook can be used with [Gulp](https://github.com/SOFTWARE-CLINIC/featurebook-gulp-example) to generate
a system specification as part of your continuous integration process.

## Specification format

A system specification is a directory containing:

* Gherkin source files organized into subdirectories
* The `assets` directory for images and videos that you can refer to from within the Gherkin source files
  as well as summary descriptors
* Optional directory descriptors (`SUMMARY.md`)
* An optional specification descriptor (`featurebook.json`)

```
|-- assets
|   `-- images
|       |-- analytics.png
|       |-- lock_box.jpg
|       `-- time_tracking.png
|-- administrating
|   |-- employee_management.feature
|   |-- project_management.feature
|   `-- reporting.feature
|-- authenticating
|   |-- admin_authentication.feature
|   |-- employee_authentication.feature
|   `-- SUMMARY.md
|-- non_functional
|   `-- service_level_agreement.feature
|-- time_tracking.feature
|-- unparsable.feature
|-- SUMMARY.md
`-- featurebook.json
```

There are a few conventions:

* A single Gherkin source file contains a description of a single feature.
* Source files have the `.feature` extension.
* A feature name displayed in the navigation tree is inferred from the corresponding Gherkin file name, i.e. it's
  a titleized base file name. For example, `service_level_agreement.feature` becomes **Service level agreement**.
* You can use [Markdown](http://en.wikipedia.org/wiki/Markdown) in Gherkin source files and directory descriptors (`SUMMARY.md`).
  The FeatureBook's Markdown parser recognizes the `feature://` and `asset://` URL schemas so you can cross reference features
  and images contained in the `assets` directory.

### Gherkin source files

A Gherkin source file usually looks like this:

```gherkin
Feature: Service level agreement

  Keeping our customers happy is really important. This is why we cater for
  the highest availabilty.

  ![Analytics](asset://assets/images/analytics.png)

  Scenario: New account creation
    Given there are "100000" users registered on the system
    When I create a new account
    Then I should be taken to my dashboard within "5" ms

  Scenario: Homepage page access
    Given "1000" users are hitting the homepage simultaneously
    Then each user should get a response within "2" ms
```

### featurebook.json

The `featurebook.json` contains specification's metadata, i.e. title, version, authors, and contributors.

```javascript
{
  "title": "Time Tracking",
  "version": "1.0.0",
  "authors": [
    {
      "firstName": "Richard",
      "lastName": "Feynman",
      "email": "rfeynman@gmail.com"
    }
  ],
  "contributors": [
    {
      "firstName": "Isaac",
      "lastName": "Newton",
      "email": "inewton@gmail.com"
    }
  ]
}
```

### SUMMARY.md

Typically, this is a textual description of features and scenarios contained in a given directory.
The summary of the root specification directory should give a general ovierview and reading guidelines.

```
# Time Tracking

Best time tracking system for a small business. A simple online timer with a powerful timesheet calculator.

![Time tracking](asset://assets/images/time_tracking.png)

It is recommended to start reading the [admin authentication](feature://authenticating/admin_authentication.feature) feature.
```

## Public API

Most of the time, you will be using FeatureBook directly from command line. You can, however, call FeatureBook
programmatically from your Node.js module. [Here](https://github.com/SOFTWARE-CLINIC/featurebook/wiki/Public-API) is the
public API.

## Development environment

> To try out the latest development version clone this repository and [link](https://docs.npmjs.com/cli/link) the featurebook package:
> ```
> $ git clone https://github.com/SOFTWARE-CLINIC/featurebook.git && cd featurebook && npm link
> ```

### npm packages

![FeatureBook modules](/README/featurebook-modules.png)

## Contributing

You wanna contribute to FeatureBook? That is truly great!
[Here](https://github.com/SOFTWARE-CLINIC/featurebook/wiki/Contributing) are some tips to get you started.

## License

Code is under the [Apache Licence, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).
