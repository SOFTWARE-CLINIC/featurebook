'use strict';

var featurebook = require('../../lib/featurebook-api');
var chai = require('chai');
var should = chai.should();

describe('featurebook-api', function () {

  var TINY_SPEC_PATH = 'test/resources/specs/tiny';

  describe('#readMetadata', function () {

    it('should return metadata', function (done) {
      featurebook.readMetadata(TINY_SPEC_PATH, function (err, metadata) {
        should.equal(err, null);
        metadata.should.deep.equal({title: 'Tiny Specification', version: 'v1.0.3'});
        done();
      });
    });

  });

  describe('#readMetadataSync', function () {

    it('should return metadata', function () {
      var metadata = featurebook.readMetadataSync(TINY_SPEC_PATH);
      metadata.should.deep.equal({title: 'Tiny Specification', version: 'v1.0.3'});
    });

  });

  describe('#readSummary', function () {

    it('should return the contents of the summary file', function (done) {
      featurebook.readSummary(TINY_SPEC_PATH, function (err, summary) {
        should.equal(err, null);
        summary.should.equal('# Tiny Specification\n');
        done();
      })
    });

    it('should return `null` when the summary file does not exist', function (done) {
      featurebook.readSummary('tests/resources/specs/__nonexistent', function (err, summary) {
        should.equal(summary, null);
        done();
      });
    });

  });

  describe('#readSummarySync', function () {

    it('should return summary', function () {
      var summary = featurebook.readSummarySync(TINY_SPEC_PATH);
      summary.should.equal('# Tiny Specification\n');
    });

  });

  describe('#readSpecTree', function () {

    it('should return spec tree', function (done) {
      featurebook.readSpecTree(TINY_SPEC_PATH, function (err, specTree) {
        specTree.should.deep.equal({
          "path": ".",
          "name": "tiny",
          "type": "directory",
          "children": [
            {
              "path": "section-a",
              "name": "section-a",
              "type": "directory",
              "children": [
                {
                  "path": "section-a/file-a.feature",
                  "name": "file-a.feature",
                  "type": "file"
                },
                {
                  "path": "section-a/file-b.feature",
                  "name": "file-b.feature",
                  "type": "file"
                },
                {
                  "path": "section-a/section-b",
                  "name": "section-b",
                  "type": "directory",
                  "children": [
                    {
                      "path": "section-a/section-b/file-c.feature",
                      "name": "file-c.feature",
                      "type": "file"
                    }
                  ]
                }
              ]
            },
            {
              "path": "section-c",
              "name": "section-c",
              "type": "directory",
              "children": [
                {
                  "path": "section-c/file-d.feature",
                  "name": "file-d.feature",
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

  describe('#readSpecTreeSync', function () {

    it('should return spec tree', function () {
      var specTree = featurebook.readSpecTreeSync(TINY_SPEC_PATH);
      specTree.should.deep.equal({
        "path": ".",
        "name": "tiny",
        "type": "directory",
        "children": [
          {
            "path": "section-a",
            "name": "section-a",
            "type": "directory",
            "children": [
              {
                "path": "section-a/file-a.feature",
                "name": "file-a.feature",
                "type": "file"
              },
              {
                "path": "section-a/file-b.feature",
                "name": "file-b.feature",
                "type": "file"
              },
              {
                "path": "section-a/section-b",
                "name": "section-b",
                "type": "directory",
                "children": [
                  {
                    "path": "section-a/section-b/file-c.feature",
                    "name": "file-c.feature",
                    "type": "file"
                  }
                ]
              }
            ]
          },
          {
            "path": "section-c",
            "name": "section-c",
            "type": "directory",
            "children": [
              {
                "path": "section-c/file-d.feature",
                "name": "file-d.feature",
                "type": "file"
              }
            ]
          }
        ]
      });
    });

  });

});
