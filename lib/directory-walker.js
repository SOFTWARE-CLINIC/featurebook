var fs = require('fs'),
  path = require('path');

module.exports.walk = function walk(dir, alias) {
  return {
    name: alias,
    type: 'folder',
    path: alias,
    items: doWalk(dir, alias)
  };

  function doWalk(dir, prefix) {
    prefix = prefix || '';

    if (!fs.existsSync(dir)) {
      return [];
    }

    return fs.readdirSync(dir).filter(featureFiles).map(function (f) {
      var p = path.join(dir, f),
        stat = fs.statSync(p);

      if (stat.isDirectory()) {
        return {
          name: f,
          type: 'folder',
          path: path.join(prefix, p),
          items: doWalk(p, prefix)
        };
      }

      return {
        name: f,
        type: 'file',
        path: path.join(prefix, p)
      };
    });

    function featureFiles(f) {
      return f && path.extname(f) === '.feature';
    }
  }

};