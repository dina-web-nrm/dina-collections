"use strict";

module.exports = function nameSearch(_ref) {
  var attributesPath = _ref.attributesPath,
      item = _ref.item,
      input = _ref.input;
  var value = input.value;

  if (!value) {
    return false;
  }
  var lowerCaseValue = value.toLowerCase();
  var name = item[attributesPath] && item[attributesPath].group;
  if (!name) {
    return false;
  }

  return name.indexOf(lowerCaseValue) > -1;
};