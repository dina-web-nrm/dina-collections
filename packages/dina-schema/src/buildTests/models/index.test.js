const Ajv = require('ajv')
const models = require('../../../build/models.json')

describe('buildTests/models', () => {
  let ajv
  beforeEach(() => {
    ajv = Ajv()
    Object.keys(models).forEach(key => {
      ajv.addSchema(models[key], key)
    })
  })
  describe('catalogedUnit', () => {
    let validate
    beforeEach(() => {
      validate = ajv.compile(models.catalogedUnit)
    })

    it('valid case without other models validate', () => {
      const testData = {
        catalogNumber: '584028',
        id: '1234',
      }
      const valid = validate(testData)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
    it('valid case with one include level validate', () => {
      const testData = {
        catalogNumber: '584028',
        id: '1234',
        physicalUnits: [
          {
            id: '1234',
          },
        ],
      }
      const valid = validate(testData)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
    it('valid case with two include level validate', () => {
      const testData = {
        catalogNumber: '584028',
        id: '1234',
        physicalUnits: [
          {
            id: '1234',
            individualGroup: {
              id: '1234',
            },
          },
        ],
      }
      const valid = validate(testData)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
    it('valid case with three include level validate', () => {
      const testData = {
        catalogNumber: '584028',
        id: '1234',
        physicalUnits: [
          {
            id: '1234',
            individualGroup: {
              id: '1234',
              occurrences: [
                {
                  id: '1234',
                },
              ],
            },
          },
        ],
      }
      const valid = validate(testData)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
    it('valid case with circular reference validate', () => {
      const testData = {
        catalogNumber: '584028',
        id: '1234',
        physicalUnits: [
          {
            catalogedUnit: {
              catalogNumber: '584028',
              id: '1234',
            },
            id: '1234',
          },
        ],
      }
      const valid = validate(testData)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })

    // Invalid cases
    it('invalid case with three include level dont validate', () => {
      const testData = {
        catalogNumber: '584028',
        id: '1234',
        physicalUnits: [
          {
            id: '1234',
            individualGroup: {
              id: '1234',
              occurrences: [
                {
                  id: 1234, // should be string
                },
              ],
            },
          },
        ],
      }
      const valid = validate(testData)
      expect(validate.errors[0].dataPath).toBe(
        '.physicalUnits[0].individualGroup.occurrences[0].id'
      )
      expect(validate.errors[0].message).toBe('should be string')
      expect(valid).toBe(false)
    })
  })
})
