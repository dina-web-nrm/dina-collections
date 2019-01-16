import mapParentError from './mapParentError'

describe('domainModules/storage/components/LocalityManager/item/BaseForm/transformations/syncErrors/mapParentError', () => {
  test('maps error if error on parent', () => {
    const syncErrors = {
      parent: {
        errorCode: 'REQUIRED',
        fullPath: 'parent',
      },
    }

    const testValue = mapParentError(syncErrors)

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

  test('maps error if error on parent.id', () => {
    const syncErrors = {
      parent: {
        errorCode: 'MIN_LENGTH',
        fullPath: 'parent.id',
      },
    }

    const testValue = mapParentError(syncErrors)

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
