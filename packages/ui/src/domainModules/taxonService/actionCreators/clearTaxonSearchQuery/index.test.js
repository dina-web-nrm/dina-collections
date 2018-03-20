import clearTaxonSearchQuery from './index'

describe('domainModules/taxonService/actionCreators/clearTaxonSearchQuery', () => {
  it('returns action', () => {
    const testValue = clearTaxonSearchQuery()
    const expectedResult = {
      type: 'TAXON_SERVICE_CLEAR_SEARCH_QUERY',
    }

    expect(testValue).toEqual(expectedResult)
  })
})
