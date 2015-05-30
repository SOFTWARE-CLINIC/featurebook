$(function () {
    console.log('FeatureBook is ready to rumble!');
    createFeaturesTreeElement();
});

function createFeaturesTreeElement() {

    getFeatures()
        .done(function (node) {
            createNodeElement(node, $('<ul/>').appendTo($('#features-tree')));
        });

    function getFeatures() {
        return $.ajax('api/rest/feature/tree');
    }

    function createNodeElement(node, container) {
        if (node.type === 'folder') {
            var li = $('<li/>').text(node.name).appendTo(container);
            $.each(node.items, function (i) {
                createNodeElement(node.items[i], $('<ul/>').appendTo(li));
            });
        } else {
            var li = $('<li/>').on('click', onFeatureClicked).appendTo(container);
            $('<a/>').text(node.name).attr('href', '#' + node.path).appendTo(li);
        }

        function onFeatureClicked() {
            alert(node.path);
        }
    }


}
