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
* [Rationale](#rationale)
* [Usage](#usage)
* [Specification format](#specification-format)
* [Public API](#public-api)
* [Development environment](#development-environment)
* [Contributing](#contributing)
* [License](#license)

## Introduction

FeatureBook is a command line tool (and [Node.js](https://nodejs.org) library) for generating beautiful system
specifications from [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) source files.

Here is an [example](https://github.com/SOFTWARE-CLINIC/featurebook-examples).

![Screenshot 1](/README/featurebook_screenshot_1.png)

![Screenshot 2](/README/featurebook_screenshot_2.png)

## Rationale

Even in 2015, there are development teams that don't know how to apply
[Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development)) or some other
[Agile methodology](https://en.wikipedia.org/wiki/Agile_software_development) in day-to-day business. Believe it or not
but that's the matter of fact. Doing just daily meetings at 9 or 10 a.m. doesn't really mean that you're in the Agile
mode! With business analysts or other business folks it's even worse. Most of them haven't heard the buzzwords Scrum or
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
system. Forget about a bunch of hello world examples presented in a super boring fashion that cost thousands bucks.

## Usage

FeatureBook can be installed from [npm](https://www.npmjs.com):

```shell
$ npm install featurebook -g
```

If it's already installed, you only need to update to the latest version:

```shell
$ npm update featurebook -g
```

You can serve the current directory as a system specification:

```shell
$ featurebook serve --port 3000
```

Or simply build the static website:

```shell
$ featurebook build --output-dir ~/book --format=html
```

To list all available commands and options:

```shell
$ featurebook --help
```

Or just display help for a given command:

```shell
$ featurebook serve --help
```

FeatureBook can be used with [Grunt](https://github.com/SOFTWARE-CLINIC/featurebook-grunt-example) or
[Gulp](https://github.com/SOFTWARE-CLINIC/featurebook-gulp-example) to generate a system specification as part of your
continuous integration process.

## Specification format

A system specification is a directory containing:

* Gherkin source files
* The `assets` directory for images and videos that you can refer to from within the Gherkin source files
* An optional `SUMMARY.md` descriptor
* An optional `featurebook.json` descriptor

```
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
|-- SUMMARY.md
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

The `featurebook.json` contains system specification metadata such as: title, version, authors, and contributors:

```javascript
{
  "modelVersion": "1.0.0",
  "title": "My System Specification",
  "version": "1.0.0",
  "authors": [
    {
      "firstName": "Henryk",
      "lastName": "Sienkiewicz",
      "email": "hsienkiewicz@gmail.com"
    }
  ],
  "contributors": [
    {
      "firstName": "Eliza",
      "lastName": "Orzeszkowa",
      "email": "eorzeszkowa@gmail.com"
    }
  ],
  "language": "pl"
}
```

Gherkin's grammar exists in different flavours for many [spoken languages](https://github.com/cucumber/cucumber/wiki/Spoken-languages).
To specify and use the keywords in your own language, you must set the `language` property to the corresponding language
[code](https://github.com/cucumber/gherkin/blob/master/lib/gherkin/i18n.json).

### SUMMARY.md

Typically, this should be the introduction to your specification where you can:

* give a general overview of the system being specified
* provide description that is pertinent to all features and scenarios
* keep a list of notable changes and reviews

```
Summary
=======

This is a great thirst-quencherer. Buy drinks or get them for free.

*This is part of a demo project to show how to use ATTD/BDD at a client site.
This is not to be used commercially, nor is the software very valuable, except
for demonstration purposes.*

## Change log

| Version | Date       | Description  | Authors            |
| ------- | ---------- | ------------ | ------------------ |
| 2.0     | 13-09-2012 | First review | Eliza Orzeszkowa   |
| 1.0     | 15-07-2012 | First draft  | Henryk Sienkiewicz |
```

## Public API

Most of the time, you will be using FeatureBook directly from command line. You can, however, call FeatureBook
programmatically from your Node.js module. [Here](https://github.com/SOFTWARE-CLINIC/featurebook/wiki/Public-API) is the
public API.

## Development environment

### Running tests

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

## Contributing

You wanna contribute to FeatureBook? That is truly great!
[Here](https://github.com/SOFTWARE-CLINIC/featurebook/wiki/Contributing) are some tips to get you started.

## License

Code is under the [Apache Licence, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).
