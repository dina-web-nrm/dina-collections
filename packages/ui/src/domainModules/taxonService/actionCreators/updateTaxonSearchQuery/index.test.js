import updateTaxonSearchQuery from './index'

describe('domainModules/taxonService/actionCreators/updateTaxonSearchQuery', () => {
  it('returns action', () => {
    const searchQuery = 'bat'
    const testValue = updateTaxonSearchQuery(searchQuery)
    const expectedResult = {
      payload: searchQuery,
      type: 'TAXON_SERVICE_UPDATE_SEARCH_QUERY',
    }

    expect(testValue).toEqual(expectedResult)
  })
})
