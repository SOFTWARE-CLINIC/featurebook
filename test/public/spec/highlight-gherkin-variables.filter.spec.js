'use strict';

describe('highlightGherkinVariables filter', function () {

    var highlightFilter;

    beforeEach(function () {
        module('scFeatureBook');

        inject(function ($filter) {
            highlightFilter = $filter('highlightGherkinVariables');
        });
    });

    it('should not highlight input without variables', function () {
        expect(doFilter('step without variables')).toEqual('step without variables');
    });

    it('should highlight input with two simple variables', function () {
        expect(doFilter('step with variable <foo> and <bar> period'))
            .toEqual('step with variable <span class="featurebook-var">&lt;foo&gt;</span> and <span class="featurebook-var">&lt;bar&gt;</span> period');
    });

    function doFilter(input) {
        return highlightFilter(input).$$unwrapTrustedValue();
    }

});