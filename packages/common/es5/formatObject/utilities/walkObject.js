'use strict';

var objectPath = require('object-path');
var getNextWalkPath = require('./getNextWalkPath');

module.exports = function walkObject(_ref) {
  var obj = _ref.obj,
      _ref$path = _ref.path,
      path = _ref$path === undefined ? '' : _ref$path,
      _ref$segments = _ref.segments,
      segments = _ref$segments === undefined ? [] : _ref$segments,
      func = _ref.func;

  if (!obj) {
    throw new Error('must provide object');
  }

  if (!func) {
    throw new Error('must provide func');
  }

  if (!segments.length) {
    func(path);
  } else {
    var nextPath = getNextWalkPath({ path: path, segments: segments });
    var valueAtNextPath = objectPath.get(obj, nextPath);

    if (valueAtNextPath) {
      if (Array.isArray(valueAtNextPath)) {
        valueAtNextPath.forEach(function (_, index) {
          var elementPath = nextPath + '.' + index;
          walkObject({
            func: func,
            obj: obj,
            path: elementPath,
            segments: segments.slice(1)
          });
        });
      } else {
        func(nextPath);
      }
    }
  }
};