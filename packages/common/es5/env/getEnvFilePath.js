'use strict';

var path = require('path');
var findRootPath = require('../fs/findRootPath');

module.exports = function getEnvFilePath(_ref) {
  var envFileName = _ref.envFileName;

  var rootPath = void 0;
  try {
    rootPath = findRootPath();
  } catch (err) {
    console.warn('Could not find rootPath');
  }

  if (!rootPath) {
    return undefined;
  }

  return path.join(rootPath, 'env', envFileName);
};