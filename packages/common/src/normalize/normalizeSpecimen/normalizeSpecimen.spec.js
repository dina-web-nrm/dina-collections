const normalizeSpecimen = require('./index')

const denormalizedSpecimen = require('../testData/denormalizedSpecimen')
const denormalizedSpecimenWithLids = require('../testData/denormalizedSpecimenWithLids')
const normalizedSpecimen = require('../testData/normalizedSpecimen')

describe('normalize/normalizeSpecimen', () => {
  it('is a function', () => {
    expect(typeof normalizeSpecimen).toBe('function')
  })

  it('dont throw in base case', () => {
    expect(() => {
      normalizeSpecimen(denormalizedSpecimen)
    }).not.toThrow()
  })
  it('does a correct normalization when ids exist', () => {
    expect(normalizeSpecimen(denormalizedSpecimenWithLids)).toEqual(
      normalizedSpecimen
    )
  })
})
