const denormalizeSpecimen = require('./index')

const denormalizedSpecimenWithLids = require('../testData/denormalizedSpecimenWithLids')
const normalizedSpecimen = require('../testData/normalizedSpecimen')

describe('normalize/denormalizeSpecimen', () => {
  it('is a function', () => {
    expect(typeof denormalizeSpecimen).toBe('function')
  })

  it('dont throw in base case', () => {
    expect(() => {
      denormalizeSpecimen(normalizedSpecimen)
    }).not.toThrow()
  })
  it('does a correct normalization when ids exist', () => {
    expect(denormalizeSpecimen(normalizedSpecimen)).toEqual(
      denormalizedSpecimenWithLids
    )
  })
  it('keeps non normalized props', () => {
    const input = {
      ...normalizedSpecimen,
      id: '1234',
      type: 'a-type',
    }

    const expectedRes = {
      ...denormalizedSpecimenWithLids,
      id: '1234',
      type: 'a-type',
    }

    expect(denormalizeSpecimen(input)).toEqual(expectedRes)
  })
})
