'use strict';

var markdown = require('../../lib/featurebook-markdown');

describe('featurebook-markdown', function () {

  describe('#toHTML', function () {

    it('should parse emphasized text', function () {
      markdown.toHTML('I am __emphasized__.')
        .should.equal('<p>I am <strong>emphasized</strong>.</p>\n');
    });

    it('should parse an inline-style link', function () {
      markdown.toHTML('[An inline-style link](https://www.google.com)')
        .should.equal('<p><a href="https://www.google.com">An inline-style link</a></p>\n');
    });

    it('should parse an inline-style link to another feature', function () {
      markdown.toHTML('[amazing feature](feature://amazing.feature)')
        .should.equal('<p><a href="feature://amazing.feature">amazing feature</a></p>\n');
    });

    it('should parse an inline-style image relative to the assets directory', function () {
      markdown.toHTML('![Hello World](asset://assets/images/hello_world.png)')
        .should.equal('<p><img src="asset://assets/images/hello_world.png" alt="Hello World"></p>\n');
    });

    it('should parse an inline-style image with absolute URL', function () {
      markdown.toHTML('![Hello World](http://somewhere.com/images/hello_world.png)')
        .should.equal('<p><img src="http://somewhere.com/images/hello_world.png" alt="Hello World"></p>\n');
    });

  });

});
