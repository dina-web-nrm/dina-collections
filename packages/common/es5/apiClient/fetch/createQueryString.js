'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createQueryString() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var string = (0, _keys2.default)(params).filter(function (key) {
    return params[key] !== undefined;
  }).reduce(function (strings, key) {
    var param = params[key];
    if ((typeof param === 'undefined' ? 'undefined' : (0, _typeof3.default)(param)) === 'object' && param !== null) {
      var paramStrings = (0, _keys2.default)(param).map(function (paramKey) {
        return key + '[' + paramKey + ']=' + param[paramKey];
      });
      return [].concat((0, _toConsumableArray3.default)(strings), (0, _toConsumableArray3.default)(paramStrings));
    }
    return [].concat((0, _toConsumableArray3.default)(strings), [key + '=' + param]);
  }, []).join('&');

  return encode ? encodeURI(string) : string;
};