"use strict";

var applyFilter = function applyFilter(_ref) {
  var filter = _ref.filter,
      filterFunctions = _ref.filterFunctions,
      item = _ref.item;
  var filterFunctionName = filter.filterFunction,
      input = filter.input;


  var filterFunction = filterFunctions[filterFunctionName];
  if (!filterFunction) {
    throw new Error("Unknown filter function " + filterFunctionName);
  }

  return filterFunction({
    input: input,
    item: item
  });
};

var applyAnd = function applyAnd(_ref2) {
  var and = _ref2.and,
      filterFunctions = _ref2.filterFunctions,
      item = _ref2.item;

  return and.every(function (query) {
    return includeItem({
      filterFunctions: filterFunctions,
      item: item,
      query: query
    });
  });
};

var applyOr = function applyOr(_ref3) {
  var filterFunctions = _ref3.filterFunctions,
      item = _ref3.item,
      or = _ref3.or;

  return or.some(function (query) {
    return includeItem({
      filterFunctions: filterFunctions,
      item: item,
      query: query
    });
  });
};


var includeItem = function includeItem(_ref4) {
  var item = _ref4.item,
      query = _ref4.query,
      filterFunctions = _ref4.filterFunctions;
  var and = query.and,
      or = query.or,
      filter = query.filter;


  if (filter) {
    return applyFilter({
      filter: filter,
      filterFunctions: filterFunctions,
      item: item,
      query: query
    });
  }

  if (and) {
    return applyAnd({
      and: and,
      filterFunctions: filterFunctions,
      item: item
    });
  }

  if (or) {
    return applyOr({
      filterFunctions: filterFunctions,
      item: item,
      or: or
    });
  }
  return true;
};

module.exports = includeItem;