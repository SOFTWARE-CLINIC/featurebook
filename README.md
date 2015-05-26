FeatureBook
===========

[![Build Status](https://travis-ci.org/SOFTWARE-CLINIC/featurebook.svg)](https://travis-ci.org/SOFTWARE-CLINIC/featurebook)
[![dependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook)
[![devDependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook/dev-status.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook#info=devDependencies)

FeatureBook is a command line tool (and [Node.js](https://nodejs.org) library) for generating beautiful system
specifications from [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) source files. Here is an
[example](https://github.com/SOFTWARE-CLINIC/featurebook-example) system specification.

## Usage

FeatureBook can be installed from [npm](https://www.npmjs.com) using:

```
$ npm install featurebook -g
```

You can serve the current directory as a system specification using:

```
$ featurebook serve --port 3000
```

Or simply build the static website using:

```
$ featurebook build
```

