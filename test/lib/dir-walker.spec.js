'use strict';

var walker = require('../../lib/dir-walker');
var chai = require('chai');
var path = require('path');
var should = chai.should();

describe('dir-walker', function () {

  var TEST_DIR = 'test/resources/dir-walker';
  var ALL_FILES_FILTER = function () {
    return true;
  };

  describe('#find', function () {
    it('should find files asynchronously', function (done) {
      walker.find(/file.*/, TEST_DIR, function (err, files) {
        should.equal(err, null);
        files.should.have.members([
          path.normalize('test/resources/dir-walker/dir-a/file-a.feature'),
          path.normalize('test/resources/dir-walker/dir-a/file-b.txt'),
          path.normalize('test/resources/dir-walker/dir-a/dir-b/file-c.feature'),
          path.normalize('test/resources/dir-walker/dir-a/dir-b/file-d.txt'),
          path.normalize('test/resources/dir-walker/dir-a/dir-b/dir-c/file-e.feature')
        ]);
        done();
      });
    });
  });

  describe('#findSync', function () {
    it('should find files synchronously', function () {
      var files = walker.findSync(/file.*/, TEST_DIR);
      files.should.have.members([
        path.normalize('test/resources/dir-walker/dir-a/dir-b/dir-c/file-e.feature'),
        path.normalize('test/resources/dir-walker/dir-a/dir-b/file-c.feature'),
        path.normalize('test/resources/dir-walker/dir-a/dir-b/file-d.txt'),
        path.normalize('test/resources/dir-walker/dir-a/file-a.feature'),
        path.normalize('test/resources/dir-walker/dir-a/file-b.txt')
      ]);
    });
  });

  describe('#findTree', function () {
    it('should find files and directories tree asynchronously', function (done) {
      walker.findTree(TEST_DIR, ALL_FILES_FILTER, function (err, tree) {
        should.equal(err, null);
        tree.should.deep.equal({
          "path": ".",
          "name": "dir-walker",
          "type": "directory",
          "children": [
            {
              "path": "dir-a",
              "name": "dir-a",
              "type": "directory",
              "children": [
                {
                  "path": "dir-a/dir-b",
                  "name": "dir-b",
                  "type": "directory",
                  "children": [
                    {
                      "path": "dir-a/dir-b/dir-c",
                      "name": "dir-c",
                      "type": "directory",
                      "children": [
                        {
                          "path": "dir-a/dir-b/dir-c/file-e.feature",
                          "name": "file-e.feature",
                          "type": "file"
                        }
                      ]
                    },
                    {
                      "path": "dir-a/dir-b/file-c.feature",
                      "name": "file-c.feature",
                      "type": "file"
                    },
                    {
                      "path": "dir-a/dir-b/file-d.txt",
                      "name": "file-d.txt",
                      "type": "file"
                    }
                  ]
                },
                {
                  "path": "dir-a/file-a.feature",
                  "name": "file-a.feature",
                  "type": "file"
                },
                {
                  "path": "dir-a/file-b.txt",
                  "name": "file-b.txt",
                  "type": "file"
                }
              ]
            }
          ]
        });
        done();
      });
    });
  });

  describe('#findTreeSync', function () {
    it('should find files and directories tree synchronously', function () {
      var tree = walker.findTreeSync(TEST_DIR, ALL_FILES_FILTER);
      tree.should.deep.equal({
        "path": ".",
        "name": "dir-walker",
        "type": "directory",
        "children": [
          {
            "path": "dir-a",
            "name": "dir-a",
            "type": "directory",
            "children": [
              {
                "path": "dir-a/dir-b",
                "name": "dir-b",
                "type": "directory",
                "children": [
                  {
                    "path": "dir-a/dir-b/dir-c",
                    "name": "dir-c",
                    "type": "directory",
                    "children": [
                      {
                        "path": "dir-a/dir-b/dir-c/file-e.feature",
                        "name": "file-e.feature",
                        "type": "file"
                      }
                    ]
                  },
                  {
                    "path": "dir-a/dir-b/file-c.feature",
                    "name": "file-c.feature",
                    "type": "file"
                  },
                  {
                    "path": "dir-a/dir-b/file-d.txt",
                    "name": "file-d.txt",
                    "type": "file"
                  }
                ]
              },
              {
                "path": "dir-a/file-a.feature",
                "name": "file-a.feature",
                "type": "file"
              },
              {
                "path": "dir-a/file-b.txt",
                "name": "file-b.txt",
                "type": "file"
              }
            ]
          }
        ]
      });
    });
  });

});
