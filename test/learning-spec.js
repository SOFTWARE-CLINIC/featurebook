var marked = require('marked'),
    should = require('chai').should();

describe.only('learning', function () {
    describe('`marked` package', function () {

        it('should parse emphasized text', function () {
            marked('I am __emphasized__.')
                .should.equal('<p>I am <strong>emphasized</strong>.</p>\n');
        });

        it('should parse an inline-style link', function () {
            marked('[An inline-style link](https://www.google.com)')
                .should.equal('<p><a href="https://www.google.com">An inline-style link</a></p>\n');
        });

    });
});