import globalSelectors from './globalSelectors'

describe('serviceModules/taxon/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
