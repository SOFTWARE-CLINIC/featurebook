'use strict';

var featurebookHtml = require('../../lib/featurebook-html');

describe('featurebook-html', function () {

  describe('$imageRenderer', function () {

    var imageRenderer;

    beforeEach(function () {
      imageRenderer = featurebookHtml.$imageRenderer;
    });

    it('should not modify the src attribute given any URL', function () {
      imageRenderer({src: 'http://somehost.com/images/smiley.gif'})
        .should.deep.equal({src: 'http://somehost.com/images/smiley.gif'});

      imageRenderer({src: 'https://somehost.com/images/smiley.gif'})
        .should.deep.equal({src: 'https://somehost.com/images/smiley.gif'});

      imageRenderer({src: 'images/smiley.gif'})
        .should.deep.equal({src: 'images/smiley.gif'});
    });

    it('should remove the schema prefix given a URL with the assert:// schema', function () {
      imageRenderer({src: 'asset://assets/images/smiley.gif'})
        .should.deep.equal({src: 'assets/images/smiley.gif'});
    });

  });

  describe('$linkRenderer', function () {

    var linkRenderer;

    beforeEach(function () {
      linkRenderer = featurebookHtml.$linkRenderer;
    });

    it('should not modify the href attribute given any URL', function () {
      linkRenderer({href: 'http://somehost.com/index.html'})
        .should.deep.equal({href: 'http://somehost.com/index.html'});

      linkRenderer({href: 'some/path/index.html'})
        .should.deep.equal({href: 'some/path/index.html'});

      linkRenderer({href: '/some/path/index.html'})
        .should.deep.equal({href: '/some/path/index.html'});
    });

    it('should remove the schema prefix and add the .html suffix given a URL with the feature:// schema', function () {
      linkRenderer({href: 'feature://some/path/foo.feature'})
        .should.deep.equal({href: 'some/path/foo.feature.html'});
    });

  });

});
