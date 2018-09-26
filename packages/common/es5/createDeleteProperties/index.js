'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDeleteProperties = function createDeleteProperties(valueToDelete) {
  return function (obj) {
    if (!obj || (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object') {
      return obj;
    }

    var shallowCopy = (0, _extends3.default)({}, obj);

    (0, _keys2.default)(shallowCopy).forEach(function (key) {
      if (shallowCopy[key] === valueToDelete) {
        delete shallowCopy[key];
      }
    });
    return shallowCopy;
  };
};

module.exports = createDeleteProperties;