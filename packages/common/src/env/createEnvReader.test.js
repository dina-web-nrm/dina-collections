const createEnvReader = require('./createEnvReader')

describe('config/createEnvReader', () => {
  it('Is a function', () => {
    expect(typeof createEnvReader).toBe('function')
  })

  it('Return object with functions', () => {
    const envReader = createEnvReader()
    expect(typeof envReader.readBoolKey).toBe('function')
    expect(typeof envReader.readKey).toBe('function')
  })
})
