var fs = require('fs'),
    path = require('path');

module.exports.walkSync = function (dir) {
    return walkSync(dir);

    function walkSync(filename) {
        var stats = fs.lstatSync(filename),
            info = {
                path: path.relative(dir, filename),
                name: path.basename(filename)
            };

        if (stats.isDirectory()) {
            info.type = 'folder';
            info.items = fs.readdirSync(filename).filter(skipHiddenFiles).map(function (item) {
                return walkSync(path.join(filename, item));
            });
        } else {
            // Assuming it's a file. In real life it could be a symlink or something else!
            info.type = 'file';
        }

        return info;
    }

    function skipHiddenFiles(f) {
        return f && f[0] !== '.';
    }
};