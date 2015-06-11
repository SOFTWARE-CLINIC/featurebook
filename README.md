FeatureBook
===========

[![Build Status](https://travis-ci.org/SOFTWARE-CLINIC/featurebook.svg)](https://travis-ci.org/SOFTWARE-CLINIC/featurebook)
[![npm version](https://badge.fury.io/js/featurebook.svg)](http://badge.fury.io/js/featurebook)
[![dependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook)
[![devDependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook/dev-status.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook#info=devDependencies)
[![License](http://img.shields.io/:license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

* [Introduction](#introduction)
* [Usage](#usage)
* [Book Format](#book-format)
* [Running Tests](#running-tests)
* [Releasing](#releasing)
* [License](#license)

## Introduction

FeatureBook is a command line tool (and [Node.js](https://nodejs.org) library) for generating beautiful system
specifications from [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) source files.

Here is an [example](https://github.com/SOFTWARE-CLINIC/featurebook-example) system specification.

![Demo](/README/featurebook_demo.png)

## Usage

FeatureBook can be installed from [npm](https://www.npmjs.com) using:

```shell
$ npm install featurebook -g
```

You can serve the current directory as a system specification using:

```shell
$ featurebook serve --port 3000
```

Or simply build the static website using:

```shell
$ featurebook build --output-dir ~/book
```

## Book Format

A system specification is a directory containing Gherkin source files, the `assets` subdirectory containing images and
videos that you can refer to within a feature description, and an optional `featurebook.json` descriptor.

There are a few conventions:

* Single Gherkin source file contains a description of a single feature;
* Source files have `.feature` extension;


A Gherkin source file usually looks like this:

```gherkin
Feature: Some terse yet descriptive text of what is desired

  Textual description of the business value of this feature
  Business rules that govern the scope of the feature
  Any additional information and **formatting** that will make the feature easier to read and __understand__

  ![Picture from brainstorming sessions](/assets/images/picture_is_worth_1000_words.png)

  [![Video from our last demo](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

  Scenario: Some determinable business situation
    Given some precondition
      And some other precondition
     When some action by the actor
      And some other action
      And yet another action
     Then some testable outcome is achieved
      And something else we can check happens too

  Scenario: A different situation
```

Note that you can use [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) to describe
your features and scenarios.

### featurebook.json

The `featurebook.json` contains metadata about the system specification such as: title, version, and authors:

```javascript
{
  "title": "My System Specification",
  "version": "1.0.0",
  "authors": [],
  "language": "en|pl"
}
```

## Running Tests

```shell
$ npm install -g bower mocha karma-cli
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

Select a branch that contains the code you want to release. Usually, you'll want to release against the [master](https://github.com/SOFTWARE-CLINIC/featurebook/tree/master) branch,
unless you're releasing a beta version.

Let's assume that the latest version of the `featurebook` package is `0.0.6` (see the `version` property in [package.json](/package.json)).

```shell
$ git clone https://github.com/SOFTWARE-CLINIC/featurebook.git && cd featurebook
```

To bump the path|minor|major version number and write the new data back to [package.json](/package.json):

```shell
$ npm version patch|minor|major -m "[npm] prepare release %s"
v0.0.7
```

Note that this command will also create a version commit and tag named `v0.0.7`, and fail if the cloned repository is not clean.

To push the commit and the `v0.0.7` tag to the `origin` repository:

```shell
$ git push -u origin master
$ git push origin v0.0.7
```

To publish to the public registry:

```shell
$ git checkout tags/v0.0.7
$ npm publish
```

## License

Code is under the [Apache Licence, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).
