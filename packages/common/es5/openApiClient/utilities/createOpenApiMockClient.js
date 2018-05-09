"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createOpenApiMockClient() {
  var hooks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var spies = {
    call: jest.fn()
  };

  var call = function call(operationId, userInput) {
    spies.call(operationId, userInput);
    var callHook = hooks.call;
    return _promise2.default.resolve().then(function () {
      if (callHook) {
        return callHook(operationId, userInput);
      }
      return {
        operationId: operationId,
        userInput: userInput
      };
    });
  };

  return {
    call: call,
    spies: spies
  };
};