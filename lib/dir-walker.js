'use strict';

var fs = require('fs'),
  path = require('path');

module.exports = {
  walkSync: walkSync,

  find: find,
  findSync: findSync,
  findTree: findTree,
  findTreeSync: findTreeSync
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

    files.forEach(function (file) {
      var absolutePath = path.join(dir, file);
      var stats = fs.statSync(absolutePath);

      if (stats.isDirectory()) {
        search(absolutePath);
      }
      if (stats.isFile() && nameRe.test(file)) {
        results.push(absolutePath);
      }
    });
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
        fs.stat(absolutePath, function (err, stat) {
          if (err) return error(err);

          if (stat.isDirectory()) {
            search(absolutePath);
          }
          if (stat.isFile() && nameRe.test(file)) {
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

function findTreeSync(startDir) {

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

      files.forEach(function (f) {
        node.children.push(search(path.join(file, f)));
      });
    }
    if (stats.isFile()) {
      node.type = 'file';
    }

    return node;
  }

  return search(startDir);
}

function findTree(startDir, cb) {
  var root = {};
  var asyncOps = 0;
  var errored = false;

  function error (err) {
    if (!errored) {
      cb(err);
    }
    errored = true;
  }

  function search(parent, file) {
    parent.path = path.normalize(path.relative(startDir, file)).replace(/\\/g, '/');
    parent.name = path.basename(file);

    asyncOps++;
    fs.stat(file, function (err, stat) {
      if (err) error(err);

      if (stat.isDirectory()) {
        parent.type = 'directory';
        asyncOps++;
        fs.readdir(file, function (err, files) {
          if (err) error(err);

          parent.children = [];
          files.forEach(function (f) {
            var node = {};
            parent.children.push(node);
            search(node, path.join(file, f));
          });
          asyncOps--;
          if (asyncOps == 0) {
            cb(null, root);
          }
        });
      }
      if (stat.isFile()) {
        parent.type = 'file';
      }
      asyncOps--;
      if (asyncOps == 0) {
        cb(null, root);
      }
    });
  }

  search(root, startDir);

}
