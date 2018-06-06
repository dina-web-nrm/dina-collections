"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var internalCreateBatch = function internalCreateBatch(_ref) {
  var count = _ref.count,
      createBatch = _ref.createBatch,
      createEntry = _ref.createEntry,
      numberOfBatchEntries = _ref.numberOfBatchEntries;

  var batchData = [];
  if (createBatch) {
    return _promise2.default.resolve(createBatch({ numberOfBatchEntries: numberOfBatchEntries, startCount: count }));
  }
  for (var index = 0; index < numberOfBatchEntries; index += 1) {
    batchData[index] = createEntry(count + index);
  }
  return _promise2.default.resolve(batchData);
};

var runBatch = function runBatch(_ref2) {
  var _ref2$count = _ref2.count,
      count = _ref2$count === undefined ? 0 : _ref2$count,
      createBatch = _ref2.createBatch,
      createEntry = _ref2.createEntry,
      execute = _ref2.execute,
      numberOfEntries = _ref2.numberOfEntries,
      numberOfEntriesEachBatch = _ref2.numberOfEntriesEachBatch;

  if (count >= numberOfEntries) {
    return _promise2.default.resolve();
  }

  var numberOfBatchEntries = Math.min(numberOfEntries - count, numberOfEntriesEachBatch);

  return internalCreateBatch({
    count: count,
    createBatch: createBatch,
    createEntry: createEntry,
    numberOfBatchEntries: numberOfBatchEntries
  }).then(function (batchData) {
    return execute(batchData).then(function () {
      return runBatch({
        count: count + numberOfBatchEntries,
        createBatch: createBatch,
        createEntry: createEntry,
        execute: execute,
        numberOfEntries: numberOfEntries,
        numberOfEntriesEachBatch: numberOfEntriesEachBatch
      });
    });
  });
};

module.exports = function batchExecute(_ref3) {
  var createBatch = _ref3.createBatch,
      createEntry = _ref3.createEntry,
      execute = _ref3.execute,
      numberOfEntries = _ref3.numberOfEntries,
      numberOfEntriesEachBatch = _ref3.numberOfEntriesEachBatch;

  return runBatch({
    createBatch: createBatch,
    createEntry: createEntry,
    execute: execute,
    numberOfEntries: numberOfEntries,
    numberOfEntriesEachBatch: numberOfEntriesEachBatch
  });
};