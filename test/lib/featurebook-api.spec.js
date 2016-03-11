'use strict';

var featurebook = require('../../lib/featurebook-api'),
  chai = require('chai');

var should = chai.should();

describe('featurebook', function () {

  describe('#readMetadata', function () {
    it('should return metadata', function (done) {
      featurebook.readMetadata('test/resources/specs/tiny', function (err, metadata) {
        should.equal(err, null);
        metadata.should.deep.equal({title: 'Tiny Specification', version: 'v1.0.3'});
        done();
      });
    });
  });

  describe('#getMetadataSync', function () {

    it('should return metadata', function () {
      var metadata = featurebook.getMetadataSync('test/resources/specs/tiny');
      metadata.title.should.equal('Tiny Specification');
      metadata.version.should.equal('v1.0.3');
    });

  });

  describe('#readSummary', function () {

    it('should return the contents of the summary file', function (done) {
      featurebook.readSummary('test/resources/specs/tiny', function (err, summary) {
        shoule.equal(err, null);
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

  describe('#getSummarySync', function () {

    it('should return summary', function () {
      var summary = featurebook.getSummarySync('test/resources/specs/tiny');
      summary.should.equal('# Tiny Specification\n');
    });

  });

  describe('#getFeaturesSync', function () {

    it('should work :)', function () {
      var featuresTree = featurebook.getFeaturesSync('test/resources');
      featuresTree.name.should.equal('resources');
      featuresTree.type.should.equal('folder');
    });

  });

});
