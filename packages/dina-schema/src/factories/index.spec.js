const Ajv = require('ajv')
const openApiSchema = require('./schemas/openApi.json')
const swaggerSchema = require('./schemas/swagger.json')

const { openApi, swagger } = require('./index')

describe('factories/index', () => {
  describe('openApi', () => {
    let ajv
    let validate
    beforeEach(() => {
      ajv = Ajv({
        // errorDataPath: 'property',
        verbose: false, // to have information about the error.parentSchema
      })
      validate = ajv.compile(openApiSchema)
    })

    it('passes schema', () => {
      const valid = validate(openApi)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
  })

  describe('swagger', () => {
    let ajv
    let validate
    beforeEach(() => {
      ajv = Ajv({
        // errorDataPath: 'property',
        missingRefs: 'ignore',
        verbose: false, // to have information about the error.parentSchema
      })
      validate = ajv.compile(swaggerSchema)
    })

    it('passes schema', () => {
      const valid = validate(swagger)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
  })
})
