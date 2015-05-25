var gherkin = require('./gherkin-parser');

var featureAsJson = gherkin.parse(process.argv[2]);
console.log('parsed: ', featureAsJson);