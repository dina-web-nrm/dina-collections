import globalSelectors from './globalSelectors'

describe('domainModules/agent/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
