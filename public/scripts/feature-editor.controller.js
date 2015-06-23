'use strict';

(function () {

    /* global angular */
    angular.module('scFeatureBook')
        .controller('FeatureEditorController', FeatureEditorController);

    FeatureEditorController.$inject = ['$scope', '$route', '$location'];

    function FeatureEditorController($scope, $route, $location) {

        $activate();

        function $activate() {
            $scope.content = $route.current.locals.content;

            $scope.editorOptions = {
                mode: 'gherkin',
                theme: 'twilight',
                showInvisibles: false,
                showGutter: false,
                showPrintMargin: true,
                onLoad: onLoad
            };

            function onLoad(editor) {
                editor.setFontSize(14);
                var session = editor.getSession(),
                    renderer = editor.renderer;
            }

            $scope.onSave = function onSave() {
                alert('Sorry, I am not implemented yet!');
            };

            $scope.onCancel = function onClick() {
                $location.path('/viewer/' + $route.current.pathParams.path);
            };
        }
    }

})();