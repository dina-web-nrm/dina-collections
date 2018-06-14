'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./resolveById'),
    resolveById = _require.resolveById;

describe('formatObject/relationships/utilities/resolveById', function () {
  test('is a function', function () {
    var testValue = typeof resolveById === 'undefined' ? 'undefined' : (0, _typeof3.default)(resolveById);
    var expectedResult = 'function';

    expect(testValue).toEqual(expectedResult);
  });

  test('returns object with id if missing formattedRelationships', function () {
    var testValue = resolveById({
      formattedRelationshipItems: undefined,
      id: '123'
    });
    var expectedResult = { id: '123' };

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if item with id is not in formattedRelationships', function () {
    var testValue = resolveById({
      formattedRelationshipItems: [{ id: 'abc' }],
      id: '123'
    });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if item with id is not in formattedRelationships', function () {
    var testValue = resolveById({
      formattedRelationshipItems: [{ id: 'abc' }, { attributes: { type: 'holy' }, id: 'grail' }],
      id: 'grail'
    });
    var expectedResult = { attributes: { type: 'holy' }, id: 'grail' };

    expect(testValue).toEqual(expectedResult);
  });
});