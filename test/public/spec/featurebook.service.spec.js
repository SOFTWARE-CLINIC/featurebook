'use strict';

describe('featureBookService', function () {

    var featureBookService;

    beforeEach(function () {
        module('scFeatureBook');

        inject(function (_featureBookService_) {
            featureBookService = _featureBookService_;
        });
    });

});
