import globalSelectors from './globalSelectors'

describe('dataModules/storageService/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
