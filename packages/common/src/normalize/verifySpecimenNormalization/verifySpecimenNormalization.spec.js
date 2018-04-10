const verifyIndividualGroupNormalization = require('./index')
const normalizedIndividualGroup = require('../testData/normalizedSpecimen')

describe('normalize/verifyIndividualGroupNormalization', () => {
  it('is a function', () => {
    expect(typeof verifyIndividualGroupNormalization).toBe('function')
  })

  it('dont throw in base case', () => {
    expect(() => {
      verifyIndividualGroupNormalization(normalizedIndividualGroup)
    }).not.toThrow()
  })
  it('is resonable fast', () => {
    for (let i = 0; i < 1000; i += 1) {
      const input = JSON.parse(JSON.stringify(normalizedIndividualGroup))
      verifyIndividualGroupNormalization(input)
    }
  })
})
