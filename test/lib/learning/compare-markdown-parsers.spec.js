'use strict';

var markdown = require('markdown').markdown;
var chai = require('chai');
var should = chai.should();

describe('compare markdown parsers', function () {

  describe('marked', function () {

    var marked = require('marked');

    it('markdown to HTML', function () {
      marked('I am using __markdown__.').should.equal('<p>I am using <strong>markdown</strong>.</p>\n');
    });

  });

  describe('markdown-it', function () {

    var md = require('markdown-it')();

    it('markdown to HTML', function () {
      md.render('I am using __markdown__.').should.equal('<p>I am using <strong>markdown</strong>.</p>\n');
    });

    it('markdown to AST', function () {
      console.log(JSON.stringify(md.parseInline('I am using __markdown__.'), null, 2));
    });

  });

});
