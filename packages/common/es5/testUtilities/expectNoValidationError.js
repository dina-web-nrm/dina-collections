"use strict";

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function expectNoValidationError(validationResult) {
  if (validationResult) {
    if (validationResult.parameterErrors) {
      expect((0, _stringify2.default)(validationResult.parameterErrors, null, 2)).toBe(null);
    } else {
      expect(validationResult).toBeFalsy();
    }
  }

  expect(validationResult).toBe(null);
};