var _ = require('lodash'),
    marked = require('marked'),
    renderer = new marked.Renderer();

module.exports = {
    parse: parse
};

renderer.image = imageRenderer;
renderer.link = linkRenderer;

function imageRenderer(href, title, text) {
    return '<img src="' + (isAbsolute(href) ? href : restApiPrefix(href)) + '" alt="' + text + '">';

    function isAbsolute(url) {
        return _.startsWith(url, 'http://') || _.startsWith(url, 'https://');
    }

    function restApiPrefix(url) {
        return 'api/rest/raw' + (_.startsWith(url, '/') ? '' : '/') + url;
    }
}

function linkRenderer(href, title, text) {
    return '<a href="' + (_.endsWith(href, '.feature') ? featureRoutePrefix(href) : href) + '">' + text + '</a>';

    function featureRoutePrefix(url) {
        return '/#/viewer' + (_.startsWith(url, '/') ? '' : '/') + url;
    }
}

function parse(input) {
    return marked(input, {renderer: renderer});
}