'use strict';

var fs = require('fs');
var path = require('path');
var findRoot = require('find-root');

var _require = require('../constants/repo'),
    REPO_ROOT_NAME = _require.REPO_ROOT_NAME;

module.exports = function findRootPath() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      startPathInput = _ref.startPath;

  var startPath = startPathInput || path.join(__dirname, '../../../');
  return findRoot(startPath, function (dir) {
    if (!dir) {
      return false;
    }
    var packageJsonPath = path.join(dir, 'package.json');
    var hasPackageJson = fs.existsSync(packageJsonPath);
    if (!hasPackageJson) {
      return false;
    }

    var packageJson = require(packageJsonPath);

    return packageJson.name === REPO_ROOT_NAME;
  });
};