'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var readParameterFromJsonFile = require('./readParameterFromJsonFile');

module.exports = function readJsonFromDirectory(_ref) {
  var directory = _ref.directory,
      _ref$includePropertie = _ref.includeProperties,
      includeProperties = _ref$includePropertie === undefined ? false : _ref$includePropertie,
      modelType = _ref.modelType;

  if (!fs.existsSync(directory)) {
    return {};
  }

  return fs.readdirSync(directory).reduce(function (obj, fileName) {
    var file = readParameterFromJsonFile({
      basePath: directory,
      includeProperties: includeProperties,
      modelType: modelType,
      parameterName: fileName
    });

    if (file) {
      return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, fileName, file));
    }
    return obj;
  }, {});
};