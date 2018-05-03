import expectNoValidationError from 'common/es5/testUtilities/expectNoValidationError'
import validateConfig from './validateConfig'

describe('coreModules/crud/CrudManager/utilities/validateConfig', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof validateConfig).toBe('function')
  })
  it('it dont return validation errors on valid config', () => {
    expect.assertions(1)
    const validConfig = {
      resources: {
        physicalObject: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
          ],
        },
      },
    }

    expectNoValidationError(validateConfig(validConfig))
  })
  it('it returns validation error on invalid config', () => {
    expect.assertions(1)
    const invalidConfig = {
      unknownParameter: 1,
    }

    expect(validateConfig(invalidConfig)).toBeTruthy()
  })
})
