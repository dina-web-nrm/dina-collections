'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var readParameterFromMarkdownFile = require('./readParameterFromMarkdownFile');

module.exports = function readParameterFromJsonFile(_ref) {
  var basePath = _ref.basePath,
      parameterName = _ref.parameterName,
      _ref$includePropertie = _ref.includeProperties,
      includeProperties = _ref$includePropertie === undefined ? false : _ref$includePropertie,
      modelType = _ref.modelType,
      _ref$markdownFiles = _ref.markdownFiles,
      markdownFiles = _ref$markdownFiles === undefined ? ['description'] : _ref$markdownFiles;

  var parameterJsonPath = path.join(basePath, parameterName + '.json');
  if (fs.existsSync(parameterJsonPath)) {
    var res = require(parameterJsonPath);
    if (modelType) {
      return (0, _extends5.default)({}, res, {
        modelType: modelType
      });
    }

    return res;
  }

  var parameterJsonFolderPath = path.join(basePath, '' + parameterName);

  if (fs.existsSync(parameterJsonFolderPath) && fs.statSync(parameterJsonFolderPath).isDirectory()) {
    parameterJsonPath = path.join(parameterJsonFolderPath, 'index.json');
    if (fs.existsSync(parameterJsonPath)) {
      var json = require(parameterJsonPath);
      if (modelType) {
        json = (0, _extends5.default)({}, json, {
          modelType: modelType
        });
      }
      markdownFiles.forEach(function (markdownFile) {
        var markdownFileContent = readParameterFromMarkdownFile(parameterJsonFolderPath, markdownFile);

        if (markdownFileContent) {
          json = (0, _extends5.default)({}, json, (0, _defineProperty3.default)({}, markdownFile, markdownFileContent));
        }
      });

      if (includeProperties) {
        var fileNames = fs.readdirSync(parameterJsonFolderPath).filter(function (fileName) {
          return !['index.json', 'example.json'].includes(fileName) && fileName.indexOf('.md') === -1;
        });

        var extraProperties = fileNames.reduce(function (properties, fileName) {
          var property = readParameterFromJsonFile({
            basePath: parameterJsonFolderPath,
            parameterName: fileName
          });
          return (0, _extends5.default)({}, properties, (0, _defineProperty3.default)({}, fileName, property));
        }, {});

        var currentProperties = json.properties || {};
        json = (0, _extends5.default)({}, json, {
          properties: (0, _extends5.default)({}, currentProperties, extraProperties)
        });
      }

      var example = readParameterFromJsonFile({
        basePath: parameterJsonFolderPath,
        parameterName: 'example'
      });
      if (example) {
        json = (0, _extends5.default)({}, json, {
          example: example
        });
      }

      return json;
    }
  }

  return null;
};