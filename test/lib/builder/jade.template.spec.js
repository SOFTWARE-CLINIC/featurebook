'use strict';

var chai = require('chai');
var jade = require('jade');
var should = chai.should();

describe('jade template', function () {

  var templateFile, compileOptions, fn;

  beforeEach(function () {
    templateFile = 'lib/META-INF/index.jade';
    compileOptions = {};
    fn = jade.compileFile(templateFile, compileOptions);
  });

  it('should output title and version', function () {
    var metadata = {title: 'Vending Machine', version: '5.1.2'};
    var locals = {metadata: metadata};
    var html = fn(locals);
    html.should.equal('<!DOCTYPE html><head><title>Vending Machine 5.1.2</title></head><body><h1>Vending Machine 5.1.2</h1></body>');
  });

  it('should output authors', function () {
    var metadata = {
      authors: [
        {firstName: 'Richard', lastName: 'Feynman', email: 'rfeynmane@icloud.com'},
        {firstName: 'Michael', lastName: 'Faraday', email: 'mfaraday@gmail.com'}
      ]
    };
    var locals = {metadata: metadata};
    var html = fn(locals);
    html.should.equal('<!DOCTYPE html><head><title> </title></head><body><h1> </h1><ul><li>Richard Feynman</li><li>Michael Faraday</li></ul></body>');
  });

});
