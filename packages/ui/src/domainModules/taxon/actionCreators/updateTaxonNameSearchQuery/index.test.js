import updateTaxonNameSearchQuery from './index'

describe('domainModules/taxon/actionCreators/updateTaxonNameSearchQuery', () => {
  it('returns action', () => {
    const inputName = 'taxon.2'
    const searchQuery = 'bat'
    const testValue = updateTaxonNameSearchQuery({ inputName, searchQuery })
    const expectedResult = {
      meta: { inputName: 'taxon.2' },
      payload: 'bat',
      type: 'TAXON_SERVICE_UPDATE_SEARCH_QUERY',
    }

    expect(testValue).toEqual(expectedResult)
  })
})
