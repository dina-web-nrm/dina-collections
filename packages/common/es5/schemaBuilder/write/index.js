'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var createIndexFile = function createIndexFile(_ref) {
  var available = _ref.available,
      versionIndexFilePath = _ref.versionIndexFilePath;

  var indexFile = available.map(function (availableVersion) {
    return 'exports[\'' + availableVersion + '\'] = {\n  models: require(\'./' + availableVersion + '/models.json\'),\n  normalizedModels: require(\'./' + availableVersion + '/normalizedModels.json\'),\n  openApi: require(\'./' + availableVersion + '/openApi.json\'),\n  normalizedOpenApi: require(\'./' + availableVersion + '/normalizedOpenApi.json\'),\n}';
  }).join('\n') + '\n';

  fs.writeFileSync(versionIndexFilePath, indexFile);
};

var updateVersionsIndex = function updateVersionsIndex(_ref2) {
  var setCurrent = _ref2.setCurrent,
      version = _ref2.version,
      versionsBaseDirectory = _ref2.versionsBaseDirectory;

  var versionsInfoFilePath = path.join(versionsBaseDirectory, 'info.json');
  var versionIndexFilePath = path.join(versionsBaseDirectory, 'index.js');

  var versions = fs.readdirSync(versionsBaseDirectory).filter(function (fileName) {
    return fileName !== 'info.json';
  }).filter(function (fileName) {
    return fileName !== 'index.js';
  }).filter(function (filename) {
    return filename[0] !== '.';
  });

  var versionFile = fs.existsSync(versionsInfoFilePath) ? require(versionsInfoFilePath) : {};

  var versionsInfo = {
    available: versions,
    current: setCurrent ? version : versionFile.current,
    latest: versions.sort()[0]
  };
  fs.writeFileSync(versionsInfoFilePath, (0, _stringify2.default)(versionsInfo, null, 2));

  createIndexFile({
    available: versionsInfo.available,
    versionIndexFilePath: versionIndexFilePath
  });
};

var ensureDirectoryExistence = function ensureDirectoryExistence(dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  fs.mkdirSync(dirPath);
  return true;
};

var getOpenApiFileName = function getOpenApiFileName(normalize) {
  return normalize ? 'normalizedOpenApi.json' : 'openApi.json';
};

var getModelsFileName = function getModelsFileName(normalize) {
  return normalize ? 'normalizedModels.json' : 'models.json';
};

module.exports = function write() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      models = _ref3.models,
      normalize = _ref3.normalize,
      openApi = _ref3.openApi,
      setCurrent = _ref3.setCurrent,
      _ref3$version = _ref3.version,
      version = _ref3$version === undefined ? '' : _ref3$version;

  var buildDirectory = path.join(__dirname, '../../../../common/dist');
  var versionsBaseDirectory = path.join(buildDirectory, 'versions');
  var baseDirectory = version ? path.join(versionsBaseDirectory, version) : path.join(buildDirectory);

  ensureDirectoryExistence(buildDirectory);
  ensureDirectoryExistence(versionsBaseDirectory);
  ensureDirectoryExistence(baseDirectory);

  fs.writeFileSync(path.join(baseDirectory, getOpenApiFileName(normalize)), (0, _stringify2.default)(openApi, null, 2));

  fs.writeFileSync(path.join(baseDirectory, getModelsFileName(normalize)), (0, _stringify2.default)(models, null, 2));

  if (version) {
    updateVersionsIndex({
      setCurrent: setCurrent,
      version: version,
      versionsBaseDirectory: versionsBaseDirectory
    });
  }
};