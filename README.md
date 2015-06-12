FeatureBook
===========

[![Build Status](https://travis-ci.org/SOFTWARE-CLINIC/featurebook.svg)](https://travis-ci.org/SOFTWARE-CLINIC/featurebook)
[![CircleCI](https://img.shields.io/circleci/project/SOFTWARE-CLINIC/featurebook/master.svg?style=shield)](https://circleci.com/gh/SOFTWARE-CLINIC/featurebook)
[![npm version](https://badge.fury.io/js/featurebook.svg)](http://badge.fury.io/js/featurebook)
[![dependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook)
[![devDependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook/dev-status.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook#info=devDependencies)

[![Join the chat at https://gitter.im/SOFTWARE-CLINIC/featurebook](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SOFTWARE-CLINIC/featurebook?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub issues](https://img.shields.io/github/issues/SOFTWARE-CLINIC/featurebook.svg)](https://github.com/SOFTWARE-CLINIC/featurebook/issues)
[![License](http://img.shields.io/:license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

* [Introduction](#introduction)
* [Usage](#usage)
* [Specification Format](#specification-format)
* [Running Tests](#running-tests)
* [Releasing](#releasing)
* [License](#license)

## Introduction

FeatureBook is a command line tool (and [Node.js](https://nodejs.org) library) for generating beautiful system
specifications from [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) source files.

Here is an [example](https://github.com/SOFTWARE-CLINIC/featurebook-example) system specification.

![Demo](/README/featurebook_demo.png)

## Usage

FeatureBook can be installed from [npm](https://www.npmjs.com):

```shell
$ npm install featurebook -g
```

You can serve the current directory as a system specification:

```shell
$ featurebook serve --port 3000
```

Or simply build the static website:

```shell
$ featurebook build --output-dir ~/book
```

To list all available commands and options:

```
$ featurebook --help

  Usage: featurebook [options] [command]


  Commands:

    serve [options] [source-dir]  serve [source-dir] as a system specification
    build [options] [source-dir]  build a static website from [source-dir]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

Or just display help for a given command:

```
$ featurebook serve --help

  Usage: serve [options] [source-dir]

  serve [source-dir] as a system specification

  Options:

    -h, --help         output usage information
    -p, --port <port>  port on which to listen to (defaults to 3000)
```

## Specification Format

A system specification is a directory containing:

* Gherkin source files
* The `assets` subdirectory for images and videos that you can refer to from within the Gherkin source files
* An optional `featurebook.json` descriptor

```
my_specification
|-- assets
|   |-- images
|   |   |-- picture_is_worth_1000_words.png
|   |   `-- two_pictures_are_worth_2000_words.png
|   `-- videos
|       |-- video_is_worth_2000_words.mp4
|       `-- two_videos_are_worth_4000_words.mp4
|-- webapp
|   `-- admin
|       |-- users
|       |   |-- list_users.feature
|       |   `-- register_user.feature
|       `-- projects
|           |-- list_projects.feature
|           |-- create_project.feature
|           `-- clone_project.feature
`-- featurebook.json
```

There are a few conventions:

* Single Gherkin source file contains a description of a single feature
* Source files have `.feature` extension
* A feature name displayed in the navigation tree is inferred from the corresponding Gherkin source file name, i.e. it's
  a titleized base file name. For example, `list_users.feature` becomes `List Users`.

A Gherkin source file usually looks like this:

```gherkin
Feature: Some terse yet descriptive text of what is desired

  Textual *description* of the business value of this feature
  Business rules that govern the scope of the feature
  Any additional information and ~~formatting~~ that will make
  the feature easier to read and **understand**

  ![Picture alt text](/assets/images/picture_is_worth_1000_words.png)

  Scenario: Some determinable business situation
    Given some precondition
      And some other precondition
     When some action by the actor
      And some other action
      And yet another action
     Then some testable outcome is achieved
      And something else we can check happens too

  Scenario: A different situation
    ...
```

Note that you can use [Markdown](http://en.wikipedia.org/wiki/Markdown) to describe your features and scenarios.

### featurebook.json

The `featurebook.json` contains metadata about your system specification such as: title, version, and authors:

```javascript
{
  "title": "My System Specification",
  "version": "1.0.0",
  "authors": [
    {
      "firstName": "Henryk",
      "lastName": "Sienkiewicz",
      "email": "hsienkiewicz@gmail.com",
      "twitter", "hsienkiewicz"
    }
  ],
  "language": "pl"
}
```

Gherkin's grammar exists in different flavours for many [spoken languages](https://github.com/cucumber/cucumber/wiki/Spoken-languages).
To specify and use the keywords in your own language, you must set the `language` property to the corresponding language
[code](https://github.com/cucumber/gherkin/blob/master/lib/gherkin/i18n.json).

## Running Tests

```shell
$ npm install -g bower mocha karma-cli
$ npm install
```

```shell
$ mocha --reporter spec --timeout 1500 test/lib
```

```shell
$ cd public && bower install && cd ..
```

```shell
$ karma start test/public/karma.conf.js
```

## Releasing

Select a branch that contains the code you want to release. Usually, you'll want to release against the
[master](https://github.com/SOFTWARE-CLINIC/featurebook/tree/master) branch, unless you're releasing a beta version.

Let's assume that the latest version of the `featurebook` package is `0.0.6` (see the `version` property in
[package.json](/package.json)).

```shell
$ git clone https://github.com/SOFTWARE-CLINIC/featurebook.git && cd featurebook
```

To bump the path|minor|major version number and write the new data back to [package.json](/package.json):

```shell
$ npm version patch|minor|major -m "[npm] prepare release %s"
v0.0.7
```

Note that this command will also create a version commit and tag named `v0.0.7`, and fail if the cloned repository is
not clean.

To push the commit and the `v0.0.7` tag to the `origin` repository:

```shell
$ git push -u origin master
$ git push -u origin v0.0.7
```

To publish to the public registry:

```shell
$ git checkout tags/v0.0.7
$ npm publish
```

## License

Code is under the [Apache Licence, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).
