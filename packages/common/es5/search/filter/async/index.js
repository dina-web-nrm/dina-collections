'use strict';

var _require = require('../../../batch/reduce'),
    batchReduce = _require.batchReduce;

var includeItem = require('../includeItem');

module.exports = function filterAsync(_ref) {
  var _ref$attributesPath = _ref.attributesPath,
      attributesPath = _ref$attributesPath === undefined ? 'attributes' : _ref$attributesPath,
      _ref$batchSize = _ref.batchSize,
      batchSize = _ref$batchSize === undefined ? 100 : _ref$batchSize,
      filterFunctions = _ref.filterFunctions,
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      limit = _ref.limit,
      offset = _ref.offset,
      query = _ref.query,
      _ref$returnItems = _ref.returnItems,
      returnItems = _ref$returnItems === undefined ? false : _ref$returnItems;

  var hasLimit = limit !== undefined;
  var hasOffset = offset !== undefined;

  var result = [];
  var reduceFunction = function reduceFunction(_ref2) {
    var item = _ref2.item;

    if (includeItem({ attributesPath: attributesPath, filterFunctions: filterFunctions, item: item, query: query })) {
      if (returnItems) {
        result.push(item);
      } else {
        result.push(item.id);
      }
    }
  };

  return batchReduce({
    items: items,
    numberOfEntriesEachBatch: batchSize,
    reduceFunction: reduceFunction
  }).then(function () {
    if (hasLimit && hasOffset) {
      return result.slice(offset, limit);
    }
    if (hasLimit) {
      return result.slice(0, limit);
    }

    if (hasOffset) {
      return result.slice(offset);
    }

    return result;
  });
};