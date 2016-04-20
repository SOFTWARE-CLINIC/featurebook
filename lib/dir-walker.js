var fs = require('fs');
var path = require('path');

module.exports = {
  find: find,
  findSync: findSync,
  findTree: findTree,
  findTreeSync: findTreeSync
};

var NODE_FILE = 'file';
var NODE_DIRECTORY = 'directory';

function find(nameRe, startDir, cb) {
  var results = [];
  var asyncOps = 0;
  var errored = false;

  function error(err) {
    if (!errored) {
      cb(err);
    }
    errored = true;
  }

  function search(dir) {
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

function findSync(nameRe, startDir) {
  var results = [];

  function search(dir) {
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

function findTree(startDir, filter, cb) {
  var root = {};
  var asyncOps = 0;
  var errored = false;

  function error(err) {
    if (!errored) {
      cb(err);
    }
    errored = true;
  }

  function search(parent, file) {
    parent.path = path.normalize(path.relative(startDir, file)).replace(/\\/g, '/');
    parent.name = path.basename(file);
    parent.displayName = getDisplayName(parent.name);

    asyncOps++;
    fs.stat(file, function (err, stat) {
      if (err) error(err);

      if (stat.isDirectory()) {
        parent.type = NODE_DIRECTORY;
        asyncOps++;
        ireaddir(file, filter, function (err, files) {
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
        parent.type = NODE_FILE;
      }
      asyncOps--;
      if (asyncOps == 0) {
        cb(null, root);
      }
    });
  }

  search(root, startDir);
}

function findTreeSync(startDir, filter) {

  function search(file) {
    var node = {
      path: path.normalize(path.relative(startDir, file)).replace(/\\/g, '/'),
      name: path.basename(file)
    };
    node.displayName = getDisplayName(node.name);

    var stats = fs.statSync(file);

    if (stats.isDirectory()) {
      node.type = NODE_DIRECTORY;
      node.children = [];
      var files = ireaddirSync(file, filter);

      files.forEach(function (f) {
        node.children.push(search(path.join(file, f)));
      });
    }
    if (stats.isFile()) {
      node.type = NODE_FILE;
    }

    return node;
  }

  return search(startDir);
}

function getDisplayName(fileName) {
  var withoutUnderscores = fileName.replace(/_/g, ' ');
  var uppercased = withoutUnderscores.charAt(0).toUpperCase() + withoutUnderscores.slice(1);
  return uppercased.replace(/\.feature/g, '');
}

function ireaddirSync(dir, filter) {
  return fs.readdirSync(dir).filter(filter);
}

function ireaddir(dir, filter, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err;

    callback(null, files.filter(filter));
  });
}
