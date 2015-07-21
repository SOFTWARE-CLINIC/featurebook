'use strict';

var featurebook = require('./featurebook-api');

var builders = [];

module.exports = {
    use: use,
    execute: execute
};

function use(builder) {
    builders.push(builder);
}

function execute(params) {
    for (var i = 0; i < builders.length; i++) {
        if (builders[i].supports(params.format)) {
            builders[i].build(
                featurebook,
                params.sourceDir,
                params.outputDir);
        }
    }
}
