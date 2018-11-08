const schemaInterface = require('../../../schemaInterface')
const Ajv = require('ajv')
const openApiSchema = require('../schemas/openApi.json')

const openApiSpec = schemaInterface.getOpenApiSpec()

describe('buildTests/openApi', () => {
  let ajv
  let validate
  beforeEach(() => {
    ajv = Ajv({
      // errorDataPath: 'property',
      missingRefs: 'ignore',
      verbose: false, // to have information about the error.parentSchema
    })
    validate = ajv.compile(openApiSchema)
  })

  it('passes schema', () => {
    const valid = validate(openApiSpec)
    expect(validate.errors).toBe(null)
    expect(valid).toBeTruthy()
  })
})
