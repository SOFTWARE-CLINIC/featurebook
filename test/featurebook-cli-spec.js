var spawn = require('child_process').spawn,
  concat = require('concat-stream'),
  path = require('path');

describe.skip('featurebook-cli', function () {

  var executable;

  beforeEach(function () {
    executable = path.join(__dirname, '..', 'bin', 'featurebook')
  });

  it('should output available commands', function (done) {
    var featurebook = spawn(executable, ['--help']);

    featurebook.stdout.on('data', function (data) {
      console.log('stdout', data);
    });

    featurebook.on('close', function (code) {
      console.log('code', code);
      done();
    });
  });

  it('should output documentation for `serve` command', function () {
    // var proc = spawn(executable, ['serve', '--help']);
  });

  it('should output documentation for `build` command', function () {
    // var proc = spawn(executable, ['build', '--help']);
  });

  it('should output version', function () {
    // var proc = spawn(executable, ['--version']);
  });

});