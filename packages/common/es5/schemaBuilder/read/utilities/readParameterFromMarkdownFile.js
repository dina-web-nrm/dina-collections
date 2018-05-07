'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function readParameterFromMarkdownFile(basePath, parameterName) {
  var parameterPath = path.join(basePath, parameterName + '.md');
  if (fs.existsSync(parameterPath)) {
    return fs.readFileSync(parameterPath, 'utf8');
  }
  return null;
};