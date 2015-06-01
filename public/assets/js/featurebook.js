$(function () {
    $(window).bind('hashchange', onHashChange);
    createSummaryElements();
    createFeaturesTreeElement();
});

function selectFeature() {
    var path = featurePathFromHash();
    if (path) {
        displayFeature(path);
    }
}

function createSummaryElements() {

    getSummary().done(function (summary) {
        $('.featurebook-title').text(summary.title);
        $('title').text(summary.title);
    });

    function getSummary() {
        return $.ajax('api/rest/summary');
    }
}

function createFeaturesTreeElement() {

    getFeatures()
        .done(function (node) {
            createNodeElement(node, $('<ul/>').appendTo($('.featurebook-features-tree')));
            selectFeature();
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
            var li = $('<li/>').appendTo(container);
            $('<a/>')
                .text(node.name)
                .attr('href', '#feature/' + encodeURIComponent(node.path))
                .appendTo(li);
        }
    }

}

function onHashChange() {
    var path = featurePathFromHash();
    if (path) {
        displayFeature(path);
    }
}

function displayFeature(path) {
    getFeature()
        .done(function (feature) {
            var container = $('.featurebook-feature');
            container.empty();
            createFeatureElement(feature, container);
            markSelectedFeature(path)
        })
        .fail(function () {
            alert('Sorry dude but I have problem displaying `' + decodeURIComponent(path) + '`. Make sure it has a valid syntax.');
        });

    function getFeature() {
        return $.ajax('api/rest/feature/parsed/' + path);
    }
}

function markSelectedFeature(path) {
    $('.featurebook-features-tree a').removeClass('active');
    $('.featurebook-features-tree a[href="#feature/' + path + '"]').addClass('active');
}

function featurePathFromHash() {
    var hash = window.location.hash;
    if (hash && hash.startsWith('#feature/')) {
        return hash.replace('#feature/', '');
    }
    return null;
}

function createFeatureElement(feature, container) {
    $('<h3/>').text('Feature: ' + feature.name)
        .addClass('featurebook-feature-name')
        .appendTo(container);

    createDescriptionElement(feature.description)
        .appendTo(container);

    if (feature.background) {
        createBackgroundElement(feature.background)
            .appendTo(container);
    }

    $.each(feature.scenarios, function (i, scenario) {
        createScenarioElement(scenario)
            .appendTo(container);
    });

    $.each(feature.scenario_outlines, function (i, outline) {
        createScenarioOutlineElement(outline)
            .appendTo(container);
    });

    function createDescriptionElement(description) {
        return $('<div/>')
            .text(description)
            .addClass('featurebook-feature-description');
    }

    function createBackgroundElement(background) {
        var backgroundElement = $('<div/>')
            .addClass('featurebook-background');

        $('<h3/>').text('Background:').appendTo(backgroundElement);

        $.each(background.steps, function (i, step) {
            createStepElement(step)
                .appendTo(backgroundElement);
        });

        return backgroundElement;
    }

    function createScenarioElement(scenario) {
        var scenarioElement = $('<div/>')
            .addClass('featurebook-scenario');

        $('<h3/>').text('Scenario: ' + scenario.name).appendTo(scenarioElement);


        $.each(scenario.steps, function (i, step) {
            createStepElement(step)
                .appendTo(scenarioElement);
        });

        return scenarioElement;
    }

    function createScenarioOutlineElement(outline) {
        var outlineElement = $('<div/>')
            .addClass('featurebook-scenario');

        $('<h3/>').text('Scenario Outline: ' + outline.name).appendTo(outlineElement);

        $.each(outline.steps, function (i, step) {
            createStepElement(step)
                .appendTo(outlineElement);
        });

        createExamplesElement(outline.examples)
            .appendTo(outlineElement);

        return outlineElement;
    }

    function createExamplesElement(examples) {
        var examplesElement = $('<div/>')
            .addClass('featurebook-examples');

        $('<h3/>').text('Examples').appendTo(examplesElement);

        var table = $('<table/>').appendTo(examplesElement);

        $.each(examples, function (i, row) {
            var rowElement = $('<tr/>');

            $.each(row, function (i, cell) {
                $('<td>').text(cell).appendTo(rowElement);
            });

            rowElement.appendTo(table);
        });

        return examplesElement;
    }

    function createStepElement(step) {
        var stepElement = $('<div/>')
            .addClass('featurebook-step');

        $('<span/>').addClass('featurebook-keyword').text(step.keyword).appendTo(stepElement);
        stepElement.append(' ' + escapeHtml(step.name));

        return stepElement;
    }

}

function escapeHtml(input) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
