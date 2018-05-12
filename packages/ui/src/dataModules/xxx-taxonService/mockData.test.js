import * as mockData from './mockData'

const expectedMockData = ['taxa', 'taxonNames']

describe('dataModules/taxonService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
