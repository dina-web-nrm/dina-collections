'use strict';

var _require = require('../../Dependor'),
    Dependor = _require.Dependor;

var batchExecute = require('../execute');
var asyncReduce = require('../../asyncReduce');

var dep = new Dependor({
  batchExecute: batchExecute
});

exports.dep = dep;

exports.batchReduce = function batchReduce() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      reduceFunction = _ref.reduceFunction,
      _ref$numberOfEntriesE = _ref.numberOfEntriesEachBatch,
      numberOfEntriesEachBatch = _ref$numberOfEntriesE === undefined ? 100 : _ref$numberOfEntriesE,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === undefined ? {} : _ref$initialValue;

  if (!reduceFunction) {
    throw new Error('Reduce function is required');
  }

  var nItems = items.length;
  var result = initialValue;

  var createBatch = function createBatch(_ref2) {
    var numberOfBatchEntries = _ref2.numberOfBatchEntries,
        startCount = _ref2.startCount;

    return items.slice(startCount, startCount + numberOfBatchEntries);
  };

  var execute = function execute(batchItems) {
    return asyncReduce({
      initialValue: result,
      items: batchItems,
      reduceFunction: reduceFunction
    }).then(function (updatedResult) {
      result = updatedResult;
    });
  };

  return batchExecute({
    createBatch: createBatch,
    execute: execute,
    numberOfEntries: nItems,
    numberOfEntriesEachBatch: numberOfEntriesEachBatch
  }).then(function () {
    return result;
  });
};