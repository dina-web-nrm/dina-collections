"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function asyncReduce(_ref) {
  var _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      initialValue = _ref.initialValue,
      reduceFunction = _ref.reduceFunction;

  var value = initialValue;
  var nItems = items.length;
  if (nItems === 0) {
    return _promise2.default.resolve(value);
  }
  var index = 0;

  var internalReduce = function internalReduce() {
    if (index === nItems) {
      return null;
    }
    var currentItem = items[index];

    return _promise2.default.resolve().then(function () {
      return reduceFunction({
        index: index,
        item: currentItem,
        value: value
      });
    }).then(function (updatedValue) {
      value = updatedValue;
      index += 1;
      return internalReduce();
    });
  };

  return internalReduce().then(function () {
    return value;
  });
};