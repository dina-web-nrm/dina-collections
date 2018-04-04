import globalSelectors from './globalSelectors'

describe('dataModules/curatedListService/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
