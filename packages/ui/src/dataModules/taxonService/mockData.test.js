import * as mockData from './mockData'

const expectedMockData = ['taxa']

describe('dataModules/taxonService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
