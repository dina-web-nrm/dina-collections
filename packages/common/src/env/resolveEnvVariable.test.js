const resolveEnvVariable = require('./resolveEnvVariable')

describe('config/resolveEnvVariable', () => {
  it('Return env variable if present', () => {
    expect(
      resolveEnvVariable({
        envKey: 'PORT',
        processEnv: {
          PORT: '1234',
        },
      })
    ).toEqual('1234')
  })
  it('Return undefined variable if not present', () => {
    expect(
      resolveEnvVariable({
        envKey: 'PORT',
        processEnv: {},
      })
    ).toEqual(undefined)
  })
  it('Throws error if variable not present and is required', () => {
    expect(() => {
      resolveEnvVariable({
        envKey: 'PORT',
        processEnv: {},
        required: true,
      })
    }).toThrow()
  })
  it('Returns undefined if node env requirements not fulfilled', () => {
    expect(
      resolveEnvVariable({
        envKey: 'PORT',
        nodeEnv: 'production',
        processEnv: {
          NODE_ENV: 'test',
          PORT: '1234',
        },
      })
    ).toEqual(undefined)
  })
  it('Returns env cariable if node env requirements fulfilled', () => {
    expect(
      resolveEnvVariable({
        envKey: 'PORT',
        nodeEnv: 'test',
        processEnv: {
          NODE_ENV: 'test',
          PORT: '1234',
        },
      })
    ).toEqual('1234')
  })
  it('Parse "true" string to true', () => {
    expect(
      resolveEnvVariable({
        envKey: 'ACTIVE',
        processEnv: {
          ACTIVE: 'true',
        },
      })
    ).toEqual(true)
  })
  it('Parse "false" string to false', () => {
    expect(
      resolveEnvVariable({
        envKey: 'ACTIVE',
        processEnv: {
          ACTIVE: 'false',
        },
      })
    ).toEqual(false)
  })
})
