import mapAcceptedTaxonNameError from './mapAcceptedTaxonNameError'

describe('domainModules/storage/components/TaxonManager/item/BaseForm/transformations/syncErrors/mapAcceptedTaxonNameError', () => {
  test('mapAcceptedTaxonNameError', () => {
    const taxonError = {
      acceptedTaxonName: {
        errorCode: 'REQUIRED',
        fullPath: 'acceptedTaxonName',
      },
    }

    const testValue = mapAcceptedTaxonNameError(taxonError)

    const expectedResult = {
      acceptedTaxonName: {
        id: {
          errorCode: 'REQUIRED',
          fullPath: 'acceptedTaxonName.id',
        },
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
