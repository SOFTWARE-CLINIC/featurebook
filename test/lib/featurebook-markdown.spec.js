'use strict';

var markdown = require('../../lib/featurebook-markdown');

describe('featurebook-markdown', function () {

  describe('#render', function () {

    it('should parse emphasized text', function () {
      markdown.render('I am __emphasized__.')
        .should.equal('<p>I am <strong>emphasized</strong>.</p>\n');
    });

    it('should parse an inline-style link to another feature', function () {
      markdown.render('[amazing feature](feature://amazing.feature)')
        .should.equal('<p><a href="feature://amazing.feature">amazing feature</a></p>\n');
    });

    it('should parse an inline-style link to another feature with a custom linkRenderer', function () {
      function linkRenderer(attrs) {
        attrs.href = '___' + attrs.href;
        return attrs;
      }

      markdown.render('[amazing feature](feature://amazing.feature)', {linkRenderer: linkRenderer})
        .should.equal('<p><a href="___feature://amazing.feature">amazing feature</a></p>\n');
    });

    it('should parse an inline-style image relative to the assets directory', function () {
      markdown.render('![Hello World](asset://assets/images/hello_world.png)')
        .should.equal('<p><img src="asset://assets/images/hello_world.png" alt="Hello World"></p>\n');
    });

    it('should parse an inline-style image relative to the assets directory with a custom imageRenderer', function () {
      function imageRenderer(attrs) {
        attrs.src = '___' + attrs.src;
        return attrs;
      }
      markdown.render('![Hello World](asset://assets/images/hello_world.png)', {imageRenderer: imageRenderer})
        .should.equal('<p><img src="___asset://assets/images/hello_world.png" alt="Hello World"></p>\n');
    });

  });

});
