import globalSelectors from './globalSelectors'

describe('dataModules/taxonService/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
