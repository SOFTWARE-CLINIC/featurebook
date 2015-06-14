'use strict';

describe('examples directive', function () {

    var $compile, $scope;

    beforeEach(function () {
        module('scFeatureBook');
        module('scFeatureBook.templates');

        inject(function (_$compile_, $rootScope) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
        });
    });

    it('should render examples as a table', function () {
        // TODO Implement me
    });

});