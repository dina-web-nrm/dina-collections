"use strict";

module.exports = function (_ref) {
  var item = _ref.item,
      input = _ref.input;
  var value = input.value;


  return !!(item.attributes && item.attributes.catalogNumber === value);
};