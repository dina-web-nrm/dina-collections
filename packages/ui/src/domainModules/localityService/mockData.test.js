import * as mockData from './mockData'

const expectedMockData = ['curatedLocalities']

describe('domainModules/localityService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
