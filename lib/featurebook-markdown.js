'use strict';

var md = require('markdown-it')({
  linkify: true
});

module.exports = {
  ASSET_URL_SCHEMA: 'asset://',
  FEATURE_URL_SCHEMA: 'feature://',

  descriptionMarkdownToHTML: descriptionMarkdownToHTML,

  render: render
};

function descriptionMarkdownToHTML(feature, options) {
  var background = feature.background,
    scenarioDefinitions = feature.scenarioDefinitions,
    scenarioDefinition,
    examples,
    example;

  if (feature.description) {
    feature.description = render(feature.description, options);
  }
  if (background && background.description) {
    background.description = render(background.description, options);
  }
  if (scenarioDefinitions) {
    for (var s = 0; s < scenarioDefinitions.length; s++) {
      scenarioDefinition = scenarioDefinitions[s];
      examples = scenarioDefinition.examples;
      if (scenarioDefinition.description) {
        scenarioDefinition.description = render(scenarioDefinition.description, options);
      }
      if (examples) {
        for (var e = 0; e < examples.length; e++) {
          example = examples[e];
          if (example.description) {
            example.description = render(example.description, options);
          }
        }
      }
    }
  }
  return feature;
}

function render(text, markdownOptions) {

  if (markdownOptions && markdownOptions.linkRenderer) {

    var defaultLinkRenderer = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      var token = tokens[idx];
      var attrs = markdownOptions.linkRenderer({
        href: token.attrs[token.attrIndex('href')][1]
      });
      // FIXME Currently a custom image renderer can override only the href attribute.
      token.attrSet('href', attrs.href);
      return defaultLinkRenderer(tokens, idx, options, env, self);
    };

  }

  if (markdownOptions && markdownOptions.imageRenderer) {

    var defaultImageRenderer = md.renderer.rules.image || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };

    md.renderer.rules.image = function (tokens, idx, options, env, self) {
      var token = tokens[idx];
      var attrs = markdownOptions.imageRenderer({
        src: token.attrs[token.attrIndex('src')][1]
      });
      // FIXME Currently a custom image renderer can override only the src attribute.
      token.attrSet('src', attrs.src);
      return defaultImageRenderer(tokens, idx, options, env, self);
    };

  }

  return md.render(text);

}
