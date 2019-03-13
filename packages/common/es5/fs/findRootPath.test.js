'use strict';

var path = require('path');
var findRootPath = require('./findRootPath');

var _require = require('../constants/repo'),
    REPO_ROOT_NAME = _require.REPO_ROOT_NAME;

var getIsRootPath = function getIsRootPath(rootPath) {
  var rootPackagePath = path.join(rootPath, 'package.json');

  var packageJson = require(rootPackagePath);

  return REPO_ROOT_NAME === packageJson.name;
};

describe('fs/findRootPath', function () {
  it('Finds root path when no args provided', function () {
    var rootPath = findRootPath();

    expect(getIsRootPath(rootPath)).toBe(true);
  });
  it('Finds root path when path in node_modules provided', function () {
    var rootPath = findRootPath({
      startPath: path.join(__dirname, '../../node_modules/lodash')
    });

    expect(getIsRootPath(rootPath)).toBe(true);
  });
  it('Finds root path when start path is root path', function () {
    var rootPath = findRootPath({
      startPath: findRootPath()
    });

    expect(getIsRootPath(rootPath)).toBe(true);
  });
  it('Throw error if root path not found', function () {
    expect(function () {
      findRootPath({ startPath: path.join(findRootPath(), '../') });
    }).toThrow();
  });
  it('Dont Throw error if root path not found but throwError set to false. Instead return empty string', function () {
    expect(findRootPath({
      startPath: path.join(findRootPath(), '../'),
      throwError: false
    })).toBe('');
  });
});