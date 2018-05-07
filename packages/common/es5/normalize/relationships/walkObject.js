'use strict';

var objectPath = require('object-path');

module.exports = function walk(_ref) {
  var obj = _ref.obj,
      _ref$path = _ref.path,
      path = _ref$path === undefined ? '' : _ref$path,
      segments = _ref.segments,
      func = _ref.func;

  if (!segments.length) {
    return func(path);
  }

  var currentSegment = segments[0];
  var arrayPath = [path, currentSegment].filter(function (segment) {
    return !!segment;
  }).join('.');

  var array = objectPath.get(obj, arrayPath) || [];

  if (!Array.isArray(array)) {
    return func(arrayPath);
  }

  return array.forEach(function (_, index) {
    var itemPath = arrayPath + '.' + index;
    walk({
      func: func,
      obj: obj,
      path: itemPath,
      segments: segments.slice(1)
    });
  });
};