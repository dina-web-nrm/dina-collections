'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var specimenMapFunctions = require('../../specimen/mapFunctions');

var mapFunctionsMap = {
  searchSpecimen: specimenMapFunctions
};

var applyMapFunctions = function applyMapFunctions(_ref) {
  var item = _ref.item,
      mapFunctions = _ref.mapFunctions;

  var target = {};

  (0, _keys2.default)(mapFunctions).forEach(function (mapFunctionKey) {
    var mapFunction = mapFunctions[mapFunctionKey];
    mapFunction({ src: item, target: target });
  });
  return target;
};

module.exports = function map(_ref2) {
  var items = _ref2.items,
      resource = _ref2.resource;

  var mapFunctions = mapFunctionsMap[resource];
  if (!mapFunctions) {
    throw new Error('No map functions found for resource: ' + resource);
  }
  return items.map(function (item) {
    return applyMapFunctions({ item: item, mapFunctions: mapFunctions });
  });
};