var walker = require('../lib/directory-walker'),
  assert = require('assert'),
  path = require('path');

describe('directory-walker', function () {
  describe.only('#walk', function () {
    it('should return directory tree', function () {
      var tree = walker.walk('test/resources', '.');

      assertNodeEqual(tree, '.', 'folder', '.');

      assert.equal(tree.items.length, 2);

      assertNodeEqual(tree.items[0], 'eating_cucumbers.feature', 'file', 'test/resources/eating_cucumbers.feature');
      assertNodeEqual(tree.items[1], 'hello_world.feature', 'file', 'test/resources/hello_world.feature');
    });
  });

  function assertNodeEqual(actualNode, expectedName, expectedType, expectedPath) {
    assert.equal(actualNode.name, expectedName);
    assert.equal(actualNode.type, expectedType);
    assert.equal(actualNode.path, path.normalize(expectedPath));
  }

});
