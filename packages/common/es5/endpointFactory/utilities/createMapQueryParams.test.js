'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMapQueryParams = require('./createMapQueryParams');

var methodSpecification = {
  parameters: [{
    in: 'query',
    name: 'stringObject[key]',
    schema: { type: 'string' }
  }, {
    in: 'query',
    name: 'integerObject[key]',
    schema: { type: 'integer' }
  }, {
    in: 'query',
    name: 'arrayStringObject[key]',
    schema: { items: { type: 'string' }, type: 'array' }
  }, {
    in: 'query',
    name: 'sampleArrayStrings',
    schema: { items: { type: 'string' }, type: 'array' }
  }, {
    in: 'query',
    name: 'sampleArrayIntegers',
    schema: { items: { type: 'integer' }, type: 'array' }
  }, {
    in: 'query',
    name: 'sampleString',
    schema: { type: 'string' }
  }, {
    in: 'query',
    name: 'sampleInteger',
    schema: { type: 'integer' }
  }, {
    in: 'query',
    name: 'sampleBoolean',
    schema: { type: 'boolean' }
  }]
};

describe('endpointFactory/utilities/createMapQueryParams', function () {
  it('is a function', function () {
    expect(typeof createMapQueryParams === 'undefined' ? 'undefined' : (0, _typeof3.default)(createMapQueryParams)).toBe('function');
  });

  it('dont throw when initialized with methodSpecification', function () {
    expect(function () {
      createMapQueryParams({ methodSpecification: methodSpecification });
    }).not.toThrow();
  });
  describe('mapping', function () {
    var mapQueryParams = void 0;
    beforeAll(function () {
      mapQueryParams = createMapQueryParams({ methodSpecification: methodSpecification });
    });

    describe('strings', function () {
      it('maps simple string', function () {
        var queryParams = {
          sampleString: '1234a'
        };
        expect(mapQueryParams(queryParams)).toEqual(queryParams);
      });
      it('cast integer to string when type is string', function () {
        var queryParams = {
          sampleString: 1234
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleString: '1234'
        });
      });
      it('dont modify array when type is string', function () {
        var queryParams = {
          sampleString: ['1234']
        };
        expect(mapQueryParams(queryParams)).toEqual(queryParams);
      });
      it('dont modify object when type is string', function () {
        var queryParams = {
          sampleString: { a: 2 }
        };
        expect(mapQueryParams(queryParams)).toEqual(queryParams);
      });
      it('trims wite spaces', function () {
        var queryParams = {
          sampleString: '1234 '
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleString: '1234'
        });
      });
    });

    describe('booleans', function () {
      it('maps simple true boolean string', function () {
        var queryParams = {
          sampleBoolean: 'true'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleBoolean: true
        });
      });
      it('maps simple false boolean string', function () {
        var queryParams = {
          sampleBoolean: 'false'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleBoolean: false
        });
      });

      it('dont modify non boolean strings', function () {
        var queryParams = {
          sampleBoolean: 'falsee'
        };
        expect(mapQueryParams(queryParams)).toEqual(queryParams);
      });
    });

    describe('integer', function () {
      it('maps simple integer  string', function () {
        var queryParams = {
          sampleInteger: '1'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleInteger: 1
        });
      });
      it('dont modify non integer string', function () {
        var queryParams = {
          sampleInteger: 'hej'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleInteger: 'hej'
        });
      });
      it('dont modify non integer numbers', function () {
        var queryParams = {
          sampleInteger: '1.1'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleInteger: '1.1'
        });
      });
    });

    describe('arrays', function () {
      it('maps array in string format with integers', function () {
        var queryParams = {
          sampleArrayIntegers: '[1,2,3]'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayIntegers: [1, 2, 3]
        });
      });
      it('maps array in string format with string', function () {
        var queryParams = {
          sampleArrayStrings: '[hej,hepp]'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayStrings: ['hej', 'hepp']
        });
      });
      it('maps array in string format with integers to strings if type is string', function () {
        var queryParams = {
          sampleArrayStrings: '[1, 2, 3]'
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayStrings: ['1', '2', '3']
        });
      });
      it('maps array in array format with integers to strings if type is string', function () {
        var queryParams = {
          sampleArrayStrings: [1, 2, 3]
        };
        expect(mapQueryParams(queryParams)).toEqual({
          sampleArrayStrings: ['1', '2', '3']
        });
      });
    });
    describe('object', function () {
      it('maps stringObject with integer to string', function () {
        var queryParams = {
          stringObject: {
            key: 123
          }
        };
        expect(mapQueryParams(queryParams)).toEqual({
          stringObject: {
            key: '123'
          }
        });
      });
      it('maps integerObject with string to integer', function () {
        var queryParams = {
          integerObject: {
            key: '123'
          }
        };
        expect(mapQueryParams(queryParams)).toEqual({
          integerObject: {
            key: 123
          }
        });
      });
      it('maps arrayStringObject with integers to strings', function () {
        var queryParams = {
          arrayStringObject: {
            key: '[123, 223]'
          }
        };
        expect(mapQueryParams(queryParams)).toEqual({
          arrayStringObject: {
            key: ['123', '223']
          }
        });
      });
    });
  });
});