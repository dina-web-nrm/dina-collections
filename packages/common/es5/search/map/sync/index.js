'use strict';

var applyMapFunctions = function applyMapFunctions(_ref) {
  var item = _ref.item,
      mapFunctions = _ref.mapFunctions;

  var target = {};

  mapFunctions.forEach(function (mapFunction) {
    mapFunction({ src: item, target: target });
  });
  return target;
};

module.exports = function map(_ref2) {
  var items = _ref2.items,
      mapFunctions = _ref2.mapFunctions;

  if (!mapFunctions) {
    throw new Error('No map functions provided');
  }

  if (!Array.isArray(mapFunctions)) {
    throw new Error('Provide map functions as array');
  }

  return items.map(function (item) {
    return applyMapFunctions({ item: item, mapFunctions: mapFunctions });
  });
};