const Ajv = require('ajv')
const openApiSchema = require('./schemas/openApi.json')

const path = require('path')
const read = require('./read')
const buildOpenApi = require('./build/openApi')
const buildEndpoints = require('./build/buildEndpoints')

const {
  apis,
  endpoints: endpointsInput,
  errors,
  info,
  models,
  parameters,
  security,
  servers,
} = read({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
})

const endpoints = buildEndpoints(endpointsInput)
const openApi = buildOpenApi({
  apis,
  endpoints,
  errors,
  info,
  models,
  parameters,
  security,
  servers,
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
})
