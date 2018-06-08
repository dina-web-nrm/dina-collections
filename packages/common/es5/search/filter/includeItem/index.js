"use strict";

var applyFilter = function applyFilter(_ref) {
  var attributesPath = _ref.attributesPath,
      filter = _ref.filter,
      filterFunctions = _ref.filterFunctions,
      item = _ref.item;
  var filterFunctionName = filter.filterFunction,
      input = filter.input;


  var filterFunction = filterFunctions[filterFunctionName];
  if (!filterFunction) {
    throw new Error("Unknown filter function " + filterFunctionName);
  }

  return filterFunction({
    attributesPath: attributesPath,
    input: input,
    item: item
  });
};

var applyAnd = function applyAnd(_ref2) {
  var attributesPath = _ref2.attributesPath,
      and = _ref2.and,
      filterFunctions = _ref2.filterFunctions,
      item = _ref2.item;

  return and.every(function (query) {
    return includeItem({
      attributesPath: attributesPath,
      filterFunctions: filterFunctions,
      item: item,
      query: query
    });
  });
};

var applyOr = function applyOr(_ref3) {
  var attributesPath = _ref3.attributesPath,
      filterFunctions = _ref3.filterFunctions,
      item = _ref3.item,
      or = _ref3.or;

  return or.some(function (query) {
    return includeItem({
      attributesPath: attributesPath,
      filterFunctions: filterFunctions,
      item: item,
      query: query
    });
  });
};


var includeItem = function includeItem(_ref4) {
  var attributesPath = _ref4.attributesPath,
      item = _ref4.item,
      _ref4$query = _ref4.query,
      query = _ref4$query === undefined ? {} : _ref4$query,
      filterFunctions = _ref4.filterFunctions;
  var and = query.and,
      or = query.or,
      filter = query.filter;


  if (filter) {
    return applyFilter({
      attributesPath: attributesPath,
      filter: filter,
      filterFunctions: filterFunctions,
      item: item,
      query: query
    });
  }

  if (and) {
    return applyAnd({
      and: and,
      attributesPath: attributesPath,
      filterFunctions: filterFunctions,
      item: item
    });
  }

  if (or) {
    return applyOr({
      attributesPath: attributesPath,
      filterFunctions: filterFunctions,
      item: item,
      or: or
    });
  }
  return true;
};

module.exports = includeItem;