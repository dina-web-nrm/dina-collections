const Ajv = require('ajv')
const openApiSchema = require('./schemas/openApi.json')
const swaggerSchema = require('./schemas/swagger.json')

const path = require('path')
const read = require('./read')
const build = require('./build')

const { apis, endpoints, errors, info, models, parameters, security } = read({
  apiBasePath: path.join(__dirname, '../../../../api/src/server'),
  modelBasePath: path.join(__dirname, '../../../../models/src'),
})
const { openApi, swagger } = build({
  apis,
  endpoints,
  errors,
  info,
  models,
  parameters,
  security,
})

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
