'use strict';

var fs = require('fs');
var path = require('path');
var findRoot = require('find-root');

var _require = require('../constants/repo'),
    REPO_ROOT_NAME = _require.REPO_ROOT_NAME;

module.exports = function findRootPath() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      startPathInput = _ref.startPath,
      _ref$throwError = _ref.throwError,
      throwError = _ref$throwError === undefined ? true : _ref$throwError;

  var startPath = startPathInput || path.join(__dirname, '../../../');
  var rootPath = '';
  try {
    rootPath = findRoot(startPath, function (dir) {
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
  } catch (err) {
    if (throwError) {
      throw err;
    }
  }
  return rootPath;
};