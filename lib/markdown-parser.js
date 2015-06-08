var marked = require('marked'),
    renderer = new marked.Renderer();

module.exports = {
    parse: parse
};

renderer.image = imageRenderer;

function imageRenderer(href, title, text) {
    return '<img src="' + (isAbsolute(href) ? href : prefix(href)) + '" alt="' + text + '">';

    function isAbsolute(url) {
        return startsWith(url, 'http://') || startsWith(url, 'https://');
    }

    function prefix(url) {
        return 'api/rest/raw' + (startsWith(url, '/') ? '' : '/') + url;
    }

    function startsWith(string, starts) {
        return string.indexOf(starts) === 0
    }
}

function parse(input) {
    return marked(input, {renderer: renderer});
}