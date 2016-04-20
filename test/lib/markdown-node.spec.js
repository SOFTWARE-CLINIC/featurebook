var MarkdownNode = require('../../lib/markdown-node');
var chai = require('chai');
var should = chai.should();

describe('markdown-node', function () {

  describe('#MarkdownNode', function () {

    it('should construct node for text', function () {
      var node = new MarkdownNode('js rulez');
      node.type.should.equal('text');
      node.text.should.equal('js rulez');
    });

    it('should construct node for a simple paragraph', function () {
      var node = new MarkdownNode(['para', 'a simple paragraph']);
      node.type.should.equal('para');
      node.content[0].type.should.equal('text');
      node.content[0].text.should.equal('a simple paragraph');
    });

    it('should construct node for a simple paragraph with the strong text', function () {
      var node = new MarkdownNode(['para', '', ['strong', 'in order'], 'a simple paragraph']);

      node.type.should.equal('para');
      node.content.should.have.length(3);

      node.content[0].type.should.equal('text');
      node.content[0].text.should.equal('');

      node.content[1].type.should.equal('strong');
      node.content[1].content.should.have.length(1);
      node.content[1].content[0].type.should.equal('text');
      node.content[1].content[0].text.should.equal('in order');

      node.content[2].type.should.equal('text');
      node.content[2].text.should.equal('a simple paragraph');
    });

    it('should construct node for a simple paragraph with the image', function () {
      var node = new MarkdownNode(['para', ' ', ['img', {
        'alt': 'Money',
        'href': '/assets/images/giving_change_money.jpg'
      }]]);

      node.type.should.equal('para');
      node.content.should.have.length(2);
      node.content[0].type.should.equal('text');
      node.content[0].text.should.equal(' ');

      node.content[1].type.should.equal('img');
      node.content[1].attrs.should.deep.equal({
        alt: 'Money',
        href: '/assets/images/giving_change_money.jpg'
      });
    });

    it('should construct node for the bullet list', function () {
      var node = new MarkdownNode(['bulletlist',
        ['listitem', 'item one'],
        ['listitem', 'item two']]);

      node.type.should.equal('bulletlist');
      node.content.should.have.length(2);

      node.content[0].type.should.equal('listitem');
      node.content[0].content.should.have.length(1);
      node.content[0].content[0].type.should.equal('text');
      node.content[0].content[0].text.should.equal('item one');

      node.content[1].type.should.equal('listitem');
      node.content[1].content.should.have.length(1);
      node.content[1].content[0].type.should.equal('text');
      node.content[1].content[0].text.should.equal('item two');
    });

  });

});
