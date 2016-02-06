'use strict';

// This class represents a node in the markdown tree; and can render it to PDF (other formats? will see)
var MarkdownNode = function (tree) {

  if (typeof tree === 'string') {
    this.type = 'text';
    this.text = tree;
    this.attrs = {};
  } else {
    this.type = tree.shift();

    if (typeof tree[0] === 'object' && !Array.isArray(tree[0])) {
      this.attrs = tree.shift();
    }

    this.content = [];
    while (tree.length) {
      this.content.push(new MarkdownNode(tree.shift()));
    }
  }

};

MarkdownNode.prototype.render = function (doc) {
  if (this.type === 'text') {
    doc.text(this.text);
  } else {
    for (var i = 0; i < this.content.length; i++) {
      this.content[i].render(doc);
    }
  }
};

module.exports = MarkdownNode;
