FeatureBook
===========

[![Build Status](https://travis-ci.org/SOFTWARE-CLINIC/featurebook.svg)](https://travis-ci.org/SOFTWARE-CLINIC/featurebook)
[![CircleCI](https://img.shields.io/circleci/project/SOFTWARE-CLINIC/featurebook/master.svg?style=shield)](https://circleci.com/gh/SOFTWARE-CLINIC/featurebook)
[![Code Climate](https://codeclimate.com/github/SOFTWARE-CLINIC/featurebook/badges/gpa.svg)](https://codeclimate.com/github/SOFTWARE-CLINIC/featurebook)
[![GitHub issues](https://img.shields.io/github/issues/SOFTWARE-CLINIC/featurebook.svg)](https://github.com/SOFTWARE-CLINIC/featurebook/issues)
[![npm version](https://badge.fury.io/js/featurebook.svg)](http://badge.fury.io/js/featurebook)
[![dependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook)
[![devDependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook/dev-status.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook#info=devDependencies)
[![License](http://img.shields.io/:license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)
[![Join the chat at https://gitter.im/SOFTWARE-CLINIC/featurebook](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SOFTWARE-CLINIC/featurebook?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

* [Introduction](#introduction)
* [Usage](#usage)
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
