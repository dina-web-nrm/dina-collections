import globalSelectors from './globalSelectors'

describe('dataModules/identifierService/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
