'use strict';

var fs = require('fs'),
  path = require('path');

module.exports = {
  walkSync: walkSync,

  findSync: findSync,
  findTreeSync: findTreeSync,

  find: find
};

function walkSync(dir, filter) {

  function search(filename) {
    var stats = fs.lstatSync(filename),
      info = {
        path: path.normalize(path.relative(dir, filename)).replace(/\\/g, '/'),
        name: path.basename(filename)
      };

    if (stats.isDirectory()) {
      info.type = 'folder';
      info.items = fs.readdirSync(filename).filter(withCustomFilter).map(function (item) {
        return search(path.join(filename, item));
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

  return search(dir);
}

function findSync (nameRe, startDir) {
  var results = [];

  function search (dir) {
    var files = fs.readdirSync(dir);

    for (var i = 0; i < files.length; i++) {
      var absolutePath = path.join(dir, files[i]);
      var stats = fs.statSync(absolutePath);

      if (stats.isDirectory()) {
        search(absolutePath);
      }
      if (stats.isFile() && nameRe.test(files[i])) {
        results.push(absolutePath);
      }
    }
  }

  search(startDir);
  return results;
}

function find (nameRe, startDir, cb) {
  var results = [];
  var asyncOps = 0;
  var errored = false;

  function error (err) {
    if (!errored) {
      cb(err);
    }
    errored = true;
  }

  function search (dir) {
    asyncOps++;
    fs.readdir(dir, function (err, files) {
      if (err) return error(err);

      files.forEach(function (file) {
        var absolutePath = path.join(dir, file);

        asyncOps++;
        fs.stat(absolutePath, function (err, stats) {
          if (err) return error(err);

          if (stats.isDirectory()) {
            search(absolutePath);
          }
          if (stats.isFile() && nameRe.test(file)) {
            results.push(absolutePath);
          }

          asyncOps--;
          if (asyncOps == 0) {
            cb(null, results);
          }
        });
      });

      asyncOps--;
      if (asyncOps == 0) {
        cb(null, results);
      }
    });
  }

  search(startDir);
}

function findTreeSync (startDir) {

  function search(file) {
    var node = {
      path: path.normalize(path.relative(startDir, file)).replace(/\\/g, '/'),
      name: path.basename(file)
    };

    var stats = fs.statSync(file);

    if (stats.isDirectory()) {
      node.type = 'directory';
      node.children = [];
      var files = fs.readdirSync(file);
      for (var i = 0; i < files.length; i++) {
        node.children.push(search(path.join(file, files[i])));
      }
    }
    if (stats.isFile()) {
      node.type = 'file';
    }

    return node;
  }

  return search(startDir);
}
