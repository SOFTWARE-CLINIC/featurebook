'use strict';

var fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    officegen = require('officegen');

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

    var docx = officegen('docx'),
        builderOutputDir = path.join(outputDir, 'docx'),
        outputFile = path.join(builderOutputDir, 'specification.docx');

    mkdirp.sync(builderOutputDir);

    docx.on('finalize', function (written) {
        console.log('Finished!', written);
    });
    docx.on('error', function (err) {
        console.log(err);
    });

    var pObj = docx.createP();
    pObj.addText('Simple');
    pObj.addText(' with color', {color: '000088'});
    pObj.addText(' and back color.', {color: '00ffff', back: '000088'});

    var out = fs.createWriteStream(outputFile);

    out.on('error', function (err) {
        console.log(err);
    });

    docx.generate(out);

}