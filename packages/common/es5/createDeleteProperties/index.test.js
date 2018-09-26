'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDeleteProperties = require('./index');

describe('createDeleteProperties', function () {
  it('returns function', function () {
    expect((0, _typeof3.default)(createDeleteProperties(null))).toEqual('function');
  });

  describe('deleteEmptyStringProperties', function () {
    var deleteEmptyStringProperties = void 0;
    beforeAll(function () {
      deleteEmptyStringProperties = createDeleteProperties('');
    });
    it('returns value if missing or not an object', function () {
      expect(undefined).toEqual(deleteEmptyStringProperties(undefined));
      expect(null).toEqual(deleteEmptyStringProperties(null));
      expect(1).toEqual(deleteEmptyStringProperties(1));
      expect('1').toEqual(deleteEmptyStringProperties('1'));
    });
    it('returns copy of original object if there are no empty string values', function () {
      var obj = {
        key: 'value',
        something: null
      };

      var testValue = deleteEmptyStringProperties(obj);

      expect(testValue).toEqual(obj);
      expect(testValue).not.toBe(obj);
    });
    it('removes empty string values from object', function () {
      var obj = {
        arm: null,
        key: 'value',
        name: null,
        removeThis: ''
      };

      var testValue = deleteEmptyStringProperties(obj);
      var expectedResult = {
        arm: null,
        key: 'value',
        name: null
      };

      expect(testValue).toEqual(expectedResult);
    });
    it('does not mutate original object when removing values', function () {
      var obj = {
        arm: null,
        key: 'value',
        name: null,
        removeThis: ''
      };

      var testValue = deleteEmptyStringProperties(obj);

      expect(testValue).not.toBe(obj);
      expect(obj).toEqual({
        arm: null,
        key: 'value',
        name: null,
        removeThis: ''
      });
    });
  });

  describe('deleteNullProperties', function () {
    var deleteNullProperties = void 0;
    beforeAll(function () {
      deleteNullProperties = createDeleteProperties(null);
    });

    it('removes null values from object without mutating original object', function () {
      var obj = {
        arm: null,
        key: 'value',
        name: null
      };

      var testValue = deleteNullProperties(obj);
      var expectedResult = {
        key: 'value'
      };

      expect(testValue).toEqual(expectedResult);
      expect(testValue).not.toBe(obj);
      expect(obj).toEqual({
        arm: null,
        key: 'value',
        name: null
      });
    });
  });
});