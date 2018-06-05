const {
  getKeyAllowNull,
  getKeyName,
  getKeyStoredInModel,
  getKeyType,
  getPath,
  getTargetFormat,
  getTargetModel,
  getTargetOneOrMany,
} = require('./relationshipsSchemaSelectors')

/* eslint-disable sort-keys */
describe('schemaInterface/relationships/relationshipsSchemaSelectors', () => {
  let schemaItem
  beforeEach(() => {
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
          $ref: 'dice',
        },
      },
    }
  })

  describe('getKeyAllowNull', () => {
    it('returns undefined for empty schema', () => {
      expect(getKeyAllowNull(undefined)).toEqual(undefined)
    })
    it('returns true', () => {
      const testValue = getKeyAllowNull(schemaItem)
      const expectedResult = true

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getKeyName', () => {
    it('returns undefined for empty schema', () => {
      expect(getKeyName(undefined)).toEqual(undefined)
    })
    it('returns customKey', () => {
      const testValue = getKeyName(schemaItem)
      const expectedResult = 'customKey'

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getKeyStoredInModel', () => {
    it('returns undefined for empty schema', () => {
      expect(getKeyStoredInModel(undefined)).toEqual(undefined)
    })
    it('returns game', () => {
      const testValue = getKeyStoredInModel(schemaItem)
      const expectedResult = 'game'

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getKeyType', () => {
    it('returns undefined for empty schemaItem', () => {
      expect(getKeyType(undefined)).toEqual(undefined)
    })
    it('returns json', () => {
      const testValue = getKeyType(schemaItem)
      const expectedResult = 'json'

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getPath', () => {
    it('returns undefined for empty schemaItem', () => {
      expect(getPath(undefined)).toEqual(undefined)
    })
    it('returns path', () => {
      const testValue = getPath(schemaItem)
      const expectedResult = ['somePath', 'someOtherPath']

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getTargetFormat', () => {
    it('returns undefined for empty schemaItem', () => {
      expect(getTargetFormat(undefined)).toEqual(undefined)
    })
    it('returns x-key-type', () => {
      const testValue = getTargetFormat(schemaItem)
      const expectedResult = 'object'

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getTargetModel', () => {
    it('returns undefined for empty schemaItem', () => {
      expect(getTargetModel(undefined)).toEqual(undefined)
    })
    it('returns $ref of data property', () => {
      const testValue = getTargetModel(schemaItem)
      const expectedResult = 'dice'

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('getTargetOneOrMany', () => {
    it('returns undefined for empty schemaItem', () => {
      expect(getTargetOneOrMany(undefined)).toEqual(undefined)
    })
    it('returns one', () => {
      const testValue = getTargetOneOrMany(schemaItem)
      const expectedResult = 'one'

      expect(testValue).toEqual(expectedResult)
    })
    it('returns many', () => {
      const testValue = getTargetOneOrMany({
        properties: { data: { type: 'array' } },
      })
      const expectedResult = 'many'

      expect(testValue).toEqual(expectedResult)
    })
  })
})
