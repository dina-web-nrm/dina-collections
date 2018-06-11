'use strict';

module.exports = function (_ref) {
  var path = _ref.path,
      segments = _ref.segments;

  var currentSegment = segments[0];
  return [path, currentSegment].filter(function (segment) {
    return !!segment;
  }).join('.');
};