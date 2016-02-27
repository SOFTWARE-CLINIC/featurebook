'use strict';

var marked = require('marked'),
  markdown = require('markdown').markdown,
  chai = require('chai');

chai.should();

describe.skip('learning markdown AST', function () {

  it('markdown to AST', function () {
    marked('I am using __markdown__.').should.equal('<p>I am using <strong>markdown</strong>.</p>\n');
  });

});
