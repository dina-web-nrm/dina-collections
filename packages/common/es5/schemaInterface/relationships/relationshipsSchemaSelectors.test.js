'use strict';

var _require = require('./relationshipsSchemaSelectors'),
    getKeyAllowNull = _require.getKeyAllowNull,
    getKeyName = _require.getKeyName,
    getKeyStoredInModel = _require.getKeyStoredInModel,
    getKeyType = _require.getKeyType,
    getPath = _require.getPath,
    getTargetFormat = _require.getTargetFormat,
    getTargetModel = _require.getTargetModel,
    getTargetOneOrMany = _require.getTargetOneOrMany;

describe('schemaInterface/relationships/relationshipsSchemaSelectors', function () {
  var schemaItem = void 0;
  beforeEach(function () {
    schemaItem = {
      type: 'object',
      'x-key-allow-null': true,
      'x-key-name': 'customKey',
      'x-key-stored-in-model': 'game',
      'x-key-type': 'json',
      'x-path': ['somePath', 'someOtherPath'],
      properties: {
        data: {
          type: 'object',
          $ref: 'dice'
        }
      }
    };
  });

  describe('getKeyAllowNull', function () {
    it('returns undefined for empty schema', function () {
      expect(getKeyAllowNull(undefined)).toEqual(undefined);
    });
    it('returns true', function () {
      var testValue = getKeyAllowNull(schemaItem);
      var expectedResult = true;

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getKeyName', function () {
    it('returns undefined for empty schema', function () {
      expect(getKeyName(undefined)).toEqual(undefined);
    });
    it('returns customKey', function () {
      var testValue = getKeyName(schemaItem);
      var expectedResult = 'customKey';

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getKeyStoredInModel', function () {
    it('returns undefined for empty schema', function () {
      expect(getKeyStoredInModel(undefined)).toEqual(undefined);
    });
    it('returns game', function () {
      var testValue = getKeyStoredInModel(schemaItem);
      var expectedResult = 'game';

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getKeyType', function () {
    it('returns undefined for empty schemaItem', function () {
      expect(getKeyType(undefined)).toEqual(undefined);
    });
    it('returns json', function () {
      var testValue = getKeyType(schemaItem);
      var expectedResult = 'json';

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getPath', function () {
    it('returns undefined for empty schemaItem', function () {
      expect(getPath(undefined)).toEqual(undefined);
    });
    it('returns path', function () {
      var testValue = getPath(schemaItem);
      var expectedResult = ['somePath', 'someOtherPath'];

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getTargetFormat', function () {
    it('returns undefined for empty schemaItem', function () {
      expect(getTargetFormat(undefined)).toEqual(undefined);
    });
    it('returns x-key-type', function () {
      var testValue = getTargetFormat(schemaItem);
      var expectedResult = 'object';

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getTargetModel', function () {
    it('returns undefined for empty schemaItem', function () {
      expect(getTargetModel(undefined)).toEqual(undefined);
    });
    it('returns $ref of data property', function () {
      var testValue = getTargetModel(schemaItem);
      var expectedResult = 'dice';

      expect(testValue).toEqual(expectedResult);
    });
  });

  describe('getTargetOneOrMany', function () {
    it('returns undefined for empty schemaItem', function () {
      expect(getTargetOneOrMany(undefined)).toEqual(undefined);
    });
    it('returns one', function () {
      var testValue = getTargetOneOrMany(schemaItem);
      var expectedResult = 'one';

      expect(testValue).toEqual(expectedResult);
    });
    it('returns many', function () {
      var testValue = getTargetOneOrMany({
        properties: { data: { type: 'array' } }
      });
      var expectedResult = 'many';

      expect(testValue).toEqual(expectedResult);
    });
  });
});