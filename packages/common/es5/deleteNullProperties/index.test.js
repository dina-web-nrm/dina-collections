'use strict';

var deleteNullProperties = require('./index');

describe('deleteNullProperties', function () {
  it('returns value if missing or not an object', function () {
    expect(undefined).toEqual(deleteNullProperties(undefined));
    expect(null).toEqual(deleteNullProperties(null));
    expect(1).toEqual(deleteNullProperties(1));
    expect('1').toEqual(deleteNullProperties('1'));
  });
  it('returns copy of original object if there are no null values', function () {
    var obj = {
      key: 'value'
    };

    var testValue = deleteNullProperties(obj);

    expect(testValue).toEqual(obj);
    expect(testValue).not.toBe(obj);
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
    expect(obj).toEqual({
      arm: null,
      key: 'value',
      name: null
    });
  });
});