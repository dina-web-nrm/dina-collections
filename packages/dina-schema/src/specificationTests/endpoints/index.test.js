const path = require('path')
const Ajv = require('ajv')

const endpointSchema = require('../schemas/endpoint.json')
const readEndpoints = require('../../factories/read/readEndpoints')

const endpointsPath = path.join(
  __dirname,
  '../',
  '../',
  'specification',
  'endpoints'
)

const endpoints = readEndpoints(endpointsPath)
const ajv = Ajv({
  // errorDataPath: 'property',
  verbose: false, // to have information about the error.parentSchema
})
describe('factories/read/readEndpoints', () => {
  let validate

  beforeEach(() => {
    validate = ajv.compile(endpointSchema)
  })

  Object.keys(endpoints).forEach(endpointKey => {
    const endpoint = endpoints[endpointKey]
    it(`Endpoint with operation id ${
      endpoint.operationId
    } passes validation`, () => {
      const valid = validate(endpoint)
      expect(validate.errors).toBe(null)
      expect(valid).toBeTruthy()
    })
  })
})
