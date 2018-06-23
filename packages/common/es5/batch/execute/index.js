'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextTickPromise = function nextTickPromise(deattach) {
  if (!deattach) {
    return _promise2.default.resolve();
  }
  return new _promise2.default(function (resolve) {
    setTimeout(resolve(), 0);
  });
};

var internalCreateBatch = function internalCreateBatch(_ref) {
  var batchNumber = _ref.batchNumber,
      count = _ref.count,
      createBatch = _ref.createBatch,
      createEntry = _ref.createEntry,
      numberOfBatchEntries = _ref.numberOfBatchEntries,
      reporter = _ref.reporter;

  var batchData = [];
  if (createBatch) {
    return _promise2.default.resolve(createBatch({
      batchNumber: batchNumber,
      numberOfBatchEntries: numberOfBatchEntries,
      reporter: reporter,
      startCount: count
    }));
  }
  for (var index = 0; index < numberOfBatchEntries; index += 1) {
    batchData[index] = createEntry(count + index);
  }
  return _promise2.default.resolve(batchData);
};

var runBatch = function runBatch(_ref2) {
  var _ref2$batchNumber = _ref2.batchNumber,
      batchNumber = _ref2$batchNumber === undefined ? 0 : _ref2$batchNumber,
      _ref2$count = _ref2.count,
      count = _ref2$count === undefined ? 0 : _ref2$count,
      createBatch = _ref2.createBatch,
      createEntry = _ref2.createEntry,
      deattach = _ref2.deattach,
      execute = _ref2.execute,
      maxCount = _ref2.maxCount,
      maxNumberOfBatches = _ref2.maxNumberOfBatches,
      nItemsLastBatch = _ref2.nItemsLastBatch,
      numberOfEntries = _ref2.numberOfEntries,
      numberOfEntriesEachBatch = _ref2.numberOfEntriesEachBatch,
      reporter = _ref2.reporter;

  if (count >= maxCount) {
    return _promise2.default.reject(new Error('Max count reached'));
  }

  if (batchNumber >= maxNumberOfBatches) {
    return _promise2.default.reject(new Error('Max number of batches reached'));
  }

  if (numberOfEntries !== undefined) {
    if (count >= numberOfEntries) {
      return _promise2.default.resolve();
    }
  }

  if (nItemsLastBatch !== undefined) {
    if (nItemsLastBatch !== numberOfEntriesEachBatch) {
      return _promise2.default.resolve();
    }
  }

  var numberOfBatchEntries = void 0;
  if (numberOfEntries === undefined) {
    numberOfBatchEntries = numberOfEntriesEachBatch;
  } else {
    numberOfBatchEntries = Math.min(numberOfEntriesEachBatch, numberOfEntries - count);
  }

  return internalCreateBatch({
    batchNumber: batchNumber,
    count: count,
    createBatch: createBatch,
    createEntry: createEntry,
    numberOfBatchEntries: numberOfBatchEntries,
    reporter: reporter
  }).then(function (batchData) {
    var nItemsInBatch = batchData !== undefined ? batchData.length : undefined;
    return _promise2.default.resolve().then(function () {
      return execute(batchData);
    }).then(function () {
      return nextTickPromise(deattach).then(function () {
        return runBatch({
          batchNumber: batchNumber + 1,
          count: count + numberOfBatchEntries,
          createBatch: createBatch,
          createEntry: createEntry,
          deattach: deattach,
          execute: execute,
          maxNumberOfBatches: maxNumberOfBatches,
          nItemsLastBatch: nItemsInBatch,
          numberOfEntries: numberOfEntries,
          numberOfEntriesEachBatch: numberOfEntriesEachBatch,
          reporter: reporter
        });
      });
    });
  });
};

module.exports = function batchExecute(_ref3) {
  var createBatch = _ref3.createBatch,
      createEntry = _ref3.createEntry,
      _ref3$deattach = _ref3.deattach,
      deattach = _ref3$deattach === undefined ? true : _ref3$deattach,
      execute = _ref3.execute,
      _ref3$maxCount = _ref3.maxCount,
      maxCount = _ref3$maxCount === undefined ? 1000000 : _ref3$maxCount,
      _ref3$maxNumberOfBatc = _ref3.maxNumberOfBatches,
      maxNumberOfBatches = _ref3$maxNumberOfBatc === undefined ? 1000 : _ref3$maxNumberOfBatc,
      numberOfEntries = _ref3.numberOfEntries,
      numberOfEntriesEachBatch = _ref3.numberOfEntriesEachBatch,
      reporter = _ref3.reporter;

  if (!(createBatch || createEntry)) {
    throw new Error('createBatch or createEntry is required');
  }

  if (!execute) {
    throw new Error('execute is required');
  }

  return runBatch({
    createBatch: createBatch,
    createEntry: createEntry,
    deattach: deattach,
    execute: execute,
    maxCount: maxCount,
    maxNumberOfBatches: maxNumberOfBatches,
    numberOfEntries: numberOfEntries,
    numberOfEntriesEachBatch: numberOfEntriesEachBatch,
    reporter: reporter
  });
};