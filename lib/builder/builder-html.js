module.exports = {
    name: 'html',
    supports: supports,
    build: build
};

function supports(format) {
    return 'html' === format;
}

function build(featureBook, sourceDir, outputDir) {
    console.log('Building html in `' + outputDir + '`');
}