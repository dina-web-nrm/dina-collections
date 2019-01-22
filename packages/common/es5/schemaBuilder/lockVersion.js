'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var buildDirectory = path.join(__dirname, '../../../common/dist/schemas');

var modelPackagePath = path.join(__dirname, '../../../models/package.json');
var backendPackagePath = path.join(__dirname, '../../../backend/package.json');

var modelVersion = require(modelPackagePath).version;
var backendVersion = require(backendPackagePath).version;
var apiVersion = modelVersion + '-' + backendVersion;

var apiVersionPath = path.join(buildDirectory, 'apiVersions', apiVersion);

var apiInfoPath = path.join(apiVersionPath, 'info.json');
var apiInfo = require(apiInfoPath);

apiInfo.candidate = false;

fs.writeFileSync(path.join(apiInfoPath), (0, _stringify2.default)(apiInfo, null, 2));

var apiCurrentPath = path.join(buildDirectory, 'apiVersions', 'current');

fs.writeFileSync(path.join(apiCurrentPath, 'info.json'), (0, _stringify2.default)(apiInfo, null, 2));

var modelVersionPath = path.join(buildDirectory, 'modelVersions', modelVersion);

var modelInfoPath = path.join(modelVersionPath, 'info.json');
var modelInfo = require(modelInfoPath);

modelInfo.candidate = false;

fs.writeFileSync(path.join(modelInfoPath), (0, _stringify2.default)(modelInfo, null, 2));

var modelCurrentPath = path.join(buildDirectory, 'modelVersions', 'current');

fs.writeFileSync(path.join(modelCurrentPath, 'info.json'), (0, _stringify2.default)(modelInfo, null, 2));