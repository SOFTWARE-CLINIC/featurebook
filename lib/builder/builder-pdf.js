var fs = require('fs'),
    path = require('path'),
    PDFDocument = require('pdfkit');

module.exports = {
    name: 'pdf',
    supports: supports,
    build: build
};

function supports(format) {
    return 'pdf' === format;
}

function build(featureBook, sourceDir, outputDir) {
    var doc = new PDFDocument(),
        builderOutputDir = path.join(outputDir, 'pdf'),
        outputFile = path.join(builderOutputDir, 'specification.pdf');

    console.log('Building pdf in `' + outputFile + '`');

    if (!fs.existsSync(builderOutputDir)) {
        fs.mkdirSync(builderOutputDir);
    }

    // TODO This should be returned by featureBookApi API
    var featureNames = ['Feature11', 'Feature22', 'Feature33'];

    doc.pipe(fs.createWriteStream(outputFile));

    for (var i = 0; i < featureNames.length; i++) {
        doc.addPage();
        doc.text(featureNames[i], 100, 100);
    }

    doc.end();
}