import expectNoValidationError from 'common/es5/testUtilities/expectNoValidationError'
import specification, { config } from './sampleSpecification'
import validateConfig from '../../utilities/validateConfig'

describe('coreModules/crud/createCrudModule/factories/specification/sampleSpecification', () => {
  it('is a object', () => {
    expect.assertions(1)
    expect(typeof specification).toBe('object')
  })
  it('config passes validation', () => {
    expect.assertions(1)

    expectNoValidationError(validateConfig(config))
  })
})
