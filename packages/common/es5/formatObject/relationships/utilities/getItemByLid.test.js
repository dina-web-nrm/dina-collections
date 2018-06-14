'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./getItemByLid'),
    getItemByLid = _require.getItemByLid;

describe('formatObject/relationships/utilities/resolveByPath/getItemByLid', function () {
  test('is a function', function () {
    var testValue = typeof getItemByLid === 'undefined' ? 'undefined' : (0, _typeof3.default)(getItemByLid);
    var expectedResult = 'function';

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if missing lid', function () {
    var testValue = getItemByLid({ lid: undefined });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if empty relationshipItems', function () {
    var testValue = getItemByLid({ lid: 'abc', relationshipItems: [] });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if relationshipItems does not have lid', function () {
    var testValue = getItemByLid({
      lid: 'abc',
      relationshipItems: [{ id: '123' }]
    });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if no relationshipItem matches lid', function () {
    var testValue = getItemByLid({
      lid: 'abc',
      relationshipItems: [{ lid: '123' }]
    });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('does not throw if relationshipItems has non-object elements', function () {
    var testValue = function testValue() {
      return getItemByLid({
        lid: 'abc',
        relationshipItems: [null, undefined, { attributes: { lid: 'abc' } }, ['asd']]
      });
    };

    expect(testValue).not.toThrow();
  });

  test('returns item if lids match relationshipItem', function () {
    var targetItem = { attributes: { lid: 'abc', name: 'Jane' }, id: '2' };
    var testValue = getItemByLid({
      lid: 'abc',
      relationshipItems: [{ attributes: { lid: 'xyz', name: 'John' }, id: '1' }, targetItem, null]
    });
    var expectedResult = targetItem;

    expect(testValue).toEqual(expectedResult);
  });
});