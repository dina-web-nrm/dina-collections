'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');

var _require = require('child_process'),
    exec = _require.exec;

var getCurrentTime = function getCurrentTime() {
  return new Date().toISOString();
};

var buildLinkContentArray = function buildLinkContentArray(_ref) {
  var name = _ref.name,
      rootRelativePath = _ref.rootRelativePath,
      trees = _ref.trees;

  return trees.filter(function (_ref2) {
    var treeName = _ref2.name;

    return treeName !== name;
  }).map(function (tree) {
    var relative = path.relative(rootRelativePath, tree.rootRelativePath);
    return '[' + tree.name + '](' + relative + '/tree.md)';
  });
};

var createCmd = function createCmd(_ref3) {
  var relativePath = _ref3.relativePath,
      levels = _ref3.levels;

  return 'tree ' + relativePath + ' -L ' + levels + ' -I node_modules';
};

var buildTreeContentArray = function buildTreeContentArray(_ref4) {
  var levels = _ref4.levels,
      relativePath = _ref4.relativePath;

  return new _promise2.default(function (resolve, reject) {
    var cmd = createCmd({ levels: levels, relativePath: relativePath });
    exec(cmd, function (err, tree) {
      if (err) {
        return reject(err);
      }
      var lines = tree.split('\n');
      lines.splice(0, 1);
      lines.splice(-2, 2);
      var treeContentArray = ['```bash', lines.join('\n'), '```'];

      return resolve(treeContentArray);
    });
  });
};

var buildTreeDocumentation = function buildTreeDocumentation(_ref5) {
  var rootPath = _ref5.rootPath,
      levels = _ref5.levels,
      name = _ref5.name,
      rootRelativePath = _ref5.rootRelativePath,
      trees = _ref5.trees;

  var relativePath = path.join(rootPath, rootRelativePath);
  return buildTreeContentArray({
    levels: levels,
    relativePath: relativePath
  }).then(function (treeContentArray) {
    var treeLinks = buildLinkContentArray({ name: name, rootRelativePath: rootRelativePath, trees: trees });
    var currentTime = getCurrentTime();

    var fileContent = ['# Tree for ' + name, 'Generated at: ' + currentTime, '## Tree'].concat((0, _toConsumableArray3.default)(treeContentArray), ['', '## Links'], (0, _toConsumableArray3.default)(treeLinks)).join('\n');

    var filePath = path.join(relativePath, 'tree.md');
    fs.writeFileSync(filePath, fileContent, 'utf8');
  });
};

module.exports = function buildFileTrees(_ref6) {
  var rootPath = _ref6.rootPath,
      trees = _ref6.trees;

  trees.forEach(function (tree) {
    buildTreeDocumentation((0, _extends3.default)({ rootPath: rootPath, trees: trees }, tree));
  });
};