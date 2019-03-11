'use strict';

var findRootPath = require('../findRootPath');

module.exports = function createFullCmd() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      cmd = _ref.cmd,
      _ref$execFromRoot = _ref.execFromRoot,
      execFromRoot = _ref$execFromRoot === undefined ? true : _ref$execFromRoot;

  if (!cmd) {
    throw new Error('provide cmd');
  }
  return execFromRoot ? 'cd ' + findRootPath() + ' && ' + cmd : cmd;
};