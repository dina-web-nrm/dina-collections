'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var specimenFilterFunctions = require('../../specimen/filterFunctions');

var filterFunctionsMap = {
  searchSpecimen: specimenFilterFunctions
};

var includeItem = require('../includeItem');

module.exports = function filterAsync(_ref) {
  var _ref$batchSize = _ref.batchSize,
      batchSize = _ref$batchSize === undefined ? 1000 : _ref$batchSize,
      resource = _ref.resource,
      items = _ref.items,
      query = _ref.query;

  var filterFunctions = filterFunctionsMap[resource];
  if (!filterFunctions) {
    throw new Error('No filter functions found for resource: ' + resource);
  }
  var nItems = items.length;
  var endIndex = nItems - 1;
  var currentIndex = 0;
  var result = [];
  if (!query || !(0, _keys2.default)(query).length) {
    return _promise2.default.resolve(items.map(function (item) {
      return item.id;
    }));
  }

  return new _promise2.default(function (resolve, reject) {
    var runBatch = function runBatch() {
      try {
        var batchEndIndex = currentIndex + batchSize;
        while (currentIndex < batchEndIndex) {
          if (currentIndex === endIndex) {
            return resolve(result);
          }

          var item = items[currentIndex];
          if (includeItem({ filterFunctions: filterFunctions, item: item, query: query })) {
            result.push(item.id);
          }
          currentIndex += 1;
        }
      } catch (err) {
        return reject(err);
      }
      setTimeout(function () {
        runBatch();
      }, 0);
      return null;
    };

    runBatch();
  });
};