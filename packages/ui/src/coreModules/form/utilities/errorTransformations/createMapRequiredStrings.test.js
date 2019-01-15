import createMapRequiredStrings from './createMapRequiredStrings'

describe('coreModules/form/utilities/errorTransformations/createMapRequiredStrings', () => {
  test('returns function', () => {
    expect(typeof createMapRequiredStrings(['name'])).toEqual('function')
  })
  test('maps any error code on path to error code REQUIRED', () => {
    const syncErrors = {
      name: {
        errorCode: 'MIN_LENGTH',
        fullPath: 'name',
      },
    }

    const mapNameRequiredError = createMapRequiredStrings(['name'])

    const testValue = mapNameRequiredError(syncErrors)

    const expectedResult = {
      name: {
        errorCode: 'REQUIRED',
        fullPath: 'name',
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
