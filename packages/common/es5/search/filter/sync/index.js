'use strict';

var specimenFilterFunctions = require('../../specimen/filterFunctions');

var filterFunctionsMap = {
  searchSpecimen: specimenFilterFunctions
};

var includeItem = require('../includeItem');

module.exports = function filterSync(_ref) {
  var items = _ref.items,
      query = _ref.query,
      resource = _ref.resource;

  var filterFunctions = filterFunctionsMap[resource];
  if (!filterFunctions) {
    throw new Error('No filter functions found for resource: ' + resource);
  }

  return items.filter(function (item) {
    return includeItem({ filterFunctions: filterFunctions, item: item, query: query });
  }).map(function (item) {
    return item.id;
  });
};