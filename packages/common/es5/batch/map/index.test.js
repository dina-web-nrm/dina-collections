'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./index'),
    batchMap = _require.batchMap;

describe('batch/map', function () {
  it('is a function', function () {
    expect(typeof batchMap === 'undefined' ? 'undefined' : (0, _typeof3.default)(batchMap)).toEqual('function');
  });
  it('throw error if mapFunction not provided', function () {
    expect(function () {
      batchMap();
    }).toThrow('Map function is required');
  });

  it('handle sync map function', function () {
    expect.assertions(1);
    var mapFunction = function mapFunction(_ref) {
      var item = _ref.item;

      return item * 2;
    };
    var items = [1, 2, 3];
    return batchMap({
      items: items,
      mapFunction: mapFunction
    }).then(function (res) {
      expect(res).toEqual([2, 4, 6]);
    });
  });
  it('handle async map function', function () {
    expect.assertions(1);
    var mapFunction = function mapFunction(_ref2) {
      var item = _ref2.item;

      return _promise2.default.resolve(item * 2);
    };
    var items = [1, 2, 3];
    return batchMap({
      items: items,
      mapFunction: mapFunction
    }).then(function (res) {
      expect(res).toEqual([2, 4, 6]);
    });
  });
  it('catch map function error', function () {
    expect.assertions(1);
    var mapFunction = function mapFunction() {
      throw new Error('MAP ERROR');
    };
    var items = [1, 2, 3];
    return batchMap({
      items: items,
      mapFunction: mapFunction
    }).catch(function (err) {
      expect(err.message).toEqual('MAP ERROR');
    });
  });
});