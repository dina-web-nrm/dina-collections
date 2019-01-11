"use strict";

module.exports = function shouldModifyInclude(_ref) {
  var resourcePath = _ref.resourcePath,
      _ref$includesToModify = _ref.includesToModify,
      includesToModify = _ref$includesToModify === undefined ? [] : _ref$includesToModify;

  return includesToModify.some(function (str) {
    return str.includes(resourcePath);
  });
};