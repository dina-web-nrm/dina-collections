'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var ensureDirectoryExistence = function ensureDirectoryExistence(dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  fs.mkdirSync(dirPath);
  return true;
};

var getModelsFileName = function getModelsFileName(normalize) {
  return normalize ? 'normalizedModels.json' : 'models.json';
};

module.exports = function write() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      apiVersion = _ref.apiVersion,
      modelVersion = _ref.modelVersion,
      models = _ref.models,
      normalize = _ref.normalize,
      openApi = _ref.openApi;

  var buildDirectory = path.join(__dirname, '../../../../common/dist/schemas');

  ensureDirectoryExistence(buildDirectory);
  if (openApi) {
    var apiVersionPath = path.join(buildDirectory, 'apiVersions', apiVersion);
    var infoPath = path.join(apiVersionPath, 'info.json');

    var currentInfo = void 0;
    try {
      currentInfo = require(infoPath);
    } catch (err) {
      currentInfo = {
        candidate: true
      };
    }

    if (!currentInfo.candidate) {
      throw new Error('Not allowed to override non candidate schema. Tried to override apiVersion: ' + apiVersion + '. If you are going to change the api schema update the version in backend/package.json');
    }

    var info = {
      apiVersion: apiVersion,
      candidate: true,
      modelVersion: modelVersion
    };

    ensureDirectoryExistence(apiVersionPath);
    fs.writeFileSync(path.join(apiVersionPath, 'openApi.json'), (0, _stringify2.default)(openApi, null, 2));
    fs.writeFileSync(path.join(apiVersionPath, 'info.json'), (0, _stringify2.default)(info, null, 2));

    var apiCurrentPath = path.join(buildDirectory, 'apiVersions', 'current');
    ensureDirectoryExistence(apiCurrentPath);
    fs.writeFileSync(path.join(apiCurrentPath, 'openApi.json'), (0, _stringify2.default)(openApi, null, 2));
    fs.writeFileSync(path.join(apiCurrentPath, 'info.json'), (0, _stringify2.default)(info, null, 2));
  }

  if (models) {
    var modelVersionPath = path.join(buildDirectory, 'modelVersions', modelVersion);

    var _infoPath = path.join(modelVersionPath, 'info.json');

    var _currentInfo = void 0;
    try {
      _currentInfo = require(_infoPath);
    } catch (err) {
      _currentInfo = {
        candidate: true
      };
    }

    if (!_currentInfo.candidate) {
      throw new Error('Not allowed to override non candidate schema. Tried to override modelVersion: ' + modelVersion + '. If you are going to change the models update the version in models/package.json. ');
    }
    var _info = {
      candidate: true,
      modelVersion: modelVersion
    };

    ensureDirectoryExistence(modelVersionPath);
    fs.writeFileSync(path.join(modelVersionPath, getModelsFileName(normalize)), (0, _stringify2.default)(models, null, 2));
    fs.writeFileSync(path.join(modelVersionPath, 'info.json'), (0, _stringify2.default)(_info, null, 2));

    var modelCurrentPath = path.join(buildDirectory, 'modelVersions', 'current');
    ensureDirectoryExistence(modelCurrentPath);
    fs.writeFileSync(path.join(modelCurrentPath, getModelsFileName(normalize)), (0, _stringify2.default)(models, null, 2));
    fs.writeFileSync(path.join(modelCurrentPath, 'info.json'), (0, _stringify2.default)(_info, null, 2));
  }
};