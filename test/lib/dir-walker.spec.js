var walker = require('../../lib/dir-walker'),
    assert = require('assert'),
    should = require('chai').should(),
    path = require('path');

describe('directory-walker', function () {
    describe('#walkSync', function () {
        it('should return all files and directories', function () {
            var tree = walker.walkSync('test/resources');

            assertNodeEqual(tree, 'resources', 'folder', '.', 9);

            assertNodeEqual(tree.items[0], 'eating_cucumbers.feature', 'file', 'eating_cucumbers.feature');
            assertNodeEqual(tree.items[1], 'hello_world.feature', 'file', 'hello_world.feature');
            assertNodeEqual(tree.items[2], 'non_functional', 'folder', 'non_functional', 1);
            assertNodeEqual(tree.items[2].items[0], 'load_testing.feature', 'file', 'non_functional/load_testing.feature');
        });

        it('should return only directories', function () {
            var tree = walker.walkSync('test/resources', function directoriesFilter(filePath, stats) {
                return stats.isDirectory();
            });

            assertNodeEqual(tree, 'resources', 'folder', '.', 1);
            assertNodeEqual(tree.items[0], 'non_functional', 'folder', 'non_functional');
        });

        it('should return Gherkin source files', function () {
            var tree = walker.walkSync('test/resources', function gherkinSourceFilesFilter(filePath, stats) {
                return stats.isDirectory() || ( stats.isFile() && path.extname(filePath) === '.feature');
            });

            assertNodeEqual(tree, 'resources', 'folder', '.', 9);
        });
    });

    function assertNodeEqual(actualNode, expectedName, expectedType, expectedPath, expectedItemsLength) {
        assert.equal(actualNode.name, expectedName, 'invalid node name');
        assert.equal(actualNode.type, expectedType, 'invalid node type');
        assert.equal(actualNode.path, path.normalize(expectedPath), 'invalid relative path');
        actualNode.items.should.have.length(expectedItemsLength || 0);
    }

});
