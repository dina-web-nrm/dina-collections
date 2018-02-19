'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createFormBody = require('./createFormBody');
var createJsonBody = require('./createJsonBody');

module.exports = function createBody(_ref) {
  var body = _ref.body,
      headers = _ref.headers;

  var formattedBody = void 0;
  if ((0, _keys2.default)(body).length) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      formattedBody = createFormBody(body);
    } else {
      formattedBody = createJsonBody(body);
    }
  }

  return formattedBody;
};