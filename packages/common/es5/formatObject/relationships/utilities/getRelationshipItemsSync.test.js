'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./getRelationshipItemsSync'),
    createGetItemFromRawItemId = _require.createGetItemFromRawItemId,
    getRelationshipItemsSync = _require.getRelationshipItemsSync,
    removeFalsyElements = _require.removeFalsyElements;

describe('formatObject/relationships/utilities/resolveByPath/getRelationshipItemsSync', function () {
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
    var getItemFromRawItem = void 0;
    beforeEach(function () {
      getItemByTypeId = jest.fn(function (type, id) {
        return type + '-' + id;
      });
      getItemFromRawItem = createGetItemFromRawItemId({
        getItemByTypeId: getItemByTypeId,
        type: 'agent'
      });
    });

    test('returns undefined from getItemByTypeId if missing raw item', function () {
      expect(getItemFromRawItem()).toEqual(undefined);
    });

    test('returns undefined from getItemByTypeId if raw item is missing id', function () {
      expect(getItemFromRawItem({ id: undefined })).toEqual(undefined);
    });

    test('returns result from getItemByTypeId', function () {
      expect(getItemFromRawItem({ id: '123' })).toEqual('agent-123');
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
      var testValue = typeof getRelationshipItemsSync === 'undefined' ? 'undefined' : (0, _typeof3.default)(getRelationshipItemsSync);
      var expectedResult = 'function';

      expect(testValue).toEqual(expectedResult);
    });

    test('throws if no getItemByTypeId provided', function () {
      expect(function () {
        return getRelationshipItemsSync({});
      }).toThrow('missing getItemByTypeId');
    });

    var getItemByTypeId = void 0;
    beforeEach(function () {
      getItemByTypeId = jest.fn(function (type, id) {
        return type + '-' + id;
      });
    });

    test('rejects if no type provided', function () {
      expect(function () {
        return getRelationshipItemsSync({ getItemByTypeId: getItemByTypeId });
      }).toThrow('missing type');
    });

    test('returns empty array if relationships does not contain relationshipKey', function () {
      var testValue = getRelationshipItemsSync({
        getItemByTypeId: getItemByTypeId,
        relationshipKey: 'test',
        relationships: {},
        type: 'agent'
      });

      expect(testValue).toEqual([]);
    });

    test('returns empty array if there is no relationship data', function () {
      var testValue = getRelationshipItemsSync({
        getItemByTypeId: getItemByTypeId,
        relationshipKey: 'agent',
        relationships: {
          agent: {} },
        type: 'agent'
      });

      expect(testValue).toEqual([]);
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

      var testValue = getRelationshipItemsSync({
        getItemByTypeId: getItemByTypeId,
        relationshipKey: 'agents',
        relationships: {
          agents: {
            data: [{ id: '123' }, null, { id: '456' }]
          }
        },
        type: 'agent'
      });

      expect(testValue).toEqual(expectedResult);
    });
  });
});