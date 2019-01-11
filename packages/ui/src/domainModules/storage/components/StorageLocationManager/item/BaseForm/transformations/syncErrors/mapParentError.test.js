import mapParentError from './mapParentError'

describe('domainModules/storage/components/StorageLocationManager/item/BaseForm/transformations/syncErrors/mapParentError', () => {
  test('mapParentError', () => {
    const storageLocationError = {
      parent: {
        errorCode: 'REQUIRED',
        fullPath: 'parent',
      },
    }

    const testValue = mapParentError(storageLocationError)

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
