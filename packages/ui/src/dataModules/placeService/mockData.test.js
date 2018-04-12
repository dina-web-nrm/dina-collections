import * as mockData from './mockData'

const expectedMockData = ['places']

describe('dataModules/placeService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
