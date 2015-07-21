'use strict';

var marked = require('marked'),
    markdown = require('markdown').markdown,
    chai = require('chai');

chai.should();

describe('markdown AST', function () {

    it('markdown to AST', function () {
        marked('I am using __markdown__.').should.equal('<p>I am using <strong>markdown</strong>.</p>\n');
    });

    it('xxx', function () {
        var text = 'This is **my** list:\n\n' +
            '* item one\n' +
            '* item two\n\n' +
            'Next paragraph';

        console.log(markdown.toHTML(text));
        var tree = markdown.parse(text);

        console.log(tree);

        console.log(markdown.renderJsonML(markdown.toHTMLTree(tree)));

    });

});