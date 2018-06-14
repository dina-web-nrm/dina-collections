'use strict';

var walkObject = require('./walkObject');

describe('formatObject/utilities/walkObject', function () {
  test('throws if no obj', function () {
    var testValue = function testValue() {
      return walkObject({});
    };
    var expectedResult = 'must provide object';

    expect(testValue).toThrow(expectedResult);
  });

  test('throws if no func', function () {
    var testValue = function testValue() {
      return walkObject({ obj: { test: 'lol' } });
    };
    var expectedResult = 'must provide func';

    expect(testValue).toThrow(expectedResult);
  });

  test('calls func with path if there are no more segments', function () {
    var func = jest.fn();

    walkObject({
      func: func,
      obj: {
        name: 'Leia'
      },
      path: 'name',
      segments: []
    });

    expect(func).toHaveBeenCalledWith('name');
  });

  test('does not call func if value at path is falsy', function () {
    var func = jest.fn();
    var obj = {
      Leia: {
        brother: 'Luke',
        son: undefined
      }
    };

    walkObject({
      func: func,
      obj: obj,
      segments: ['Leia.son']
    });

    expect(func).not.toHaveBeenCalled();
  });

  test('does not call func if value at path is falsy', function () {
    var func = jest.fn();
    var obj = {
      Leia: {
        brother: 'Luke',
        son: undefined
      }
    };

    walkObject({
      func: func,
      obj: obj,
      segments: ['Leia.son']
    });

    expect(func).not.toHaveBeenCalled();
  });

  test('calls func with nextPath if it is truthy but not an array', function () {
    var func = jest.fn();
    var obj = {
      Leia: {
        relatives: {
          brother: 'Luke',
          son: undefined
        }
      }
    };

    walkObject({
      func: func,
      obj: obj,
      path: 'Leia',
      segments: ['relatives', 'brother']
    });

    expect(func).toHaveBeenCalledWith('Leia.relatives');
  });

  test('calls func with name for each relative in array', function () {
    var func = jest.fn();
    var obj = {
      Leia: {
        relatives: [{ name: 'Luke' }, { name: 'Anakin' }]
      }
    };

    walkObject({
      func: func,
      obj: obj,
      segments: ['Leia.relatives', 'name']
    });

    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenCalledWith('Leia.relatives.0.name');
    expect(func).toHaveBeenCalledWith('Leia.relatives.1.name');
  });
});