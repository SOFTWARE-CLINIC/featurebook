'use strict';

describe('person directive', function () {

    var $compile, $scope;

    beforeEach(function () {
        module('scFeatureBook');
        module('scFeatureBook.templates');

        inject(function (_$compile_, $rootScope) {
            $compile = _$compile_;
            $scope = $rootScope.$new();
        });
    });

    it('should render person as a hyperlink', function () {
        // given
        $scope.daniel = {
            firstName: 'Daniel',
            lastName: 'Pacak',
            email: 'pacak.daniel@gmail.com'
        };

        // when
        var element = $compile('<person ng-model="daniel"></person>')($scope);
        $scope.$digest();

        // then
        expect(element.prop('tagName')).toEqual('A');
        expect(element.attr('href')).toEqual('mailto:pacak.daniel@gmail.com');
        expect(element.text()).toEqual('Daniel Pacak');
    });

});