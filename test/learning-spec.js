var marked = require('marked'),
    should = require('chai').should();

describe('learning', function () {
    describe('`marked` package', function () {

        it('should parse emphasized text', function () {
            marked('I am __emphasized__.')
                .should.equal('<p>I am <strong>emphasized</strong>.</p>\n');
        });

        it('should parse an inline-style link', function () {
            marked('[An inline-style link](https://www.google.com)')
                .should.equal('<p><a href="https://www.google.com">An inline-style link</a></p>\n');
        });

        // TODO Check how can we append /api/rest/raw to the src of generated img element
        it('should parse an inline-style image', function () {
            marked('![Hello World](/assets/images/hello_world.png)')
                .should.equal('<p><img src="/assets/images/hello_world.png" alt="Hello World"></p>\n');
        });

    });
});