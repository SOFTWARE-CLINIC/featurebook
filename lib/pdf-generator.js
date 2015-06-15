var fs = require('fs'),
    PDFDocument = require('pdfkit');

module.exports = {
    supports: supports,
    generate: generate
};

function supports(format) {
    return 'pdf' === format;
}

function generate(featureNames, outputFile) {
    var doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(outputFile));

    for (var i = 0; i < featureNames.length; i++) {
        doc.addPage();
        doc.text(featureNames[i], 100, 100);
    }

    doc.end();
}