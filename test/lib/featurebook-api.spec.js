'use strict';

var featurebook = require('../../lib/featurebook-api'),
  chai = require('chai');

chai.should();

describe('featurebook api', function () {

  describe('#getFeaturesSync', function () {
    it('should work :)', function () {
      var featuresTree = featurebook.getFeaturesSync('test/resources');
      featuresTree.name.should.equal('resources');
      featuresTree.type.should.equal('folder');
    });
  });

});
