(function () {
    'use strict';

    /* global angular */
    angular.module('scFeatureBook')
        .controller('FeatureEditorController', FeatureEditorController);

    FeatureEditorController.$inject = ['$scope', '$route', '$location', 'featureBookService'];

    function FeatureEditorController($scope, $route, $location, featureBookService) {

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
                featureBookService.save($route.current.pathParams.path, $scope.content);
            };

            $scope.onCancel = function onClick() {
                $location.path('/viewer/' + $route.current.pathParams.path);
            };
        }
    }

})();