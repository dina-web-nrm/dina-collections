"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chainPromiseWithPromisifiedFunction = function chainPromiseWithPromisifiedFunction(promise, func) {
  return promise.then(function (result) {
    return _promise2.default.resolve(func(result));
  });
};

var getPromisifiedInitialValue = function getPromisifiedInitialValue(initialValue) {
  return initialValue !== undefined ? _promise2.default.resolve(initialValue) : _promise2.default.resolve();
};

module.exports = function chainPromises(functions, initialValue) {
  return _promise2.default.resolve(functions.filter(function (func) {
    return !!func;
  }).reduce(chainPromiseWithPromisifiedFunction, getPromisifiedInitialValue(initialValue)));
};