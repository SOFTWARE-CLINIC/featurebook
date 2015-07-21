'use strict';

describe('step directive', function () {

    var $compile, $scope;

    beforeEach(function () {
        module('scFeatureBook');
        module('scFeatureBook.templates');

        inject(function (_$compile_, $rootScope) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
        });
    });

    it('should render simple step as div', function () {
        // given
        $scope.step = {
            keyword: 'Given',
            text: 'I have this simple step'
        };

        // when
        var element = $compile('<gherkin-step ng-model="step"></gherkin-step>')($scope);
        $scope.$digest();

        // then
        expect(element.prop('tagName')).toEqual('DIV');
        // TODO Add more asserts...
    });

});