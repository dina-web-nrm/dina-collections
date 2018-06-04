"use strict";

module.exports = function (_ref) {
  var item = _ref.item,
      input = _ref.input;
  var key = input.key,
      value = input.value;


  return !!(item.attributes && item.attributes.identifiers && item.attributes.identifiers.find(function (identifier) {
    return identifier.value === value && identifier.key === key;
  }));
};