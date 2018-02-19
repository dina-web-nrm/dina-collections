const Ajv = require('ajv')
const openApiSchema = require('./schemas/openApi.json')

const path = require('path')
const read = require('./read')
const build = require('./build')

const {
  apis,
  endpoints,
  errors,
  info,
  models,
  parameters,
  security,
  servers,
} = read({
  apiBasePath: path.join(__dirname, '../../../api/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
})
const { openApi } = build({
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
