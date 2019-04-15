import expectNoValidationError from 'common/src/testUtilities/expectNoValidationError'
import validateConfig from './createCrudModule/utilities/validateConfig'
import config from './config'

describe('coreModules/crud/config', () => {
  it('it dont return validation errors', () => {
    expect.assertions(1)
    expectNoValidationError(validateConfig(config))
  })
})
