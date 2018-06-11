const nestedToCore = require('./nestedToCore')
const denormalizedSpecimen = require('./utilities/testData/denormalizedSpecimen')

describe('formatObject/nestedToCore', () => {
  it('is a function', () => {
    expect(typeof nestedToCore).toBe('function')
  })
  it('returns a promise, i.e. an object with a then() method', () => {
    expect(
      typeof nestedToCore({
        extractRelationships: true,
        item: denormalizedSpecimen,
        normalize: true,
        type: 'specimen',
      }).then
    ).toBe('function')
  })
  it('resolves falsy item', () => {
    const item = null
    expect.assertions(1)
    return nestedToCore({
      item,
      type: 'specimen',
    }).then(res => {
      expect(res).toBe(null)
    })
  })
  it('resolves with an item with core (api format) keys', () => {
    expect.assertions(1)
    return nestedToCore({
      extractRelationships: true,
      item: denormalizedSpecimen,
      normalize: true,
      type: 'specimen',
    }).then(item => {
      expect(Object.keys(item).sort()).toEqual([
        'attributes',
        'id',
        'relationships',
        'type',
      ])
    })
  })
  it('rejects if item is a string', () => {
    expect.assertions(2)
    return nestedToCore({
      extractRelationships: true,
      item: 'willReject',
      normalize: true,
      type: 'specimen',
    }).catch(err => {
      expect(err).toBeInstanceOf(Error)
      expect(err.message).toMatch(/item must not be a string/)
    })
  })
})
