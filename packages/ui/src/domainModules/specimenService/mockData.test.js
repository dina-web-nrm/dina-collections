import * as mockData from './mockData'

const expectedMockData = ['createLookupMammalsResponse', 'getSpecimen']

describe('domainModules/specimenService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.keys(mockData).sort()).toEqual(expectedMockData.sort())
  })
})
