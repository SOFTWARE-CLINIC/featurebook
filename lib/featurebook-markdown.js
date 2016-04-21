var marked = require('marked');

module.exports = {
  descriptionMarkdownToHTML: descriptionMarkdownToHTML,

  toHTML: toHTML,
  parse: parse
};

function descriptionMarkdownToHTML(feature, options) {
  var background = feature.background,
    scenarioDefinitions = feature.scenarioDefinitions,
    scenarioDefinition,
    examples,
    example;

  if (feature.description) {
    feature.description = toHTML(feature.description, options);
  }
  if (background && background.description) {
    background.description = toHTML(background.description, options);
  }
  if (scenarioDefinitions) {
    for (var s = 0; s < scenarioDefinitions.length; s++) {
      scenarioDefinition = scenarioDefinitions[s];
      examples = scenarioDefinition.examples;
      if (scenarioDefinition.description) {
        scenarioDefinition.description = toHTML(scenarioDefinition.description, options);
      }
      if (examples) {
        for (var e = 0; e < examples.length; e++) {
          example = examples[e];
          if (example.description) {
            example.description = toHTML(example.description, options);
          }
        }
      }
    }
  }
  return feature;
}

function toHTML(text, options) {
  var renderer = new marked.Renderer();

  if (options && options.imageRenderer) {
    renderer.image = options.imageRenderer;
  }
  if (options && options.linkRenderer) {
    renderer.link = options.linkRenderer;
  }

  return marked(text, {renderer: renderer});
}

// toJsonML()
// toHtml()
function parse(input) {
  if (input) {
    var markdown = require('markdown').markdown;
    return markdown.parse(input);
  }
  return undefined;
}
