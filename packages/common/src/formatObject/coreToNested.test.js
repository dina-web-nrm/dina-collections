const coreToNested = require('./coreToNested')

describe('formatObject/coreToNested', () => {
  it('is a function', () => {
    expect(typeof coreToNested).toBe('function')
  })

  it('returns a promise, i.e. an object with a then() method', () => {
    expect(typeof coreToNested({}).then).toBe('function')
  })
})
