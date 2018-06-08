'use strict';

var includeItem = require('../includeItem');

module.exports = function filterSync(_ref) {
  var items = _ref.items,
      query = _ref.query,
      filterFunctions = _ref.filterFunctions;

  if (!filterFunctions) {
    throw new Error('No filter functions provided');
  }

  return items.filter(function (item) {
    return includeItem({ filterFunctions: filterFunctions, item: item, query: query });
  }).map(function (item) {
    return item.id;
  });
};