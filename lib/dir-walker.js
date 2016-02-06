'use strict';

var fs = require('fs'),
  path = require('path');

module.exports.walkSync = function (dir, filter) {
  return walkSync(dir);

  function walkSync(filename) {
    var stats = fs.lstatSync(filename),
      info = {
        path: path.normalize(path.relative(dir, filename)).replace(/\\/g, '/'),
        name: path.basename(filename)
      };

    if (stats.isDirectory()) {
      info.type = 'folder';
      info.items = fs.readdirSync(filename).filter(withCustomFilter).map(function (item) {
        return walkSync(path.join(filename, item));
      });
    } else {
      info.type = 'file';
      info.items = [];
    }

    // The idea is to pass to the custom `filter` the fullPath and stats args; not only the file name
    function withCustomFilter(f) {
      var fullPath = path.join(filename, f);
      if (f && filter) {
        return filter(fullPath, fs.lstatSync(fullPath));
      }
      return true;
    }

    return info;
  }

};
