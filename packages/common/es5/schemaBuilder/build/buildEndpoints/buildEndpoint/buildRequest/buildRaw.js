"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function buildRawRequest(_ref) {
  var name = _ref.name,
      raw = _ref.raw;

  return (0, _extends3.default)({
    name: name
  }, raw);
};