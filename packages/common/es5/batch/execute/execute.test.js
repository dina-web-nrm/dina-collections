'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var batchExecute = require('./index');

describe('batch/execute', function () {
  test('is a function', function () {
    expect(typeof batchExecute === 'undefined' ? 'undefined' : (0, _typeof3.default)(batchExecute)).toEqual('function');
  });
  test('throw error if createBatch or createEntry not provided', function () {
    expect(function () {
      batchExecute({
        execute: function execute() {
          return null;
        }
      });
    }).toThrow('createBatch or createEntry is required');
  });

  test('throw error if execute not provided', function () {
    expect(function () {
      batchExecute({
        createBatch: function createBatch() {
          return null;
        }
      });
    }).toThrow('execute is required');
  });

  describe('e2e', function () {
    test('works when createBatch is the limiting factor', function () {
      var expectedResultLength = 87;

      var createBatch = function createBatch(_ref) {
        var numberOfBatchEntries = _ref.numberOfBatchEntries,
            count = _ref.startCount;

        var batchData = [];
        for (var i = 0; i < numberOfBatchEntries; i += 1) {
          if (count + i < expectedResultLength) {
            batchData.push(1);
          }
        }
        return _promise2.default.resolve(batchData);
      };

      var res = [];
      var execute = function execute(batchData) {
        res = [].concat((0, _toConsumableArray3.default)(res), (0, _toConsumableArray3.default)(batchData));
        return _promise2.default.resolve(res);
      };

      return batchExecute({
        createBatch: createBatch,
        execute: execute,
        numberOfEntriesEachBatch: 10
      }).then(function () {
        expect(res.length).toBe(87);
      });
    });
    test('works when numberOfEntries is the limiting factor', function () {
      var nAvailableBatchEntries = 87;

      var createBatch = function createBatch(_ref2) {
        var numberOfBatchEntries = _ref2.numberOfBatchEntries,
            count = _ref2.startCount;

        var batchData = [];
        for (var i = 0; i < numberOfBatchEntries; i += 1) {
          if (count + i < nAvailableBatchEntries) {
            batchData.push(1);
          }
        }
        return _promise2.default.resolve(batchData);
      };

      var res = [];
      var execute = function execute(batchData) {
        res = [].concat((0, _toConsumableArray3.default)(res), (0, _toConsumableArray3.default)(batchData));
        return _promise2.default.resolve(res);
      };

      return batchExecute({
        createBatch: createBatch,
        execute: execute,
        numberOfEntries: 50,
        numberOfEntriesEachBatch: 10
      }).then(function () {
        expect(res.length).toBe(50);
      });
    });
    test('works when numberOfEntries is the limiting factor and batch size bigger', function () {
      var nAvailableBatchEntries = 87;

      var createBatch = function createBatch(_ref3) {
        var numberOfBatchEntries = _ref3.numberOfBatchEntries,
            count = _ref3.startCount;

        var batchData = [];
        for (var i = 0; i < numberOfBatchEntries; i += 1) {
          if (count + i < nAvailableBatchEntries) {
            batchData.push(1);
          }
        }
        return _promise2.default.resolve(batchData);
      };

      var res = [];
      var execute = function execute(batchData) {
        res = [].concat((0, _toConsumableArray3.default)(res), (0, _toConsumableArray3.default)(batchData));
        return _promise2.default.resolve(res);
      };

      return batchExecute({
        createBatch: createBatch,
        execute: execute,
        numberOfEntries: 50,
        numberOfEntriesEachBatch: 1000
      }).then(function () {
        expect(res.length).toBe(50);
      });
    });
  });
});