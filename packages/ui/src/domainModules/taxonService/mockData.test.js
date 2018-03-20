import * as mockData from './mockData'

const expectedMockData = ['taxa']

describe('domainModules/taxonService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
