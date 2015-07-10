var marked = require('marked'),
    chai = require('chai'),
    should = chai.should();

describe('markdown AST', function () {

    it('markdown to AST', function () {
        marked('I am using __markdown__.').should.equal('<p>I am using <strong>markdown</strong>.</p>\n');
    });

});