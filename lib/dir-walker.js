var fs = require('fs'),
  path = require('path');

module.exports.walkSync = function (dir, alias) {
  return {
    name: alias,
    type: 'folder',
    path: alias,
    items: walkSync(dir, alias)
  };

  function walkSync(dir, prefix) {
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
          path: path.normalize(path.join(prefix, p)),
          items: walkSync(p, prefix)
        };
      }

      return {
        name: f,
        type: 'file',
        path: path.normalize(path.join(prefix, p))
      };
    });

    function featureFiles(f) {
      // FIXME Pic up only feature files...
      return f && f[0] !== '.';
    }
  }

};