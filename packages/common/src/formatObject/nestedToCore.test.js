const nestedToCore = require('./nestedToCore')

describe('formatObject/nestedToCore', () => {
  it('is a function', () => {
    expect(typeof nestedToCore).toBe('function')
  })

  it('returns a promise, i.e. an object with a then() method', () => {
    expect(typeof nestedToCore({}).then).toBe('function')
  })
})
