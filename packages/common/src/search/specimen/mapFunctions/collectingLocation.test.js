const testData = require('../testData/index.json')
const collectingLocation = require('./collectingLocation')

describe('search/specimen/mapFunctions/collectingLocation', () => {
  it('is a function', () => {
    expect(typeof collectingLocation).toBe('function')
  })

  it('map testData', () => {
    const src = testData[0]
    const target = {}
    collectingLocation({ src, target })
    expect(target).toEqual({
      collectingLocation: {
        locationN: 'South America',
        locationT: 'Sydamerika',
        place: 'South America',
      },
    })
  })
})
