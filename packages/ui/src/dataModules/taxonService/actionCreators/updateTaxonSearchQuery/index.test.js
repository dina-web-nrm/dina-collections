import updateTaxonSearchQuery from './index'

describe('dataModules/taxonService/actionCreators/updateTaxonSearchQuery', () => {
  it('returns action', () => {
    const inputName = 'taxon.2'
    const searchQuery = 'bat'
    const testValue = updateTaxonSearchQuery({ inputName, searchQuery })
    const expectedResult = {
      meta: { inputName: 'taxon.2' },
      payload: 'bat',
      type: 'TAXON_SERVICE_UPDATE_SEARCH_QUERY',
    }

    expect(testValue).toEqual(expectedResult)
  })
})
