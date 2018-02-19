'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

module.exports = function readApis(apisBasePath) {
  var apisInfo = fs.readdirSync(apisBasePath).filter(function (apiName) {
    var apiPath = path.join(apisBasePath, apiName);
    return fs.statSync(apiPath).isDirectory();
  }).reduce(function (obj, apiName) {
    var infoPath = path.join(apisBasePath, apiName, 'info');
    return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, apiName, require(infoPath)));
  }, {});

  return (0, _keys2.default)(apisInfo).reduce(function (obj, key) {
    var description = apisInfo[key].description;


    return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, key, {
      description: description,
      name: key
    }));
  }, {});
};