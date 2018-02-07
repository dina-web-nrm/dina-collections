const Ajv = require('ajv')
const swaggerSchema = require('../schemas/swagger.json')
const swagger = require('dina-shared/dist/swagger.json')

describe('buildTests/swagger', () => {
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
