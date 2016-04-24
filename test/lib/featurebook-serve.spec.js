'use strict';

var featurebookServe = require('../../lib/featurebook-serve');

describe('featurebook-serve', function () {

  describe('$imageRenderer', function () {

    var imageRenderer;

    beforeEach(function () {
      imageRenderer = featurebookServe.$imageRenderer;
    });

    it('should not modify the src attribute given any URL', function () {
      imageRenderer({src: 'http://somehost.com/images/smiley.gif'})
        .should.deep.equal({src: 'http://somehost.com/images/smiley.gif'});

      imageRenderer({src: 'https://somehost.com/images/smiley.gif'})
        .should.deep.equal({src: 'https://somehost.com/images/smiley.gif'});

      imageRenderer({src: 'images/smiley.gif'})
        .should.deep.equal({src: 'images/smiley.gif'});
    });

    it('should prefix the src attribute with `api/rest/raw` given a URL with the assert:// schema', function () {
      imageRenderer({src: 'asset://images/smiley.gif'})
        .should.deep.equal({src: 'api/rest/raw/images/smiley.gif'});
    });

  });

  describe('$linkRenderer', function () {

    var linkRenderer;

    beforeEach(function () {
      linkRenderer = featurebookServe.$linkRenderer;
    });

    it('should not modify the href attribute given any URL', function () {
      linkRenderer({href: 'http://somehost.com/index.html'})
        .should.deep.equal({href: 'http://somehost.com/index.html'});

      linkRenderer({href: 'some/path/index.html'})
        .should.deep.equal({href: 'some/path/index.html'});

      linkRenderer({href: '/some/path/index.html'})
        .should.deep.equal({href: '/some/path/index.html'});
    });

    it('should prefix the href attribute with `/#/viewer` given a URL with the feature:// schema', function () {
      linkRenderer({href: 'feature://some/path/foo.feature'})
        .should.deep.equal({href: '/#/viewer/some/path/foo.feature'});
    });

  });

});
