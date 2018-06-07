const createLid = require('./index')

describe('createLid', () => {
  test('creates uuid v4', () => {
    const testValue = createLid()
    const lidRegEx = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/

    expect(testValue).toMatch(lidRegEx)
  })
})
