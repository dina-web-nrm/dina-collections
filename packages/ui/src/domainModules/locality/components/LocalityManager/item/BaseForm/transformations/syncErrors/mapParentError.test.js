import mapParentError from './mapParentError'

describe('domainModules/storage/components/LocalityManager/item/BaseForm/transformations/syncErrors/mapParentError', () => {
  test('mapParentError', () => {
    const placeError = {
      parent: {
        errorCode: 'REQUIRED',
        fullPath: 'parent',
      },
    }

    const testValue = mapParentError(placeError)

    const expectedResult = {
      parent: {
        id: {
          errorCode: 'REQUIRED',
          fullPath: 'parent.id',
        },
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
