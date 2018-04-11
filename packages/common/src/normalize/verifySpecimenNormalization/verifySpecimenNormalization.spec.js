const verifyIndividualNormalization = require('./index')
const normalizedIndividual = require('../testData/normalizedSpecimen')

describe('normalize/verifyIndividualNormalization', () => {
  it('is a function', () => {
    expect(typeof verifyIndividualNormalization).toBe('function')
  })

  it('dont throw in base case', () => {
    expect(() => {
      verifyIndividualNormalization(normalizedIndividual)
    }).not.toThrow()
  })
  it('is resonable fast', () => {
    for (let i = 0; i < 1000; i += 1) {
      const input = JSON.parse(JSON.stringify(normalizedIndividual))
      verifyIndividualNormalization(input)
    }
  })
})
