'use strict';

var chai = require('chai'),
  jade = require('jade');

chai.should();

describe('learning jade', function () {

  it.skip('should compile template to HTML', function () {
    var templateFile = 'lib/META-INF/index.jade';
    var compileOptions = {pretty: true};
    var fn = jade.compileFile(templateFile, compileOptions);
    var locals = {
      metadata: {
        title: 'Recursion',
        version: '5.1.2'
      },
      nodes: {
        name: 'root',
        type: 'folder',
        items: [{
          name: 'c1',
          type: 'file',
          items: []
        }, {
          name: 'c2',
          type: 'file',
          items: []
        }]
      }
    };
    console.log(fn(locals));
  });

});
