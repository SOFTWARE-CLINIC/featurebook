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
* [Contributing](#contributing)
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
* The `assets` directory for images and videos that you can refer to from within the Gherkin source files
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

## Contributing

You wanna contribute to FeatureBook? That is truly great! Here are some tips to get you started.

First off, you need to [fork](https://help.github.com/articles/fork-a-repo/) the
[original](https://github.com/SOFTWARE-CLINIC/featurebook.git) FeatureBook repository. Forking the repository allows
you to freely experiment with changes without affecting the original project.

Once it's done, you can use the forked repository to propose changes or fix bugs by changing code and submitting a pull
request to the project owners. If we like it, we might pull your fix into the original repository.

### Keeping your fork synced

It's a good practice to regularly sync your fork with the **upstream** repository (upstream repository or simply
upstream is a fancy name for the original repository). Before you can sync, you must configure a remote that points to
the upstream.

#### Configuring upstream remote

I assume that you already have the local clone of your fork. Type `git remote -v` to see the currently configured remote
repositories for your fork:

```
$ git remote -v
origin  https://github.com/banczi/featurebook.git (fetch)
origin  https://github.com/banczi/featurebook.git (push)
```

To configure upstream remote repository:

```
$ git remote add upstream https://github.com/SOFTWARE-CLINIC/featurebook.git
```

To verify the new upstream repository:

```
$ git remote -v
origin    https://github.com/banczi/featurebook.git (fetch)
origin    https://github.com/banczi/featurebook.git (push)
upstream  https://github.com/SOFTWARE-CLINIC/featurebook.git (fetch)
upstream  https://github.com/SOFTWARE-CLINIC/featurebook.git (push)
```

Now, you can keep your fork synced with the upstream repository with a few Git commands.

#### Syncing a fork

To fetch the branches and their respective commits:

```
$ git fetch upstream
remote: Counting objects: 77, done.
remote: Compressing objects: 100% (71/71), done.
remote: Total 77 (delta 30), reused 1 (delta 0), pack-reused 0
Unpacking objects: 100% (77/77), done.
From https://github.com/SOFTWARE-CLINIC/featurebook
 * [new branch]      master     -> upstream/master
 * [new tag]         v0.0.8     -> v0.0.8
```

Note that commits to `master` will be stored in a local branch, `upstream/master`.

Merge the changes from `upstream/master` into your local `master` branch. This brings your fork's `master` branch into
sync with the upstream repository, without losing your local changes.

```
$ git merge upstream/master
Updating d6425c4..287f5e7
Fast-forward
 README.md                                                           | 63 ++++++++++++++++++++++++++++++++++++++++++---------
 bin/featurebook.js                                                  |  2 +-
 lib/dir-walker.js                                                   | 17 +++++++++-----
 lib/gherkin-parser.js                                               | 67 +++++++++++++++++++++++++++++++++++++++----------------
 lib/serve-command.js                                                | 10 ++++++++-
 package.json                                                        |  5 +++--
 public/assets/css/featurebook.css                                   |  5 +++++
 public/assets/js/featurebook.js                                     | 37 +++++++++++++++++++++++++-----
 public/views/examples.html                                          |  5 +++++
 public/views/feature.html                                           | 21 ++++-------------
 public/views/step.html                                              |  6 +++++
 test/lib/dir-walker-spec.js                                         | 30 +++++++++++++++++++------
 test/lib/gherkin-parser-spec.js                                     | 20 +++++++++++++++++
 test/resources/simple_feature_with_multiline_table_argument.feature | 18 +++++++++++++++
 test/resources/simple_feature_with_tags.feature                     | 19 ++++++++++++++++
 15 files changed, 257 insertions(+), 68 deletions(-)
 create mode 100644 public/views/examples.html
 create mode 100644 public/views/step.html
 create mode 100644 test/resources/simple_feature_with_multiline_table_argument.feature
 create mode 100644 test/resources/simple_feature_with_tags.feature
```

Syncing your fork only updates your local copy of the repository. To update your fork on GitHub, you **must** push your
changes.

```
$ git push -u origin master
```

## License

Code is under the [Apache Licence, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).