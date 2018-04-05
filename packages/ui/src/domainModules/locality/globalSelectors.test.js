import globalSelectors from './globalSelectors'

describe('domainModules/locality/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
