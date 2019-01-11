import mapParentError from './mapParentError'

describe('domainModules/storage/components/TaxonManager/item/BaseForm/transformations/syncErrors/mapParentError', () => {
  test('mapParentError', () => {
    const taxonError = {
      parent: {
        errorCode: 'REQUIRED',
        fullPath: 'parent',
      },
    }

    const testValue = mapParentError(taxonError)

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
