'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./getRelationshipItems'),
    createGetItemFromRawItemId = _require.createGetItemFromRawItemId,
    getRelationshipItems = _require.getRelationshipItems,
    removeFalsyElements = _require.removeFalsyElements;

describe('formatObject/relationships/utilities/resolveByPath/getRelationshipItems', function () {
  describe('createGetItemFromRawItemId', function () {
    test('is a function', function () {
      var testValue = typeof createGetItemFromRawItemId === 'undefined' ? 'undefined' : (0, _typeof3.default)(createGetItemFromRawItemId);
      var expectedResult = 'function';

      expect(testValue).toEqual(expectedResult);
    });

    test('returns a function', function () {
      var testValue = (0, _typeof3.default)(createGetItemFromRawItemId({
        getItemByTypeId: function getItemByTypeId() {},
        type: 'agent'
      }));
      var expectedResult = 'function';

      expect(testValue).toEqual(expectedResult);
    });

    var getItemByTypeId = void 0;
    var getItemPromiseFromRawItem = void 0;
    beforeEach(function () {
      getItemByTypeId = jest.fn(function (type, id) {
        return _promise2.default.resolve(type + '-' + id);
      });
      getItemPromiseFromRawItem = createGetItemFromRawItemId({
        getItemByTypeId: getItemByTypeId,
        type: 'agent'
      });
    });

    test('returns undefined from getItemByTypeId if missing raw item', function () {
      expect.assertions(2);
      return getItemPromiseFromRawItem().then(function (res) {
        expect(getItemByTypeId).toHaveBeenCalledTimes(0);
        expect(res).toEqual(undefined);
      });
    });

    test('returns undefined from getItemByTypeId if raw item is missing id', function () {
      expect.assertions(2);
      return getItemPromiseFromRawItem({ id: undefined }).then(function (res) {
        expect(getItemByTypeId).toHaveBeenCalledTimes(0);
        expect(res).toEqual(undefined);
      });
    });

    test('returns result from getItemByTypeId', function () {
      expect.assertions(3);
      return getItemPromiseFromRawItem({ id: '123' }).then(function (res) {
        expect(getItemByTypeId).toHaveBeenCalledTimes(1);
        expect(getItemByTypeId).toHaveBeenCalledWith('agent', '123');
        expect(res).toEqual('agent-123');
      });
    });
  });

  describe('removeFalsyElements', function () {
    test('is a function', function () {
      var testValue = typeof removeFalsyElements === 'undefined' ? 'undefined' : (0, _typeof3.default)(removeFalsyElements);
      var expectedResult = 'function';

      expect(testValue).toEqual(expectedResult);
    });

    test('returns true if truthy', function () {
      expect(removeFalsyElements({})).toEqual(true);
    });

    test('returns false if falsy', function () {
      expect(removeFalsyElements(undefined)).toEqual(false);
      expect(removeFalsyElements(null)).toEqual(false);
    });
  });

  describe('getRelationshipItems', function () {
    test('is a function', function () {
      var testValue = typeof getRelationshipItems === 'undefined' ? 'undefined' : (0, _typeof3.default)(getRelationshipItems);
      var expectedResult = 'function';

      expect(testValue).toEqual(expectedResult);
    });

    test('rejects if no getItemByTypeId provided', function () {
      expect(getRelationshipItems({})).rejects.toThrow('missing getItemByTypeId');
    });

    var getItemByTypeId = void 0;
    beforeEach(function () {
      getItemByTypeId = jest.fn(function (type, id) {
        return type + '-' + id;
      });
    });

    test('rejects if no type provided', function () {
      expect(getRelationshipItems({ getItemByTypeId: getItemByTypeId })).rejects.toThrow('missing type');
    });

    test('returns empty array if relationships does not contain relationshipKey', function () {
      expect.assertions(1);
      return getRelationshipItems({
        getItemByTypeId: getItemByTypeId,
        relationshipKey: 'test',
        relationships: {},
        type: 'agent'
      }).then(function (res) {
        expect(res).toEqual([]);
      });
    });

    test('returns empty array if there is no relationship data', function () {
      expect.assertions(1);
      return getRelationshipItems({
        getItemByTypeId: getItemByTypeId,
        relationshipKey: 'agent',
        relationships: {
          agent: {} },
        type: 'agent'
      }).then(function (res) {
        expect(res).toEqual([]);
      });
    });

    test('removes falsy elements, gets items from raw item ids and removes undefined values', function () {
      getItemByTypeId = jest.fn(function (type, id) {
        if (id === '123') {
          return {
            attributes: { name: 'Jane' },
            id: '123',
            type: type
          };
        }

        if (id === '456') {
          return null;
        }

        return undefined;
      });

      var expectedResult = [{
        attributes: { name: 'Jane' },
        id: '123',
        type: 'agent'
      }];

      return getRelationshipItems({
        getItemByTypeId: getItemByTypeId,
        relationshipKey: 'normalizedAgents',
        relationships: {
          normalizedAgents: {
            data: [{ id: '123' }, null, { id: '456' }]
          }
        },
        type: 'agent'
      }).then(function (res) {
        expect(res).toEqual(expectedResult);
      });
    });
  });
});