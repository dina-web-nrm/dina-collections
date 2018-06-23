'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var batchExecute = require('../execute');
var migrator = require('../../migrator');

var dep = new Dependor({
  batchExecute: batchExecute
});

exports.dep = dep;

exports.batchMap = function batchMap() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      mapFunction = _ref.mapFunction,
      _ref$numberOfEntriesE = _ref.numberOfEntriesEachBatch,
      numberOfEntriesEachBatch = _ref$numberOfEntriesE === undefined ? 100 : _ref$numberOfEntriesE;

  if (!mapFunction) {
    throw new Error('Map function is required');
  }

  var nItems = items.length;
  var newItems = [];

  var batchStartCount = void 0;
  var createBatch = function createBatch(_ref2) {
    var numberOfBatchEntries = _ref2.numberOfBatchEntries,
        startCount = _ref2.startCount;

    batchStartCount = startCount;
    return items.slice(startCount, startCount + numberOfBatchEntries);
  };

  var execute = function execute(batchItems) {
    var promises = batchItems.map(function (item, index) {
      return _promise2.default.resolve().then(function () {
        return mapFunction({
          batchStartIndex: batchStartCount,
          index: index,
          item: item,
          migrator: migrator
        });
      });
    });
    return _promise2.default.all(promises).then(function (mappedBatchItems) {
      newItems = [].concat((0, _toConsumableArray3.default)(newItems), (0, _toConsumableArray3.default)(mappedBatchItems));
    });
  };

  return batchExecute({
    createBatch: createBatch,
    execute: execute,
    numberOfEntries: nItems,
    numberOfEntriesEachBatch: numberOfEntriesEachBatch
  }).then(function () {
    return newItems;
  });
};