import * as mockData from './mockData'

const expectedMockData = ['curatedLocalities']

describe('dataModules/localityService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
