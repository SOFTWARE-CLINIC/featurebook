'use strict';

var walker = require('../../lib/dir-walker'),
  chai = require('chai'),
  path = require('path');

var should = chai.should();

describe('dir-walker', function () {

  describe('#findSync', function () {
    it('should find files synchronously', function () {
      var files = walker.findSync(/file.*/, 'test/resources/dir-walker');
      files.should.deep.equal([
        'test/resources/dir-walker/dir-a/dir-b/dir-c/file-e.feature',
        'test/resources/dir-walker/dir-a/dir-b/file-c.feature',
        'test/resources/dir-walker/dir-a/dir-b/file-d.txt',
        'test/resources/dir-walker/dir-a/file-a.feature',
        'test/resources/dir-walker/dir-a/file-b.txt'
      ]);
    });
  });

  describe('#find', function () {
    it('should find files asynchronously', function (done) {
      walker.find(/file.*/, 'test/resources/dir-walker', function (err, files) {
        should.equal(err, null);
        files.should.deep.equal([
          'test/resources/dir-walker/dir-a/file-a.feature',
          'test/resources/dir-walker/dir-a/file-b.txt',
          'test/resources/dir-walker/dir-a/dir-b/file-c.feature',
          'test/resources/dir-walker/dir-a/dir-b/file-d.txt',
          'test/resources/dir-walker/dir-a/dir-b/dir-c/file-e.feature'
        ]);
        done();
      });
    });
  });

  describe('#findTreeSync', function () {
    it('should find files and directories tree synchronously', function () {
      var tree = walker.findTreeSync('test/resources/dir-walker');
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

  describe('#findTree', function () {
    it('should find files and directories tree asynchronously', function (done) {
      walker.findTree('test/resources/dir-walker', function (err, tree) {
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

  describe('#walkSync', function () {
    it('should return all files and directories', function () {
      var tree = walker.walkSync('test/resources/dir-walker');
      tree.should.deep.equal({
        "path": ".",
        "name": "dir-walker",
        "type": "folder",
        "items": [
          {
            "path": "dir-a",
            "name": "dir-a",
            "type": "folder",
            "items": [
              {
                "path": "dir-a/dir-b",
                "name": "dir-b",
                "type": "folder",
                "items": [
                  {
                    "path": "dir-a/dir-b/dir-c",
                    "name": "dir-c",
                    "type": "folder",
                    "items": [
                      {
                        "path": "dir-a/dir-b/dir-c/file-e.feature",
                        "name": "file-e.feature",
                        "type": "file",
                        "items": []
                      }
                    ]
                  },
                  {
                    "path": "dir-a/dir-b/file-c.feature",
                    "name": "file-c.feature",
                    "type": "file",
                    "items": []
                  },
                  {
                    "path": "dir-a/dir-b/file-d.txt",
                    "name": "file-d.txt",
                    "type": "file",
                    "items": []
                  }
                ]
              },
              {
                "path": "dir-a/file-a.feature",
                "name": "file-a.feature",
                "type": "file",
                "items": []
              },
              {
                "path": "dir-a/file-b.txt",
                "name": "file-b.txt",
                "type": "file",
                "items": []
              }
            ]
          }
        ]
      });

    });

    it('should return only directories', function () {
      function directoryFilter(filePath, stats) {
        return stats.isDirectory();
      }
      var tree = walker.walkSync('test/resources/dir-walker', directoryFilter);
      tree.should.deep.equal({
        "path": ".",
        "name": "dir-walker",
        "type": "folder",
        "items": [
          {
            "path": "dir-a",
            "name": "dir-a",
            "type": "folder",
            "items": [
              {
                "path": "dir-a/dir-b",
                "name": "dir-b",
                "type": "folder",
                "items": [
                  {
                    "path": "dir-a/dir-b/dir-c",
                    "name": "dir-c",
                    "type": "folder",
                    "items": []
                  }
                ]
              }
            ]
          }
        ]
      });
    });

    it('should return Gherkin source files', function () {
      function gherkinSourceFilesAndDirectoriesFilter(filePath, stats) {
        return stats.isDirectory() || ( stats.isFile() && path.extname(filePath) === '.feature');
      }
      var tree = walker.walkSync('test/resources/dir-walker', gherkinSourceFilesAndDirectoriesFilter);
      tree.should.deep.equal({
        "path": ".",
        "name": "dir-walker",
        "type": "folder",
        "items": [
          {
            "path": "dir-a",
            "name": "dir-a",
            "type": "folder",
            "items": [
              {
                "path": "dir-a/dir-b",
                "name": "dir-b",
                "type": "folder",
                "items": [
                  {
                    "path": "dir-a/dir-b/dir-c",
                    "name": "dir-c",
                    "type": "folder",
                    "items": [
                      {
                        "path": "dir-a/dir-b/dir-c/file-e.feature",
                        "name": "file-e.feature",
                        "type": "file",
                        "items": []
                      }
                    ]
                  },
                  {
                    "path": "dir-a/dir-b/file-c.feature",
                    "name": "file-c.feature",
                    "type": "file",
                    "items": []
                  }
                ]
              },
              {
                "path": "dir-a/file-a.feature",
                "name": "file-a.feature",
                "type": "file",
                "items": []
              }
            ]
          }
        ]
      });
    });
  });

});
