FeatureBook
===========

[![Build Status](https://travis-ci.org/SOFTWARE-CLINIC/featurebook.svg)](https://travis-ci.org/SOFTWARE-CLINIC/featurebook)
[![dependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook)
[![devDependencies](https://david-dm.org/SOFTWARE-CLINIC/featurebook/dev-status.svg)](https://david-dm.org/SOFTWARE-CLINIC/featurebook#info=devDependencies)
[![License](http://img.shields.io/:license-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

FeatureBook is a command line tool (and [Node.js](https://nodejs.org) library) for generating beautiful system
specifications from [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) source files. Here is an
[example](https://github.com/SOFTWARE-CLINIC/featurebook-example) system specification.

![Demo](/README/featurebook_demo.png)

## Usage

FeatureBook can be installed from [npm](https://www.npmjs.com) using:

```shell
$ npm install featurebook -g
```

> To be perfectly frank, the `featurebook` package has not been published to [npm](https://www.npmjs.com/) yet.
> You can still use it though by [symlink](https://docs.npmjs.com/cli/link)ing the latest development snapshot:
> 
> ```shell
> $ git clone https://github.com/SOFTWARE-CLINIC/featurebook.git
> $ cd featurebook
> $ sudo npm link
> ```
>
> To unlink the package:
>
> ```shell
> $ npm r featurebook -g
> ```

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
$ npm install -g mocha karma-cli
```

```shell
$ mocha --reporter spec --timeout 1500 test/lib
```

```shell
$ karma start test/public/karma.conf.js
```

## License

Code is under the [Apache Licence, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).
