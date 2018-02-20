const { createApiClient, dep } = require('./index')

describe('apiClient', () => {
  it('exports function', () => {
    expect(typeof createApiClient).toBe('function')
  })

  it('has expected methods', () => {
    const apiClient = createApiClient({})
    const expectedApiClientMethods = [
      'call',
      'formPost',
      'httpDelete',
      'httpGet',
      'httpPatch',
      'httpPost',
      'httpPut',
    ]

    expect(Object.keys(apiClient).sort()).toEqual(
      expectedApiClientMethods.sort()
    )
  })

  const expectedCallMethods = [
    'formPost',
    'delete',
    'get',
    'patch',
    'post',
    'put',
  ]

  expectedCallMethods.forEach(methodName => {
    it(`returns function when using call with methodName ${methodName}`, () => {
      const apiClient = createApiClient({})
      expect(apiClient.call({ methodName }).catch(() => {})).toBeInstanceOf(
        Promise
      )
    })
  })

  describe('apiClient methods', () => {
    const apiClient = createApiClient({})

    Object.values(apiClient).forEach(val => {
      it(`exports ${val.name || val} as function`, () => {
        expect(typeof val).toEqual('function')
      })
    })
  })

  it('throws for unsupported methodName', () => {
    const apiClient = createApiClient({})

    expect(() => apiClient.call({ methodName: 'unknown' })).toThrow(
      'unknown is not supported in call'
    )
  })

  describe('with Dependor', () => {
    let validateApiConfig
    let createApiMethod

    beforeEach(() => {
      validateApiConfig = jest.fn()
      createApiMethod = jest.fn()
      dep.freeze()
      dep.mock({
        createApiMethod,
        validateApiConfig,
      })
    })

    afterEach(() => {
      dep.reset()
    })

    it('calls validateApiConfig with expected input', () => {
      const apiConfigInput = {
        baseUrl: 'http://example.com',
      }

      createApiClient(apiConfigInput)

      const apiConfig = {
        validateInput: true,
        validateOutput: true,
        ...apiConfigInput,
      }

      expect(validateApiConfig.mock.calls.length).toEqual(1)
      expect(validateApiConfig.mock.calls[0][0]).toEqual(apiConfig)
    })

    it('calls createApiMethod six times', () => {
      const apiConfigInput = {
        baseUrl: 'http://example.com',
      }

      createApiClient(apiConfigInput)

      expect(createApiMethod.mock.calls.length).toEqual(6)
    })
  })
})
