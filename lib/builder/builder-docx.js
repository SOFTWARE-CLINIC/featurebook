module.exports = {
    name: 'docx',
    supports: supports,
    build: build
};

function supports(format) {
    return 'docx' === format;
}

function build(featureBook, sourceDir, outputDir) {
    console.log('Building docx in `' + outputDir + '`');
}