var path = require('path'),
    featureBookApi = require('./featurebook-api');

var builders = [];

module.exports = {
    use: use,
    execute: execute
};

function use(builder) {
    console.log('Registering builder `' + builder.name + '`');
    builders.push(builder);
}

function execute(params) {
    for (var i = 0; i < builders.length; i++) {
        if (builders[i].supports(params.format)) {
            builders[i].build(
                featureBookApi,
                params.sourceDir,
                params.outputDir);
        }
    }
}
