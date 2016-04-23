'use strict';

var chai = require('chai');
var should = chai.should();

describe('featurebook-html', function () {

  var featurebookHtml;

  beforeEach(function () {
    featurebookHtml = require('../../lib/featurebook-html');
  });

  describe('$imageRenderer', function () {

    var imageRenderer;

    beforeEach(function () {
      imageRenderer = featurebookHtml.$imageRenderer;
    });

    it('should not modify the src attribute given any URL', function () {
      imageRenderer('http://somehost.com/images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="http://somehost.com/images/smiley.gif" alt="Smiley Face">');

      imageRenderer('https://somehost.com/images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="https://somehost.com/images/smiley.gif" alt="Smiley Face">');

      imageRenderer('images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="images/smiley.gif" alt="Smiley Face">');
    });

    it('should remove the schema prefix given a URL with the assert:// schema', function () {
      imageRenderer('asset://assets/images/smiley.gif', null, 'Smiley Face')
        .should.equal('<img src="assets/images/smiley.gif" alt="Smiley Face">');
    });

  });

  describe('$linkRenderer', function () {

    var linkRenderer;

    beforeEach(function () {
      linkRenderer = featurebookHtml.$linkRenderer;
    });

    it('should not modify the href attribute given any URL', function () {
      linkRenderer('http://somehost.com/index.html', null, 'Some page')
        .should.equal('<a href="http://somehost.com/index.html">Some page</a>');

      linkRenderer('some/path/index.html', null, 'Some page')
        .should.equal('<a href="some/path/index.html">Some page</a>');

      linkRenderer('/some/path/index.html', null, 'Some page')
        .should.equal('<a href="/some/path/index.html">Some page</a>');
    });

    it('should remove the schema prefix and add the .html suffix given a URL with the feature:// schema', function () {
      linkRenderer('feature://some/path/foo.feature', null, 'Some feature')
        .should.equal('<a href="some/path/foo.feature.html">Some feature</a>');
    });

  });

});
