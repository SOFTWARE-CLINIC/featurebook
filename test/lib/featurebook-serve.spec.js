'use strict';

var chai = require('chai');
var should = chai.should();

describe('featurebook-serve', function () {

  var featurebookServe;

  beforeEach(function () {
    featurebookServe = require('../../lib/featurebook-serve');
  });

  describe('$imageRenderer', function () {

    var imageRenderer;

    beforeEach(function () {
      imageRenderer = featurebookServe.$imageRenderer;
    });

    it('should not modify the src attribute given any URL', function () {
      imageRenderer('http://somehost.com/images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="http://somehost.com/images/smiley.gif" alt="Smiley Face">');

      imageRenderer('https://somehost.com/images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="https://somehost.com/images/smiley.gif" alt="Smiley Face">');

      imageRenderer('images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="images/smiley.gif" alt="Smiley Face">');
    });

    it('should prefix the src attribute with `api/rest/raw` given a URL with the assert:// schema', function () {
      imageRenderer('asset://images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="api/rest/raw/images/smiley.gif" alt="Smiley Face">');
    });

  });

  describe('$linkRenderer', function () {

    var linkRenderer;

    beforeEach(function () {
      linkRenderer = featurebookServe.$linkRenderer;
    });

    it('should not modify the href attribute given any URL', function () {
      linkRenderer('http://somehost.com/index.html', null, 'Some page')
        .should.equal('<a href="http://somehost.com/index.html">Some page</a>');

      linkRenderer('some/path/index.html', null, 'Some page')
        .should.equal('<a href="some/path/index.html">Some page</a>');

      linkRenderer('/some/path/index.html', null, 'Some page')
        .should.equal('<a href="/some/path/index.html">Some page</a>');
    });

    it('should prefix the href attribute with `/#/viewer` given a URL with the feature:// schema', function () {
      linkRenderer('feature://some/path/foo.feature', null, 'Some feature')
        .should.equal('<a href="/#/viewer/some/path/foo.feature">Some feature</a>');
    });

  });

});
