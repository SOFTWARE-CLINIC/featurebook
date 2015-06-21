'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .filter('highlightGherkinVariables', highlightGherkinVariablesFilter);

    highlightGherkinVariablesFilter.$inject = ['$sce'];

    var variableRegex = /<([_a-zA-Z][^>]*)>/g;

    function highlightGherkinVariablesFilter($sce) {
        return function (input) {
            return $sce.trustAsHtml(input.replace(variableRegex, formatVariable));

            function formatVariable(variable) {
                return '<span class="featurebook-var">' +
                    variable.replace('<', '&lt;').replace('>', '&gt;') +
                    '</span>';
            }
        };
    }

})();
